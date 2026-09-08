import fs from "node:fs";
import path from "node:path";
// Default extensions to scan
const DEFAULT_EXTENSIONS = [".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs"];

// Default directories to ignore
const DEFAULT_IGNORE = ["node_modules", ".git", "dist", "build", "coverage"];

// Scans a project directory for environment variable usage
export function scanProject(
  directory,
  { extensions = DEFAULT_EXTENSIONS, ignore = DEFAULT_IGNORE } = {},
) {
  const variables = new Set();

  scanDirectory(directory, extensions, ignore, variables);

  return [...variables];
}

// Recursively scans a directory for files with the specified extensions
function scanDirectory(directory, extensions, ignore, variables) {
  const entries = fs.readdirSync(directory, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (ignore.includes(entry.name)) {
      continue;
    }

    if (entry.isDirectory()) {
      scanDirectory(fullPath, extensions, ignore, variables);
      continue;
    }

    if (!extensions.includes(path.extname(entry.name))) {
      continue;
    }

    scanFile(fullPath, variables);
  }
}

// Scans a single file for environment variable usage
function scanFile(filePath, variables) {
  const content = fs.readFileSync(filePath, "utf8");

  const regex = /process\.env\.([A-Z_a-z][A-Z_a-z0-9]*)/g;

  let match;

  while ((match = regex.exec(content)) !== null) {
    variables.add(match[1]);
  }
}
