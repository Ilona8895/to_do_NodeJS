const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const todoList = [];

app.get("/", (req, res) => {
  res.send("Serwer działa");
});

app.post("/todo", (req, res) => {
  todoList.push(req.body);
  res.status(200).end();
});

app.get("/todo", (req, res) => {
  res.json({ todoList });
});

app.delete("/todo/:todoId", (req, res) => {
  if (req.params.todoId !== "") {
    const index = todoList.findIndex((el) => el.id === req.params.todoId);
    todoList.splice(index, 1);
    res.status(200).end();
  } else res.status(404).end();
});

app.patch("/todo/:todoId", (req, res) => {
  const toDoItem = todoList.find((el) => el.id === req.params.todoId);

  if (toDoItem) {
    const update = req.body;
    if (update.completed !== undefined) toDoItem.completed = update.completed;

    if (update.value !== undefined) toDoItem.value = update.value;

    res.status(200).end();
  } else res.status(404).end();
});

// const port = prosess.env.PORT || 5000;

app.listen(8888, () => {
  console.log(`Start aplikacji na porcie 8888`);
});
