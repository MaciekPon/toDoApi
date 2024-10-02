const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT;
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGO_URI);

app.use(cors());
app.use(express.json());

app.get("/", async function (req, res) {
  try {
    await client.connect();
    const db = client.db("todoBase");
    const collection = db.collection("test");

    // Find the first document in the collection
    const findResult = await collection.find().toArray();
    res.send(findResult);
  } finally {
    // Close the database connection when finished or an error occurs
    await client.close();
  }
});

app.post("/addTodo", async function (req, res) {
  try {
    await client.connect();
    const db = client.db("todoBase");
    const collection = db.collection("test");
    const { name } = req.body;

    // Find the first document in the collection
    await collection.insertOne({ name });
  } finally {
    // Close the database connection when finished or an error occurs
    await client.close();
  }
  res.status(201).json({
    message: "Thing created successfilly!",
  });
});

app.listen(port, async function () {
  console.log(`Example app listening on port ${port}`);
});
