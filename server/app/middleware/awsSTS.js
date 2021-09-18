const fs = require('fs');
const { promisify } = require('util');
const {
  STSClient,
  AssumeRoleWithWebIdentityCommand,
  AssumeRoleCommand
} = require('@aws-sdk/client-sts');

const {
  aws_role,
  aws_region,
  aws_profile,
  aws_web_identity_token_file
} = require('../config/aws.config')

const readAsync = promisify(fs.readFile);

const client = new STSClient({
  region: aws_region,
});

async function getAwsProvider() {
  if (aws_profile) {
    return assumeRoleFromProfileProvider()
  } else if (aws_web_identity_token_file) {
    return webIdentityTokenProvider()
  } else {
    throw new Error('Needs to set in environment or (optionally) AWS_PROFILE or (optionally) AWS_WEB_IDENTITY_TOKEN_FILE and (mandatory) AWS_ROLE_ARN to be assumed')
  }
}

async function assumeRoleFromProfileProvider() {
  const profile = aws_profile;
  const res = await client.send(
    new AssumeRoleCommand({
      RoleArn: aws_role,
      RoleSessionName: 'assumed-role-session-name',
    }),
  );

  if (!res?.Credentials?.AccessKeyId || !res?.Credentials?.SecretAccessKey) {
    throw new Error('assumeRoleFromProfileProvider: Credentials could not be retrieved.');
  }

  return {
    accessKeyId: Credentials.AccessKeyId,
    secretAccessKey: Credentials.SecretAccessKey,
    expiration: Credentials.Expiration,
    sessionToken: Credentials.SessionToken,
  };
}

async function webIdentityTokenProvider() {
  const tokenFilePath = aws_web_identity_token_file;
  if (!tokenFilePath) {
    throw new Error(
      'AWS_WEB_IDENTITY_TOKEN_FILE must be provided.',
    );
  }
  const token = await readAsync(tokenFilePath, { encoding: 'ascii' });
  const res = await client.send(
    new AssumeRoleWithWebIdentityCommand({
      RoleArn: aws_role,
      WebIdentityToken: token,
      RoleSessionName: 'assumed-role-session-name',
    }),
  );

  if (!res?.Credentials?.AccessKeyId || !res?.Credentials?.SecretAccessKey) {
    throw new Error('webIdentityTokenProvider: Credentials could not be retrieved.');
  }

  return {
    accessKeyId: Credentials.AccessKeyId,
    secretAccessKey: Credentials.SecretAccessKey,
    expiration: Credentials.Expiration,
    sessionToken: Credentials.SessionToken,
  };
}

exports = {
  getAwsProvider
}
