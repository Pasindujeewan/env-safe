import { test, assert } from "vitest";

import { analyzeEnvironment } from "../src/analyzer.js";

test("analyzeEnvironment returns valid when all used variables are defined", () => {
  const usedVariables = ["VAR1", "VAR2"];

  const definedVariables = [
    { name: "VAR1", value: "value1" },
    { name: "VAR2", value: "value2" },
    { name: "VAR3", value: "value3" },
  ];

  const result = analyzeEnvironment(usedVariables, definedVariables);

  assert(result.valid === true);
  assert(result.missing.length === 0);
  assert(result.unused.some((variable) => variable.name === "VAR3"));
});

test("analyzeEnvironment returns missing variables when some used variables are not defined", () => {
  const usedVariables = ["VAR1", "VAR2", "VAR4"];

  const definedVariables = [
    { name: "VAR1", value: "value1" },
    { name: "VAR2", value: "value2" },
    { name: "VAR3", value: "value3" },
  ];

  const result = analyzeEnvironment(usedVariables, definedVariables);

  assert(result.valid === false);
  assert(result.missing.includes("VAR4"));
});

test("analyzeEnvironment returns invalid when a defined variable has no value", () => {
  const usedVariables = ["VAR1", "VAR2"];

  const definedVariables = [
    { name: "VAR1", value: "value1" },
    { name: "VAR2", value: "" },
  ];

  const result = analyzeEnvironment(usedVariables, definedVariables);

  assert(result.valid === false);
  assert(result.missingValues.includes("VAR2"));
});

test("analyzeEnvironment returns no unused variables when all defined variables are used", () => {
  const usedVariables = ["VAR1", "VAR2"];

  const definedVariables = [
    { name: "VAR1", value: "value1" },
    { name: "VAR2", value: "value2" },
  ];

  const result = analyzeEnvironment(usedVariables, definedVariables);

  assert(result.unused.length === 0);
});
