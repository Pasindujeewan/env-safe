import { test, assert } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { readEnvFile } from "../src/env-reader.js";

test("readEnvFile returns variables and values from a .env file", () => {
  const tempDirectory = fs.mkdtempSync(
    path.join(os.tmpdir(), "env-safe-test-"),
  );

  const envFile = path.join(tempDirectory, ".env");

  fs.writeFileSync(
    envFile,
    `
      # This is a comment
      VAR1=value1
      VAR2=value2
    `,
  );

  const result = readEnvFile(envFile);

  assert.deepEqual(result, [
    { name: "VAR1", value: "value1" },
    { name: "VAR2", value: "value2" },
  ]);
});
