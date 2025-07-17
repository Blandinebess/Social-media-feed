import AWS from "aws-sdk";

const S3 = new AWS.S3({
  region: "us-east-2",
  accessKeyId: "AKIA26W27DWHHD6FVMWU",
  secretAccessKey: "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",
});

const BUCKET_NAME = "social-media-app-images2";

export const uploadImage = async (file) => {
  const fileName = `${Date.now()}_${file.name}`;

  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: file,
    ACL: "public-read",
    ContentType: file.type,
  };

  await S3.putObject(params).promise();

  return `https://${BUCKET_NAME}.s3.amazonaws.com/${fileName}`;
};
