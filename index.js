const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

// lista projetos
server.get("/projects", (req, res) => {
  return res.json(projects);
});

//lista projeto especifico
server.get("/projects/:index", (req, res) => {
  const { index } = req.params;

  return res.json(projects[index]);
});

// add projeto
server.post("/projects/", (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(projects);
});

// delete project
server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id === id);

  projects.splice(projectIndex, 1);

  return res.json(projects);
});

// update project
server.put("/projects/:id", (req, res) => {
  const { id } = req.params;

  const { title } = req.body;

  const project = projects.find(p => p.id === id);

  project.title = title;
  return res.json(project);
});

server.post("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  const { tasks } = req.body;

  const project = projects.find(p => p.id === id);

  project.tasks.push(tasks);
  return res.json(project);
});

server.listen(3000);
