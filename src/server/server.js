const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('views', path.resolve('src', 'server', 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let todos = [
  { id: 1, text: 'Hello, world!' },
  { id: 2, text: 'Pick up groceries', status: 'complete' }
];

app.get('/', (req, res) => {
  const bundle = `//${req.hostname}:8080/public/bundle.js`;

  res.render('index', { bundle });
});

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => {
    return todo.id === id;
  });

  res.json(JSON.stringify(todos[index]));
});

app.post('/todos', (req, res) => {
  const text = req.body.text;
  console.log('data: ', text);
  if (!text) {
    res.status(400).json({ message: 'text is required' });

    return;
  } else {

  const id = todos.length + Date.now();
  const newTodo = { id: id, text: text, status: 'active' };
  console.log(newTodo);
  res.status(201).json(newTodo);
  }
  // console.log(text);
  // console.log(id);
  
});

app.delete('/todos/:id', (req, res) => {
  // res.status(500).send({ message: 'not implemented' });
  const id = req.params.id;
  const newTodos = todos.filter(todo => {
    return todo.id !== id;
  });
  res.status(201).json(newTodos);
});

app.put('/todos/:id', (req, res) => {
  // res.status(500).send({ message: 'not implemented' });
  const id = req.params.id;
  todos.splice(id, 1);
});

// Node server.
const port = 3000;
const server = app.listen(port, () => {
  console.log(`---> Application started on port: ${port}`);
});

// Dev server.
const devServer = require('../../tools/development-server');
const devPort = 8080;

devServer.listen(devPort, '0.0.0.0', () => {});
