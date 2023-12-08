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

When("I navigate to the {string} page on the {string} environment", (page,env) => {
  cy.visit(loginMetaData.urls[env][page])
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

Then("I click the {string} tab link", (tabItem) => {
  accountsPage.elements.tabItem(tabItem).click()
})

Then("I select the last created {string} to cancel it", () => {
  cy.get('h3').eq(1).parent().parent().find('a').click({force:true})
})

Then("I click the More Actions button", () => {
  common.storeOrderIdFromOrderDetailsPage()
  common.elements.spanTextButton('More Actions').click()
})

Then("I click the {string} option in the dropdown", (text) => {
  common.elements.spanTextButton(text).click()
})

Then("I validate the i am on the Amend Booking page with the correct OrderID", () => {
  common.validateAmendBookingPageByOrderID()
  common.validateAmendBookingPageByCancelText()
})

Then("I click the refund button", () => {
  common.elements.getButtonByText("Refund").click()
})

Then("I click the Complete refund button", () => {
  common.elements.completeRefundButton().click()
})

Then("Lead Member section should not be present", () => {
  common.elements.leadMemberSectionHeader().should('not.exist')
})

Then("Lead Member section should be present", () => {
  common.elements.leadMemberSectionHeader().should('exist')
})

Then("I should not see {string} button", (btnText) => {
  common.elements.overidePriceButton(btnText).should('not.exist')
})







