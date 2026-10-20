import { type ChildProcess, spawn } from "node:child_process";

const DEFAULT_TIMEOUT_MS = 5 * 60 * 1000;

const activeProcesses = new Set<ChildProcess>();

export type RunCommandOptions = {
  readonly cwd: string;
  readonly timeoutMs?: number;
  /** Inherit stdio so the user sees progress (default true). */
  readonly inheritOutput?: boolean;
};

/** Runs a command to completion; rejects on spawn failure, non-zero exit or timeout. */
export function runCommand(
  command: string,
  args: readonly string[],
  options: RunCommandOptions,
): Promise<void> {
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const fullCommand = [command, ...args].join(" ");

  return new Promise((resolve, reject) => {
    let timedOut = false;
    const child = spawn(command, [...args], {
      cwd: options.cwd,
      env: process.env,
      stdio: ["ignore", options.inheritOutput === false ? "ignore" : "inherit", "inherit"],
      // npm, pnpm and yarn are .cmd shims on Windows.
      shell: process.platform === "win32",
    });
    activeProcesses.add(child);

    const timer = setTimeout(() => {
      timedOut = true;
      child.kill("SIGTERM");
    }, timeoutMs);

    const finish = (): void => {
      clearTimeout(timer);
      activeProcesses.delete(child);
    };

    child.once("error", (error) => {
      finish();
      reject(new Error(`Failed to run "${command}": ${error.message}`));
    });

    child.once("close", (code) => {
      finish();
      if (timedOut) {
        reject(new Error(`Command "${fullCommand}" timed out after ${timeoutMs / 1000}s.`));
      } else if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command "${fullCommand}" failed with exit code ${code ?? "unknown"}.`));
      }
    });
  });
}

/**
 * Runs a command attached to this terminal (stdin included, so its prompts work) and resolves
 * with its exit code. Rejects only when the command cannot be started.
 */
export function runAttached(
  command: string,
  args: readonly string[],
  env: NodeJS.ProcessEnv,
): Promise<number> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, [...args], {
      env,
      stdio: "inherit",
      shell: process.platform === "win32",
    });
    activeProcesses.add(child);
    child.once("error", (error) => {
      activeProcesses.delete(child);
      reject(new Error(`Failed to run "${command}": ${error.message}`));
    });
    child.once("close", (code, signal) => {
      activeProcesses.delete(child);
      resolve(code ?? (signal ? 130 : 1));
    });
  });
}

/** Kills child processes still running (called on Ctrl+C). */
export function killActiveProcesses(): void {
  for (const child of activeProcesses) {
    if (child.exitCode === null) {
      child.kill("SIGTERM");
    }
  }
  activeProcesses.clear();
}
