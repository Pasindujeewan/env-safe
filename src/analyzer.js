export function analyzeEnvironment(usedVariables, definedVariables) {
  // Convert arrays to sets for easier comparison
  const used = new Set(usedVariables);
  const defined = new Set(definedVariables.map((variable) => variable.name));

  const missing = usedVariables.filter((variable) => !defined.has(variable));

  const unused = definedVariables.filter(
    (variable) => !used.has(variable.name),
  );

  const missingValues = definedVariables
    .filter((variable) => variable.value === "")
    .map((variable) => variable.name);

  // Determine if the environment is valid (no missing or empty variables)
  const valid = missing.length === 0 && missingValues.length === 0;

  return {
    valid,
    missing,
    unused,
    missingValues,
  };
}
