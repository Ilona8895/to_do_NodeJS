const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const todoList = [];

app.get("/", (req, res) => {
  console.log(req);
  res.send("Serwer działa");
});

app.post("/todo/add", (req, res) => {
  console.log(req.body);
  todoList.push(req.body);
  res.status(200).end();
});

app.get("/todo", (req, res) => {
  res.json({ todoList });
});

app.post("/todo/remove", (req, res) => {
  console.log(req.body);
  const index = todoList.findIndex((el) => el.id === req.body.id);
  todoList.splice(index, 1);
  res.status(200).end();
});

app.listen(8888, () => {
  console.log(`Start aplikacji na porcie 8888`);
});
