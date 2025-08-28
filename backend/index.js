const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { nanoid } = require('nanoid');
const app = express();
const PORT = 4000;

const DATA_PATH = './tasks.json';

app.use(cors());
app.use(express.json());

// Carrega tarefas do arquivo JSON
function loadTasks() {
  if (!fs.existsSync(DATA_PATH)) return [];
  const data = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(data);
}

// Salva tarefas no arquivo JSON
function saveTasks(tasks) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(tasks, null, 2));
}

app.get('/tasks', (req, res) => {
  const tasks = loadTasks();
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const tasks = loadTasks();
  const newTask = {
    id: nanoid(),
    text: req.body.text,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  const updatedTasks = [...tasks, newTask];
  saveTasks(updatedTasks);
  res.status(201).json(newTask);
});

app.put('/tasks/:id/toggle', (req, res) => {
  const tasks = loadTasks();
  const updatedTasks = tasks.map(task =>
    task.id === req.params.id ? { ...task, completed: !task.completed } : task
  );
  const updatedTask = updatedTasks.find(t => t.id === req.params.id);
  saveTasks(updatedTasks);
  res.json(updatedTask);
});

app.put('/tasks/:id', (req, res) => {
  const { text } = req.body;
  const tasks = loadTasks();
  const updatedTasks = tasks.map(task =>
    task.id === req.params.id ? { ...task, text } : task
  );
  const updatedTask = updatedTasks.find(t => t.id === req.params.id);
  saveTasks(updatedTasks);
  res.json(updatedTask);
});

app.delete('/tasks/:id', (req, res) => {
  const tasks = loadTasks();
  const updatedTasks = tasks.filter(task => task.id !== req.params.id);
  saveTasks(updatedTasks);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});