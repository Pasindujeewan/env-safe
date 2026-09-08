import { scanProject } from "./scanner.js";
import { readEnvFile } from "./env-reader.js";
import { analyzeEnvironment } from "./analyzer.js";
import { reportEnvironment } from "./reporter.js";

export function checkEnvironment(projectPath = process.cwd()) {
  //Scan user's source code
  const usedVariables = scanProject(projectPath);

  // Read user's .env file
  const definedVariables = readEnvFile(`${projectPath}/.env`);

  // Compare them
  const result = analyzeEnvironment(usedVariables, definedVariables);

  return reportEnvironment(result);
}
