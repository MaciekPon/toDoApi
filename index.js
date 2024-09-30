const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.listen(3001, function () {
  console.log(`Example app listening on port 3001`);
});
