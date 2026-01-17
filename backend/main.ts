import express from "express";
import cors from "cors";
import { PrismaClient } from "./generated/prisma/client.js";

const app = express();
const client = new PrismaClient();

// 別ドメインからFetch APIを用いてリクエストを送信可能にするために必要
// WEB_ORIGINに設定したドメインからのリクエストのみを許可する
// 参考：https://developer.mozilla.org/ja/docs/Web/HTTP/Guides/CORS
app.use(cors({ origin: process.env.WEB_ORIGIN }));

app.use(express.json());

app.get("/messages", async (request, response) => {
  response.json(await client.message.findMany());
});

app.post("/send", async (request, response) => {
  await client.message.create({ data: { content: request.body.content } });
  response.send();
});

app.listen(3000);
