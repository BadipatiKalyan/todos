// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

let todos = [];
let todoIdCounter = 1;

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const { title } = req.body;
  const newTodo = { id: todoIdCounter, title };
  todoIdCounter++;
  todos.push(newTodo);
  res.json(newTodo);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
