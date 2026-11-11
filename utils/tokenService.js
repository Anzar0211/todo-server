import jwt from 'jsonwebtoken';

const secret = () => process.env.JWT_SECRET || 'dev-todo-secret-change-me';

/** JWT create/verify only (SRP + ISP). */
export const tokenService = {
  sign(user, expiresIn = '7d') {
    return jwt.sign({ id: user._id }, secret(), { expiresIn });
  },
  verify(token) {
    return jwt.verify(token, secret());
  },
};
