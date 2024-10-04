const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3001;
const { MongoClient } = require("mongodb");
const uri = process.env.MONGO_URI ||
  "mongodb+srv://macia:Porniol1@todobase.yvbuw.mongodb.net/?retryWrites=true&w=majority&appName=todoBase";

const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());

app.get("/", async function (req, res) {
  try {
    await client.connect();
    const db = client.db("todoBase");
    const collection = db.collection("test");

    const findResult = await collection.find().toArray();
    console.log(findResult)
    res.send(findResult);
  } catch (err) {
    console.error(err)
  } finally {
    await client.close();
  }
});

app.post("/addTodo", async function (req, res) {
  try {
    await client.connect();
    const db = client.db("todoBase");
    const collection = db.collection("test");
    const { name } = req.body;

    await collection.insertOne({ name });
  } catch (err) {
    console.error(err)
  } finally {
    await client.close();
  }
  res.status(201).json({
    message: "Thing created successfilly!",
  });
});

app.listen(port, async function () {
  console.log(`Example app listening on port ${port}`);
});
