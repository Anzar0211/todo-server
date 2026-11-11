import Task from '../models/Task.js';

/**
 * Task persistence only (SRP).
 * Controllers/services depend on this abstraction, not Mongoose (DIP).
 */
export const taskRepository = {
  findByUser(userId) {
    return Task.find({ user: userId }).sort({ dueAt: 1 });
  },
  create(data) {
    return Task.create(data);
  },
  updateOwned(id, userId, data) {
    return Task.findOneAndUpdate(
      { _id: id, user: userId },
      data,
      { new: true, runValidators: true }
    );
  },
  deleteOwned(id, userId) {
    return Task.findOneAndDelete({ _id: id, user: userId });
  },
};
