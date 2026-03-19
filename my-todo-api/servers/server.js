const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [
    {
        id: uuidv4(),
        title: "Пример задачи",
        description: "Это описание первой задачи",
        completed: false,
        createdAt: new Date().toISOString()
    }
];

// Маршруты
app.get('/tasks', (req, res) => res.json(tasks));

app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === req.params.id);
    task ? res.json(task) : res.status(404).json({ message: "Не найдено" });
});

app.post('/tasks', (req, res) => {
    const newTask = { id: uuidv4(), ...req.body, completed: false, createdAt: new Date().toISOString() };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
    const index = tasks.findIndex(t => t.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: "Не найдено" });
    tasks[index] = { ...tasks[index], ...req.body };
    res.json(tasks[index]);
});

app.delete('/tasks/:id', (req, res) => {
    tasks = tasks.filter(t => t.id !== req.params.id);
    res.status(204).send();
});

app.listen(PORT, () => console.log(`Сервер: http://localhost:${PORT}`));