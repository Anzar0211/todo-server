import { UnauthorizedError } from '../errors/AppError.js';
import { userRepository as defaultUserRepository } from '../repositories/userRepository.js';
import { tokenService as defaultTokenService } from '../utils/tokenService.js';

export function createRequireAuth({
  tokens = defaultTokenService,
  users = defaultUserRepository,
} = {}) {
  return async function requireAuth(req, _res, next) {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return next(new UnauthorizedError('Sign in to continue'));

    try {
      const payload = tokens.verify(token);
      const user = await users.findById(payload.id);
      if (!user) return next(new UnauthorizedError('Sign in to continue'));
      req.user = user;
      next();
    } catch (err) {
      if (err instanceof UnauthorizedError) return next(err);
      return next(new UnauthorizedError('Session expired. Please sign in again.'));
    }
  };
}

export const requireAuth = createRequireAuth();
