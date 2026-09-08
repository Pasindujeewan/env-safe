export function analyzeEnvironment(usedVariables, definedVariables) {
  const used = new Set(usedVariables);
  const defined = new Set(definedVariables);

  const missing = usedVariables.filter((variable) => !defined.has(variable));

  const unused = definedVariables.filter((variable) => !used.has(variable));

  const valid = missing.length === 0;

  return {
    valid,
    missing,
    unused,
  };
}
