const { S3Client } = require("@aws-sdk/client-s3");

const region = process.env.S3_REGION || "us-east-1";

const credentials = {
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
};

const s3Client = new S3Client({
  region,
  endpoint: process.env.S3_ENDPOINT || "http://minio:9000",
  forcePathStyle: true,
  credentials,
});

const presignClient = new S3Client({
  region,
  endpoint:
    process.env.S3_PUBLIC_ENDPOINT || "http://localhost:9000",
  forcePathStyle: true,
  credentials,
});

module.exports = {
  s3Client,
  presignClient,
};