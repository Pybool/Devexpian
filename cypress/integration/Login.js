import {When, Then } from "cypress-cucumber-preprocessor/steps"
import LoginPage from "../pom/Loginpage"
import loginMetaData from "../metadata/loginpage.meta"

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
  loginPage.elements
    .loginErrorAlert()
    .should("exist")
    .and("be.visible")
    .and("have.text", error)
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
  loginPage.elements.loginModal().should("exist").and("be.visible")
})

Then(
  "I should see that the {string} tab is highlighted on the top border",
  (btnText) => {
    loginPage.elements
      .btnTabWithText(btnText)
      .as("signInTab")
      .should("exist")
      .and("be.visible")
    cy.wrap(Object.keys(loginMetaData.css.loginmodal.signInNav)).each(
      (style) => {
        cy.get("@signInTab").should(
          "have.css",
          style,
          loginMetaData.css.loginmodal.signInNav[style]
        )
      }
    )
  }
)

Then("I should see that there is an {string} label", (label) => {
  loginPage.elements.InputLabel(label).should("exist").and("be.visible")
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
    loginPage.elements
      .btnWithText(btnText)
      .should("exist")
      .and("be.visible")
      .and("have.css", "color", loginMetaData.css.loginmodal.signIn.color)
      .and(
        "have.css",
        "background-color",
        loginMetaData.css.loginmodal.signIn.backgroundColor
      )
  }
)

Then(
  "I should also see that there is a {string} link on the login page with the correct css properties",
  (linkText) => {
    loginPage.elements
      .btnWithText(linkText)
      .should("exist")
      .and("be.visible")
      .and(
        "have.css",
        "color",
        loginMetaData.css.loginmodal.forgotPassword.color
      )
      .and(
        "have.css",
        "background-color",
        loginMetaData.css.loginmodal.forgotPassword.backgroundColor
      )
  }
)

Then("user is not logged into account area", () => {
  loginPage.elements.loginHeaderNoExist().should("not.exist")
})

Then("the New Order page displays", () => {})
