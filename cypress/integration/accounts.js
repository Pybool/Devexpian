import { Then } from "cypress-cucumber-preprocessor/steps"
import AccountsPage from "../pom/accountspage"

const accountsPage = AccountsPage

Then(
  "I ensure that all nav links are complete and visible with each having an Icon",
  () => {
    accountsPage.checkNavLinks()
  }
)

Then("I should see that the Account Area has 6 tabs present", () => {})

Then(
  "For tab {string} The {string} count when {string} , {string} should be seen in the list below else count should match items displayed",
  (tabIndex, qString, count, emptyTxt) => {
    const data = { tabIndex, qString, count, emptyTxt }
    accountsPage.checkTabs(data)
  }
);
