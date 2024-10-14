const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3001;
const { MongoClient, ObjectId } = require("mongodb");
const uri =
  process.env.MONGO_URI 
  // || "mongodb+srv://macia:Porniol1@todobase.yvbuw.mongodb.net/?retryWrites=true&w=majority&appName=todoBase";

const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());

app.get("/", async function (req, res) {
  try {
    await client.connect();
    const db = client.db("todoBase");
    const collection = db.collection("todos");

    const findResult = (await collection.find().toArray()).sort(
      (a, b) => a.isEnded - b.isEnded
    );
    res.send(findResult);
  } catch (err) {
    console.log(err);
    await client.close();
  }
});
0;

app.post("/addTodo", async function (req, res) {
  try {
    await client.connect();
    const db = client.db("todoBase");
    const collection = db.collection("todos");
    const { name } = req.body;

    const isEnded = false;
    await collection.insertOne({ name, isEnded });
  } catch (err) {
    console.log(err);
    await client.close();
  }
  res.status(201).json({
    message: "Thing created successfilly!",
  });
});

app.put("/checkTodo", async function (req, res) {
  try {
    await client.connect();
    const db = client.db("todoBase");
    const collection = db.collection("todos");
    let { toDoId } = req.body;

    toDoId = new ObjectId(toDoId);

    await collection.updateOne(
      {
        _id: toDoId,
      },
      { $set: { isEnded: true } }
    );
  } catch (err) {
    console.log(err);
    await client.close();
  }
  res.status(201).json({
    message: "Thing created successfilly!",
  });
});

app.put("/delete-all", async (req, res) => {
  await client.connect();
  const db = client.db("todoBase");
  const collection = db.collection("todos");
  let { toDosIds } = req.body

 
  try {
    toDosIds.forEach(async (toDoId) => {
      toDoId = new ObjectId(toDoId)
      await collection.deleteOne({ _id: toDoId })
    })
  } catch (err) {
    console.error(err)
  }
})

app.delete("/:toDoId", async (req, res) => {
  await client.connect();
  const db = client.db("todoBase");
  const collection = db.collection("todos");

  let { toDoId } = req.params
  toDoId = new ObjectId(toDoId);

  try {
    await collection.deleteOne({ _id: toDoId })
  } catch (err) {
    console.error(err)
  }
})



app.listen(port, async function () {
  console.log(`Example app listening on port ${port}`);
});
