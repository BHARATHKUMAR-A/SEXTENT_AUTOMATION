import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : 4,

  reporter: [
     // HTML Report in report folder
    ['html', { outputFolder: 'reports/html-report', open: 'never' }],
    // ['html', { outputFolder: 'playwright-report/' + (new Date()).toISOString()}],
    
    //allure report
    ['allure-playwright'],

     ['junit', { outputFile: 'results.xml' }],
  ],


  outputDir: 'reports/artifacts', // Store output logs & artifacts in the report folder

  timeout: 6000 * 10000, // Global test timeout

  expect: {
    timeout: 1000000, // Timeout for expect assertions
  },

  use: {
    screenshot: 'only-on-failure', // Capture screenshots only on failure
    video: 'retain-on-failure', // Record video for failed tests
    trace: 'on-first-retry', // Generate traces for debugging
    actionTimeout: 100000, // Timeout for individual actions
    navigationTimeout: 100000, // Timeout for navigations
  },

  projects: [
    // {
    //   name: 'chromium',
    //   use: {
    //     browserName: 'chromium',
    //     headless: process.env.CI ? true : false, // Run headless in CI
    //     viewport: null, // Disable fixed viewport
    //     launchOptions: {
    //       args: ['--start-maximized'], // Maximize the window
    //     },
    //   },
    // },


    // headed mode
    {
      name: 'edge',
      use: {
        browserName: 'chromium',
        channel: 'msedge', // Use the Edge browser
        headless:false, // Run headless in CI
        viewport: null, // Disable fixed viewport
        launchOptions: {
          args: ['--start-maximized'], // Maximize the window
        },
       },
    },

    //   //headless mode
    // {
    //   name: 'edge',
    //   use: {
    //     browserName: 'chromium',
    //     channel: 'msedge',
    //     headless: true,
    //     viewport: process.env.CI ? { width: 1920, height: 1080 } : null,
    //     launchOptions: {
    //       args: [
    //         '--window-size=1920,1080',
    //         '--force-device-scale-factor=1',
    //       ],
    //     },
    //     screenshot: 'only-on-failure',
    //     video: 'retain-on-failure',
    //   },
    // }
  ],
});
