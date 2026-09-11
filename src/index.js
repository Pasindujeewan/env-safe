import { scanProject } from "./scanner.js";
import { readEnvFile } from "./env-reader.js";
import { analyzeEnvironment } from "./analyzer.js";
import { reportEnvironment } from "./reporter.js";
import { EnvCheckerError } from "./error.js";

export function checkEnvironment(projectPath = process.cwd()) {
  try {
    //Scan user's source code
    const usedVariables = scanProject(projectPath);

    // Read user's .env file
    const definedVariables = readEnvFile(`${projectPath}/.env`);

    // Compare them
    const result = analyzeEnvironment(usedVariables, definedVariables);

    return reportEnvironment(result);
  } catch (error) {
    // Handle specific error cases
    // If the .env file is missing, throw a specific error
    if (error.code === "ENOENT") {
      throw new EnvCheckerError(`No .env file found in ${projectPath}`);
    }

    throw new EnvCheckerError(`Environment check failed: ${error.message}`);
  }
}
