module.exports = {
  aws_role: process.env.AWS_ROLE,
  aws_region: process.AWS_REGION || 'us-east-1',
  aws_profile: process.env.AWS_PROFILE || null,
  aws_web_identity_token_file: process.env.AWS_WEB_IDENTITY_TOKEN_FILE || null,
  aws_s3_bucket: process.env.AWS_S3_BUCKET,
  cdn_url: process.env.CDN_URL
};
