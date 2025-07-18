import AWS from "aws-sdk";

const S3 = new AWS.S3({
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
});

const BUCKET_NAME = "social-media-app-images2";

export const uploadImage = async (file) => {
  const fileName = `${Date.now()}_${file.name}`;

  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: file,
    ContentType: file.type,
  };

  await S3.putObject(params).promise();

  return `https://${BUCKET_NAME}.s3.amazonaws.com/${fileName}`;
};
