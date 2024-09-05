export class UserNotFoundException extends Error {
  constructor(public readonly uuid?: string) {
    super(`User not found ${uuid}`);
  }
}
