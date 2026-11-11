import User from '../models/User.js';

/**
 * User persistence only (SRP).
 * Controllers/services depend on this abstraction, not Mongoose (DIP).
 */
export const userRepository = {
  findById(id) {
    return User.findById(id);
  },
  findByEmail(email) {
    return User.findOne({ email });
  },
  findByEmailWithPassword(email) {
    return User.findOne({ email }).select('+password');
  },
  create(data) {
    return User.create(data);
  },
};
