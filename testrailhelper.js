const axios = require("axios");

function findObjectByNameAndParentId(objects, name, parentId) {
  for (let i = 0; i < objects.length; i++) {
    if (objects[i].parent_id == parentId) {
      if (objects[i].name.trim() == name.trim()) {
        return objects[i];
      }
    }
  }
}

async function createCaseAndPublishResult(
  opt,
  projectId,
  suiteId,
  options,
  test,
  runId,
  getsectionsList,
  getSectionObject,
  sectionsList,
  testEnvironment
) {
  if (test.length > 0) {
    const intentSection = test[0].uri.replaceAll(".feature", " ");

    const environmentSection = getSectionObject(sectionsList, testEnvironment);
    const targetSection = findObjectByNameAndParentId(
      sectionsList,
      intentSection,
      environmentSection.id
    );
    if (targetSection) {
      var response = await axios.get(
        `${options.url}/index.php?/api/v2/get_cases/${projectId}&suite_id=${suiteId}&section_id=${targetSection.id}`,
        opt
      );
    }

    let genratedCase = generateEachCase(test);
    var cases;

    for (i = 0; i < genratedCase.length; i++) {
      while (1) {
        cases = response.data.cases.filter(function (v) {
          return v.title === genratedCase[i][0].title;
        });

        if (cases.length > 0 || response.data._links.next == null) {
          break;
        } else {
          response = await axios.get(
            `${options.url}/index.php?${response.data._links.next}`,
            opt
          );
        }
      }
      if (cases.length > 0) {
        await axios.post(
          `${options.url}/index.php?/api/v2/update_case/${cases[0].id}`,
          genratedCase[i][0],
          opt
        );
        await publishTestRun(cases[0].id, genratedCase[i][1], runId);
      } else {
        try {
          let resp = await axios.post(
            `${options.url}/index.php?/api/v2/add_case/${targetSection.id}`,
            genratedCase[i][0],
            opt
          );
          await publishTestRun(resp.data.id, genratedCase[i][1], runId);
        } catch (err) {}
      }
    }
  }
}
function generateEachCase(test) {
  let cases = [];
  var i = 0;
  if (test.length > 0) {
    test[0].elements.forEach((element) => {
      let steps = [];
      let duration = 0;
      let status = true;
      element.steps.forEach((step) => {
        let additional_info = step.result.status;
        duration += step.result.duration;
        if (step.result.status == "failed" || step.result.status == "pending") {
          status = false;
          additional_info =
            additional_info + "=>" + step?.result?.error_message;
        }
        if (step.name != "") {
          steps.push({
            content: step.keyword + " " + step.name,
            expected: additional_info,
            additional_info: additional_info,
            refs: "",
          });
        }
      });
      i++;
      cases.push([
        {
          title: element.name + i,
          type_id: 1,
          priority_id: 3,
          //"estimate": parseInt(duration/60000000).toString()+"m",
          refs: "",
          template_id: 2,
          custom_steps_separated: steps,
        },
        status,
      ]);
    });
  }

  return cases;
}
async function publishTestRun(caseIds, statusId, runId) {
  var statId;
  if (statusId) {
    statId = 1;
  } else {
    statId = 5;
  }
  try {
    await axios.post(
      `${options.url}/index.php?/api/v2/add_results_for_cases/${runId}`,
      {
        results: [
          {
            case_id: caseIds,
            status_id: statId,
            comment: "",
            defects: "",
          },
        ],
      },
      opt
    );
  } catch (e) {
    throw new Error("Unable to add run cast to testrail" + runId);
  }
}
module.exports = {
  createCaseAndPublishResult,
};
