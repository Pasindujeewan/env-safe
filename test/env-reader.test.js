import { test, assert } from "vitest";
import { readEnvironment } from "../src/env-reader.js";

test("readEnvironment returns an array of variable names from a .env file", () => {
  const mockEnvContent = `
    # This is a comment
    VAR1=value1
    VAR2=value2
  `;
  const result = readEnvironment(mockEnvContent);
  assert(result.includes("VAR1"));
  assert(result.includes("VAR2"));
});
