import { test, assert } from "vitest";
import { analyzeEnvironment } from "../src/analyzer.js";

test("analyzeEnvironment returns valid when all used variables are defined", () => {
  const usedVariables = ["VAR1", "VAR2"];
  const definedVariables = ["VAR1", "VAR2", "VAR3"];
  const result = analyzeEnvironment(usedVariables, definedVariables);
  assert(result.valid === true);
});

test("analyzeEnvironment returns missing variables when some used variables are not defined", () => {
  const usedVariables = ["VAR1", "VAR2", "VAR4"];
  const definedVariables = ["VAR1", "VAR2", "VAR3"];
  const result = analyzeEnvironment(usedVariables, definedVariables);
  assert(result.valid === false);
  assert(result.missing.includes("VAR4"));
});
