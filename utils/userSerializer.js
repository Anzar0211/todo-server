/** Maps a user document to the public API shape (SRP). */
export function toPublicUser(user) {
  return { id: user._id, name: user.name, email: user.email };
}
