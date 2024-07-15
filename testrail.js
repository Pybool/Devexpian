const { createCaseAndPublishResult } = require("./testrailhelper.js")
var btoa = require("btoa")
const axios = require("axios")
const fs = require("fs")
const yargs = require("yargs")
const argv = yargs.option("init", {
  describe: "Initilize Exporter",
  type: "boolean",
  default: false,
}).argv
console.log("Argv ", argv)
require("dotenv").config()
const envFIle = process.env
const options = {
  username: envFIle.TESTRAIL_USERNAME,
  password: envFIle.TESTRAIL_PASSWORD,
  url: envFIle.TESTRAIL_URL,
  apikey: envFIle.APIKEY,
}

const projectId = envFIle.TESTRAIL_PROJECTID
const testrailPlan = envFIle.TESTRAIL_PLAN
const suiteId = envFIle.TESTRAIL_SUITEID
const auth = btoa(options.username + ":" + options.password)
const opt = { headers: { Authorization: `Basic ${auth}` } }
var environments = []

var topDir = []
var sectionsList = []

async function createTestRun() {
  await getsectionsList()
  const response = await axios.post(
    `${options.url}/index.php?/api/v2/add_plan_entry/${testrailPlan}`,
    {
      suite_id: suiteId,
      name: `Daily Test Run Res 2 Frontend- ${new Date().toLocaleDateString()}`,
      include_all: true,
    },
    {
      auth: {
        username: options.username,
        password: options.password,
      },
    }
  )
  return response.data.runs[0].id
}


async function getsectionsList() {
  sectionsList = []
  var res = await axios.get(
    `${options.url}/index.php?/api/v2/get_sections/${projectId}&suite_id=${suiteId}`,
    opt
  )
  for (let i = 0; i < res.data.sections.length; i++) {
    sectionsList.push(res.data.sections[i])
  }
  return null
}
function getSectionObject(arr, name) {
  return arr.find((section) => section.name == name)
}

async function addDirectories(env, files) {
  const dirnames = []
  files.forEach((file) => {
    dirnames.push(file.replaceAll(".cucumber.json", ""))
  })
  dirnames.forEach(async (dirname) => {
    const envSection = getSectionObject(sectionsList, env)
    const section = getSectionObject(sectionsList, dirname)
    if (!section) {
      let parent_id = envSection.id
      axios.post(
        `${options.url}/index.php?/api/v2/add_section/${projectId}`,
        { suite_id: suiteId, name: dirname, parent_id: parent_id },
        opt
      )
    }
  })
}
const cleanDirectory = () => {
  try {
    if (argv.cleandir) {
      let resultDir = "cypress/cucumber-json/"
      console.log("Cleaning ......")
      fs.readdirSync(resultDir).forEach((v) => fs.rmSync(resultDir + v))
    }
  } catch {console.log('An error occured')}
}

const exportTest = async (createsubdirs) => {
  console.log(
    `[TEST EXPORTER :] ${new Date().toLocaleDateString()}: Starting Export`
  )
  let resultDir = "cypress/cucumber-json/"
  let allFiles = []
  if (fs.existsSync(resultDir)) {
    allFiles = fs.readdirSync(resultDir)
    let runId = await createTestRun()

    environments.forEach(async (env) => {
      console.log("createsubdirs", createsubdirs)
      if (createsubdirs) await addDirectories(env, allFiles)
        if (argv.export && (argv.Bookings || argv.Reservations)) {
          console.log("Exporting")
          await getsectionsList()
          for (const file of allFiles) {
            if (file.includes("cucumber.json")) {
              let file_location = JSON.parse(fs.readFileSync(resultDir + file))
              await createCaseAndPublishResult(
                opt,
                projectId,
                suiteId,
                options,
                file_location,
                runId,
                getsectionsList,
                getSectionObject,
                sectionsList,
                env
              )
            }
          }
        }
    })
    cleanDirectory()
  } else {
    throw new Error("No File to export")
  }
}

async function deleteSections() {
  await getsectionsList()
  sectionsList.forEach(async (section) => {
    await axios.post(
      `${options.url}/index.php?/api/v2/delete_section/${section.id}`,
      {},
      opt
    )
  })
}

try {
  environments = []
  if (argv.delete) {
    deleteSections()
  }

  if (argv.init) {
    (async function () {
      await getsectionsList()
      topDir = ["Bookings", "Reservations"]
      for (let i = 0; i < topDir.length; i++) {
        const section = getSectionObject(sectionsList, topDir[i])
        if (section === undefined) {
          await axios.post(
            `${options.url}/index.php?/api/v2/add_section/${projectId}`,
            { suite_id: suiteId, name: topDir[i] },
            opt
          )
        }
      }
    })()
  }

  if (argv.createsubdirs) {
    environments = ["Bookings", "Reservations"]
    exportTest(argv.createsubdirs)
  }

  if (argv.export) {
    environments = []
    if (argv.Bookings) {
      environments.push("Bookings")
    }

    if (argv.Reservations) {
      environments.push("Reservations")
    }
    exportTest(argv.export)
  }
} catch {console.log("error")}
