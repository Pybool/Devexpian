import { defineConfig } from "cypress"
import dotenv from "dotenv"
dotenv.config()
const cucumber = require("cypress-cucumber-preprocessor").default
const getCompareSnapshotsPlugin = require("cypress-image-diff-js/dist/plugin")

module.exports = defineConfig({
  projectId: "expian-e2e-cy",
  e2e: {
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber()),
        getCompareSnapshotsPlugin(on, config),
        on("task", {
          storeData({ key, value }) {
            globalThis.myData = globalThis.myData || {}
            globalThis.myData[key] = value
            return null
          },
        })

      on("task", {
        getData({ key }) {
          const value = globalThis.myData?.[key]
          return value || "" // Return the retrieved data
        },
      })
    },
    testIsolation: true,
    retries: {
      runMode: 1,
      openMode: 1,
    },
    defaultCommandTimeout: 40000,
    chromeWebSecurity: false,
    videoCompression: false,
    specPattern: "**/*.feature",
    env: {},
    viewportHeight: 700,
    viewportWidth: 1240,
    fileServerFolder: ".",
    supportFile: "./cypress/support/e2e.js",
    videosFolder: "./cypress/videos",
    screenshotsFolder: "./cypress/screenshots",
    fixturesFolder: "./cypress/fixtures",
    downloadsFolder: "./cypress/downloads",
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 3,
    video: false,
    baseUrl: "https://booking.default-qa8.ticknovate-test.com/",
  },
})
