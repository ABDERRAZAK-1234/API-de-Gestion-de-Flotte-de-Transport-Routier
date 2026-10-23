const {
  PutObjectCommand,
  GetObjectCommand,
  HeadBucketCommand,
} = require("@aws-sdk/client-s3");

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const { s3Client, presignClient } = require("../config/s3");

const bucket = process.env.S3_BUCKET;

const putObject = async ({
  key,
  body,
  contentType = "application/pdf",
}) => {
  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  );
};

const presignedGetObject = async ({
  key,
  filename,
  expiresIn = 900,
}) => {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
    ResponseContentType: "application/pdf",
    ResponseContentDisposition: `attachment; filename="${filename}"`,
  });

  return getSignedUrl(presignClient, command, {
    expiresIn,
  });
};

const checkStorageReady = async () => {
  await s3Client.send(
    new HeadBucketCommand({
      Bucket: bucket,
    })
  );

  return true;
};

module.exports = {
  putObject,
  presignedGetObject,
  checkStorageReady,
};