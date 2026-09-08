export class EnvCheckerError extends Error {
  constructor(message) {
    super(message);
    this.name = "EnvCheckerError";
  }
}
