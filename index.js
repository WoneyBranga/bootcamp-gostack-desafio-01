const express = require("express");

const server = express();

server.use(express.json());

let requestsCount = 0;
const projects = [];

//middlewares

// check if id is valid
function checkIdProject(req, res, next) {
  const { id } = req.params;

  const projectExists = projects.find(p => p.id === id);

  if (!projectExists) {
    return res.status(400).json({ error: "id is not valid." });
  }

  return next();
}

//count Requests
function countRequests(req, res, next) {
  requestsCount++;
  console.log(`total of ${requestsCount} requests`);
  next();
}
server.use(countRequests);

// lista projetos
server.get("/projects", (req, res) => {
  return res.json(projects);
});

//lista projeto especifico
server.get("/projects/:index", checkIdProject, (req, res) => {
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
server.delete("/projects/:id", checkIdProject, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id === id);

  projects.splice(projectIndex, 1);

  return res.json(projects);
});

// update project
server.put("/projects/:id", checkIdProject, (req, res) => {
  const { id } = req.params;

  const { title } = req.body;

  const project = projects.find(p => p.id === id);

  project.title = title;
  return res.json(project);
});

// add task to a project
server.post("/projects/:id/tasks", checkIdProject, (req, res) => {
  const { id } = req.params;
  const { tasks } = req.body;

  const project = projects.find(p => p.id === id);

  project.tasks.push(tasks);
  return res.json(project);
});

server.listen(3000);
