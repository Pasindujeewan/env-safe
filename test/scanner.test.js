import { test, expect, beforeEach, afterEach } from "vitest";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

import { scanProject } from "../src/scanner.js";

let tempDirectory;

beforeEach(() => {
  tempDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "env-safe-test-"));
});

afterEach(() => {
  fs.rmSync(tempDirectory, { recursive: true, force: true });
});

test("finds environment variables from JavaScript files", () => {
  fs.writeFileSync(
    path.join(tempDirectory, "app.js"),
    `
      const port = process.env.PORT;
      const db = process.env.DATABASE_URL;
    `,
  );

  const result = scanProject(tempDirectory);

  expect(result).toEqual(expect.arrayContaining(["PORT", "DATABASE_URL"]));
});

test("does not return duplicate environment variables", () => {
  fs.writeFileSync(
    path.join(tempDirectory, "app.js"),
    `
      console.log(process.env.PORT);
      console.log(process.env.PORT);
      console.log(process.env.API_KEY);
    `,
  );

  const result = scanProject(tempDirectory);

  expect(result).toHaveLength(2);
  expect(result).toEqual(expect.arrayContaining(["PORT", "API_KEY"]));
});

test("scans nested directories", () => {
  const srcDirectory = path.join(tempDirectory, "src");

  fs.mkdirSync(srcDirectory);

  fs.writeFileSync(
    path.join(srcDirectory, "server.js"),
    "const db = process.env.DATABASE_URL;",
  );

  const result = scanProject(tempDirectory);

  expect(result).toContain("DATABASE_URL");
});

test("ignores node_modules", () => {
  const nodeModulesDirectory = path.join(tempDirectory, "node_modules");

  fs.mkdirSync(nodeModulesDirectory);

  fs.writeFileSync(
    path.join(nodeModulesDirectory, "package.js"),
    "const secret = process.env.NODE_MODULE_SECRET;",
  );

  const result = scanProject(tempDirectory);

  expect(result).not.toContain("NODE_MODULE_SECRET");
});

test("ignores unsupported file extensions", () => {
  fs.writeFileSync(
    path.join(tempDirectory, "README.md"),
    "process.env.SHOULD_NOT_BE_FOUND",
  );

  const result = scanProject(tempDirectory);

  expect(result).not.toContain("SHOULD_NOT_BE_FOUND");
});

test("uses custom extensions", () => {
  fs.writeFileSync(
    path.join(tempDirectory, "config.txt"),
    "process.env.CUSTOM_VARIABLE",
  );

  const result = scanProject(tempDirectory, {
    extensions: [".txt"],
  });

  expect(result).toContain("CUSTOM_VARIABLE");
});
