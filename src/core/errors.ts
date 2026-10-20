/** Invalid command-line usage (exit code 64). */
export class CliUsageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CliUsageError";
  }
}

/** The user cancelled a prompt (exit code 130). */
export class CancelledError extends Error {
  constructor(message = "Operation cancelled.") {
    super(message);
    this.name = "CancelledError";
  }
}

/** The selected stack is invalid or not yet available (exit code 64). */
export class ConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConfigError";
  }
}
