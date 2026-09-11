import fs from "node:fs";

export function readEnvFile(filePath = ".env") {
  const content = fs.readFileSync(filePath, "utf8");

  const variables = [];

  for (const line of content.split("\n")) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    // Match lines in the format of KEY=VALUE, allowing for optional whitespace around the equals sign
    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);

    if (match) {
      const variable = match[1];
      const value = match[2].trim();

      variables.push({
        name: variable,
        value,
      });
    }
  }

  return variables;
}
