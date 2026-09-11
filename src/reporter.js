import chalk from "chalk";

export function reportEnvironment(result) {
  console.log(`\n${chalk.bold("Environment Check")}\n`);

  if (result.missing.length > 0) {
    console.log(chalk.red.bold("Missing variables:"));

    for (const variable of result.missing) {
      console.log(
        `  ${chalk.red("✗")} ${chalk.red(variable)} - not defined in .env`,
      );
    }

    console.log();
  }
  if (result.missingValues.length > 0) {
    console.log(chalk.red.bold("Variables with missing values:"));

    for (const variable of result.missingValues) {
      console.log(
        `  ${chalk.red("✗")} ${chalk.red(variable)} - defined in .env but has no value`,
      );
    }
  }

  if (result.unused.length > 0) {
    console.log(chalk.yellow.bold("Unused variables:"));

    for (const variable of result.unused) {
      console.log(
        `  ${chalk.yellow("⚠")} ${chalk.yellow(variable)} - defined but not used`,
      );
    }

    console.log();
  }

  if (result.valid) {
    console.log(chalk.green.bold("✓ Environment is valid."));
    console.log(chalk.green("✓ All required variables are defined.\n"));

    return true;
  }

  console.log(chalk.red.bold("✗ Environment check failed."));
  console.log(chalk.red("Application was not started.\n"));

  return false;
}
