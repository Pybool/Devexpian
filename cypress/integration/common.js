import { Given, When, Then } from "cypress-cucumber-preprocessor/steps"
import LoginPage from "../pom/Loginpage"
import loginMetaData from "../metadata/loginpage.meta"
import AccountsPage from "../pom/accountspage"
import Commonpage from "../pom/commonpage"
const accountsPage = AccountsPage
const loginPage = LoginPage
const common = Commonpage

When("I navigate to the {string} page on the selected environment", (page) => {
  cy.visit(loginMetaData.urls[Cypress.env('testenv')][page])
})

Given("I am logged into Account area", () => {
  cy.visit(loginMetaData.urls[Cypress.env('testenv')]["login"])
  const data = {
    email: Cypress.env("EXPIAN-USERNAME"),
    password: Cypress.env("EXPIAN-PASSWORD"),
    button: "Sign in",
  }
  loginPage.signIn(data)
})

Then("I click the {string} navigation link", (navItem) => {
  accountsPage.elements.navbarItem(navItem).click()
})

Then("I click the {string} link button", (btnTxt) => {
  common.elements.anchorTxtButton(btnTxt).click()
})
