const processFile = require("../middleware/upload");
const { getAwsProvider } = require("../middleware/awsSTS");
const { aws_region, aws_s3_bucket, cdn_url } = require("../config/aws.config")
const uuid = require("uuid");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const client = new S3Client({
  credentials: getAwsProvider,
  region: aws_region
})

const s3_params = {
  Bucket: aws_s3_bucket,
  StorageClass: "ONEZONE_IA" // cheapest
}

exports.upload = async (req, res) => {
  try {
    console.log("file.controller->upload: Uploading file", req.file, req.body)
    const random_name = `${uuid.v4().toString()}.${req.file.mimetype.substring(6)}`
    const filename = req.body.filename == 'undefined' ? random_name : req.body.filename
    await processFile(req, res);

    if (!req.file) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    // Make the file public
    const publicUrl = `${cdn_url}/${filename}`
    const response = await client.send(new PutObjectCommand({
      ...s3_params,
      Key: filename,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    }))
    let success_message = `Uploaded the file successfully: ${req.file.originalname}->${filename}`
    console.log(success_message)
    res.status(200).send({
      message: 'Uploaded',
      name: filename,
      url: publicUrl,
    });
  } catch {
    return res.status(500).send({
      message: `Failed to upload: ${req.file.originalname}`
    });
  }

};

exports.getFileUrl = async (req, res) => {
  try {
    console.log("getFileUrl: Get public url of  uploaded file", req.params.name)
    res.status(200).send(
      {
        name: req.params.name,
        url: `${cdn_url}/${req.params.name}`,
      }
    );
  } catch (err) {
    res.status(500).send({
      message: "Unable to read public url of the uploaded file!",
    });
  }
};

exports.download = async (req, res) => {
  try {
    console.log("download: download file", req.params.name)
    res.redirect(`${cdn_url}/${req.params.name}`);
  } catch (err) {
    res.status(500).send({
      message: "Could not download the file. " + err,
    });
  }
};
