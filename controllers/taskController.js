import { taskService } from '../services/taskService.js';

export async function listTasks(req, res) {
  res.json(await taskService.list(req.user._id));
}

export async function createTask(req, res) {
  res.status(201).json(await taskService.create(req.user._id, req.body));
}

export async function updateTask(req, res) {
  res.json(await taskService.update(req.user._id, req.params.id, req.body));
}

export async function deleteTask(req, res) {
  await taskService.remove(req.user._id, req.params.id);
  res.status(204).end();
}
