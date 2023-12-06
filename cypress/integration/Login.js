import { When, Then } from "cypress-cucumber-preprocessor/steps"
import LoginPage from "../pom/Loginpage"
import loginMetaData from "../metadata/loginpage.meta"
const testEnv = Cypress.env("testenv")
const loginPage = LoginPage

When("I click Logout button", () => {
  loginPage.elements.logOutNavButton("Logout").click()
})

Then("I login using valid {string} and {string}", () => {
  const data = {
    email: Cypress.env("EXPIAN-USERNAME"),
    password: Cypress.env("EXPIAN-PASSWORD"),
    button: "Sign in",
  }
  loginPage.signIn(data)
})

When("I login using invalid {string} and {string}", () => {
  const data = {
    email: Cypress.env("EXPIAN-USERNAME"),
    password: "Invalidpassword",
    button: "Sign in",
  }
  loginPage.signIn(data)
})

Then("The Login button displays", () => {
  loginPage.elements.loginOutNavButton("Login").should("be.visible")
})

Then("I should see {string} displayed", (error) => {
  switch (testEnv) {
    case "booking":
      loginPage.elements
        .loginErrorAlert()
        .should("exist")
        .and("be.visible")
        .and("have.text", error)
      break
    case "reservation":
      loginPage.elements
        .resLoginErrorAlert()
        .should("exist")
        // .and("be.visible")
        .and("have.text", error)
      break
    default:
  }
})

Then(
  "The account page should show the user email and have header {string}",
  (header) => {
    loginPage.elements
      .loginHeader(header)
      .as("header")
      .should("exist")
      .and("be.visible")
    loginPage.elements
      .loginHeader(header)
      .siblings()
      .last()
      .should("have.text", "Hi " + Cypress.env("EXPIAN-USERNAME"))
      .and("be.visible")
  }
)

Then("I should see the {string} modal displayed", () => {
  switch (testEnv) {
    case "booking":
      loginPage.elements.loginModal().should("exist").and("be.visible")
      break
    case "reservation":
      loginPage.elements.resLoginModal().should("exist").and("be.visible")
      break
    default:
  }
})

Then(
  "I should see that the {string} tab is highlighted on the top border",
  (btnText) => {
    loginPage.elements
      .btnTabWithText(btnText)
      .as("signInTab")
      .should("exist")
      .and("be.visible")
    cy.wrap(
      Object.keys(
        loginMetaData.css[Cypress.env("testenv")].loginmodal.signInNav
      )
    ).each((style) => {
      cy.get("@signInTab").should(
        "have.css",
        style,
        loginMetaData.css[Cypress.env("testenv")].loginmodal.signInNav[style]
      )
    })
  }
)

Then("I should see that there is an {string} label", (label) => {
  switch (testEnv) {
    case "booking":
      loginPage.elements.InputLabel(label).should("exist").and("be.visible")
      break
    case "reservation":
      loginPage.elements.resInputLabel(label).should("exist").and("be.visible")
      break
    default:
  }
})

Then("I should see that there is an {string} input field", (fieldName) => {
  loginPage.elements
    .loginCredential(fieldName)
    .should("exist")
    .and("be.visible")
})

Then(
  "I should see that there is a {string} button with the correct css properties",
  (btnText) => {
    switch (testEnv) {
      case "booking":
        loginPage.assertLoginButton(
          loginPage.elements.btnWithText(btnText),
          loginMetaData
        )
        break
      case "reservation":
        loginPage.assertLoginButton(
          loginPage.elements.inputBtnWithVal(btnText),
          loginMetaData
        )
        break
      default:
    }
  }
)

Then(
  "I should also see that there is a {string} link on the login page with the correct css properties",
  (linkText) => {
    switch (testEnv) {
      case "booking":
        loginPage.assertLinkButton(
          loginPage.elements.btnWithText(linkText),
          loginMetaData,
          "forgotPassword"
        )
        break
      case "reservation":
        loginPage.assertLinkButton(
          loginPage.elements.forgotPasswordLink(linkText),
          loginMetaData,
          "forgotPassword"
        )
        break
      default:
    }
  }
)

Then("user is not logged into account area", () => {
  loginPage.elements.loginHeaderNoExist().should("not.exist")
})

Then("the New Order page displays", () => {})
