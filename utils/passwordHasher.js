import bcrypt from 'bcryptjs';

/** Password hashing abstraction (SRP + DIP). */
export const passwordHasher = {
  hash(plain, rounds = 10) {
    return bcrypt.hash(plain, rounds);
  },
  compare(plain, hashed) {
    return bcrypt.compare(plain, hashed);
  },
};
