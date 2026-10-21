import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "./tests",

  // Test execution
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // Reporting
  reporter: process.env.CI
    ? [["html", { open: "never" }], ["line"]]
    : [["html", { open: "never" }], ["list"]],

  // Shared test configuration
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:3001/en",

    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  // Browsers
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    //   {
    //     name: "firefox",
    //     use: { ...devices["Desktop Firefox"] },
    //   },
    //   {
    //     name: "webkit",
    //     use: { ...devices["Desktop Safari"] },
    //   },
  ],
});
