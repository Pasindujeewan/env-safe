#!/usr/bin/env node

import { checkEnvironment } from "../src/index.js";

try {
  const valid = checkEnvironment();

  if (!valid) {
    process.exit(1);
  }

  process.exit(0);
} catch (error) {
  console.error("\nEnvironment checker error:");
  console.error(error.message);
  process.exit(1);
}
