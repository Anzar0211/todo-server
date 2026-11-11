import { BadRequestError, ConflictError, UnauthorizedError } from '../errors/AppError.js';
import { userRepository as defaultUserRepository } from '../repositories/userRepository.js';
import { passwordHasher as defaultPasswordHasher } from '../utils/passwordHasher.js';
import { tokenService as defaultTokenService } from '../utils/tokenService.js';
import { toPublicUser as defaultToPublicUser } from '../utils/userSerializer.js';

/**
 * Auth business rules (SRP).
 * Dependencies injected so implementations can be swapped (DIP / OCP).
 */
export function createAuthService({
  users = defaultUserRepository,
  passwords = defaultPasswordHasher,
  tokens = defaultTokenService,
  serializeUser = defaultToPublicUser,
} = {}) {
  return {
    async register({ name, email, password } = {}) {
      if (!name?.trim() || !email?.trim() || !password) {
        throw new BadRequestError('Name, email, and password are required');
      }
      if (String(password).length < 6) {
        throw new BadRequestError('Password must be at least 6 characters');
      }

      const normalizedEmail = email.trim().toLowerCase();
      if (await users.findByEmail(normalizedEmail)) {
        throw new ConflictError('An account with this email already exists');
      }

      const user = await users.create({
        name: name.trim(),
        email: email.trim(),
        password: await passwords.hash(password),
      });

      return { token: tokens.sign(user), user: serializeUser(user) };
    },

    async login({ email, password } = {}) {
      if (!email?.trim() || !password) {
        throw new BadRequestError('Email and password are required');
      }

      const user = await users.findByEmailWithPassword(email.trim().toLowerCase());
      if (!user || !(await passwords.compare(password, user.password))) {
        throw new UnauthorizedError('Invalid email or password');
      }

      return { token: tokens.sign(user), user: serializeUser(user) };
    },

    me(user) {
      return { user: serializeUser(user) };
    },
  };
}

export const authService = createAuthService();
