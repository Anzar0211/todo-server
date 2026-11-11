import { NotFoundError } from '../errors/AppError.js';
import { taskRepository as defaultTaskRepository } from '../repositories/taskRepository.js';
import { pickFields } from '../utils/pickFields.js';

const TASK_FIELDS = ['title', 'description', 'dueAt', 'endsAt', 'status'];

/**
 * Task business rules (SRP).
 * Dependencies injected so implementations can be swapped (DIP / OCP).
 */
export function createTaskService({ tasks = defaultTaskRepository } = {}) {
  return {
    list(userId) {
      return tasks.findByUser(userId);
    },

    create(userId, body) {
      return tasks.create({ ...pickFields(body, TASK_FIELDS), user: userId });
    },

    async update(userId, taskId, body) {
      const task = await tasks.updateOwned(taskId, userId, pickFields(body, TASK_FIELDS));
      if (!task) throw new NotFoundError('Task not found');
      return task;
    },

    async remove(userId, taskId) {
      const task = await tasks.deleteOwned(taskId, userId);
      if (!task) throw new NotFoundError('Task not found');
      return task;
    },
  };
}

export const taskService = createTaskService();
