
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import {
  DynamoDBClient,
  PutItemCommand,
  ScanCommand,
  DeleteItemCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

const client = new DynamoDBClient({
  region: process.env.REACT_APP_AWS_REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  },
});
const docClient = DynamoDBDocumentClient.from(client);

const TableName = "Posts";

export const createPost = async (post) => {
  const Id = uuidv4();
  const item = {
   Id: { S:Id },
    author: { S: post.author },
    content: { S: post.content },
    image: { S: post.image || "" },
    likes: { N: "0" },
  };
  await client.send(new PutItemCommand({ TableName, Item: item }));
  return { Id, ...post };
};

export const getPosts = async () => {
  const result = await docClient.send(new ScanCommand({ TableName }));
  console.log("result",)
  return result.Items.map((item) => unmarshall(item));
};

export const deletePost = async (Id) => {
  await client.send(
    new DeleteItemCommand({
      TableName,
      Key: { Id: { S: Id } },
    })
  );
};

export const updatePost = async (post) => {
  await client.send(
    new UpdateItemCommand({
      TableName,
      Key: { Id: { S: post.Id } },
      UpdateExpression: "SET content = :c",
      ExpressionAttributeValues: {
        ":c": { S: post.content },
      },
    })
  );
};
