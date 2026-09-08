export function reportEnvironment(result) {
  console.log("\nEnvironment Check\n");

  // Missing variables
  if (result.missing.length > 0) {
    console.log("Missing variables:");

    for (const variable of result.missing) {
      console.log(`  ✗ ${variable} - not defined in .env`);
    }

    console.log();
  }

  // Unused variables
  if (result.unused.length > 0) {
    console.log("Unused variables:");

    for (const variable of result.unused) {
      console.log(`  ⚠ ${variable} - defined but not used`);
    }

    console.log();
  }

  // Final result
  if (result.valid) {
    console.log("✓ Environment is valid.");
    console.log("✓ All required variables are defined.\n");

    return true;
  }

  console.log("✗ Environment check failed.");
  console.log("Application was not started.\n");

  return false;
}
