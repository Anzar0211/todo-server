import { Router } from 'express';
import { requireAuth } from '../middleware/requireAuth.js';
import { listTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js';

const router = Router();

router.use(requireAuth);

router.get('/', listTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
