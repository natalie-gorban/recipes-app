const processFile = require("../middleware/upload");
const { getAwsProvider } = require("../middleware/awsSTS");
const { aws_region, aws_s3_bucket, cdn_url } = require("../config/aws.config")
const { format } = require("util");
const { S3Client, AbortMultipartUploadCommand } = require("@aws-sdk/client-s3");

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
    console.log("upload: Uploading file", req.file.originalname)
    await processFile(req, res);

    if (!req.file) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on("error", (err) => {
      res.status(500).send({ message: err.message });
    });

    blobStream.on("finish", async (data) => {
      // Create URL for directly file access via HTTP.
      const publicUrl = format(
        `${cdn_url}/${blob.name}`
      );

      try {
        // Make the file public
        const response = await PutObjectCommand({
          ...s3_params,
          Key: blob.name,
        })
      } catch {
        return res.status(500).send({
          message:
            `Uploaded the file successfully: ${req.file.originalname}, but public access is denied!`,
          url: publicUrl,
        });
      }

      res.status(200).send({
        message: "Uploaded the file successfully: " + req.file.originalname,
        url: publicUrl,
      });
    });

    blobStream.end(req.file.buffer);
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

exports.getFileUrl = async (req, res) => {
  try {
    console.log("getFileUrl: Get public url of  uploaded file", req.params.name)
    let fileInfos = [];

    fileInfos.push({
      name: req.params.name,
      url: `${cdn_url}/${req.params.name}`,
    });
    res.status(200).send(fileInfos);
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
