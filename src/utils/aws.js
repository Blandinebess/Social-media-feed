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
  region: "us-east-2",
  credentials: {
    accessKeyId: "AKIA26W27DWHHD6FVMWU",
    secretAccessKey: "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",
  },
});

const TableName = "PostsTable";

export const createPost = async (post) => {
  const id = uuidv4();
  const item = {
    id: { S: id },
    author: { S: post.author },
    content: { S: post.content },
    image: { S: post.image || "" },
    likes: { N: "0" },
  };
  await client.send(new PutItemCommand({ TableName, Item: item }));
  return { id, ...post };
};

export const getPosts = async () => {
  const result = await client.send(new ScanCommand({ TableName }));
  return result.Items.map((item) => unmarshall(item));
};

export const deletePost = async (id) => {
  await client.send(
    new DeleteItemCommand({
      TableName,
      Key: { id: { S: id } },
    })
  );
};

export const updatePost = async (post) => {
  await client.send(
    new UpdateItemCommand({
      TableName,
      Key: { id: { S: post.id } },
      UpdateExpression: "SET content = :c",
      ExpressionAttributeValues: {
        ":c": { S: post.content },
      },
    })
  );
};
