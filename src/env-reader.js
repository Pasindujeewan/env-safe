import fs from "node:fs";

// Reads a .env file and extracts the variable names
export function readEnvFile(filePath = ".env") {
  const content = fs.readFileSync(filePath, "utf8");

  const variables = [];

  for (const line of content.split("\n")) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=/);

    if (match) {
      variables.push(match[1]);
    }
  }

  return variables;
}
