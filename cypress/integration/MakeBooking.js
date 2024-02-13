import {Given, When, Then } from "cypress-cucumber-preprocessor/steps"
import MakeBookings from "../pom/Makebooking"
import loginMetaData from "../metadata/loginpage.meta"
const makeBookingPage = MakeBookings

const visitorSelection = {
  "4 Adults": { count: 4, visitorType: "Adult" },
  "2 Adults": { count: 2, visitorType: "Adult" },
  "1 Adults": { count: 1, visitorType: "Adult" },
  "2 Child": { count: 2, visitorType: "Child" },
  "3 Under 3": { count: 3, visitorType: "Under 3" },
}

Given("I am logged in to lakedistrict environment", () => {
  cy.visit(loginMetaData.urls[Cypress.env("testenv")]["login"])
  const data = {
    email: Cypress.env("LAKEDISTRICT-EXPIAN-USERNAME"),
    password: Cypress.env("EXPIAN-PASSWORD"),
  }
  makeBookingPage.lakeDistrictLogin(data)
})

When("I click on the {string} card on the {string} page", (card, page) => {
  makeBookingPage.validateLakeDistrictReservationSystemPage(page)
  makeBookingPage.clickNewBookingCard(card)
})

Then("I select {string} on the modal market list", (market) => {
  let index = 1
  if (market != "Ullswater market") index = 2
  makeBookingPage.selectMarketItem(index)
})

Then("I click {string} button on Event or Journey page", (text) => {
  makeBookingPage.bookJourney(text)
})

Then("I click {string} button on Event or Journey page", (text) => {
  makeBookingPage.bookJourney(text)
})

Then("I select the {string} location", (text) => {
  makeBookingPage.selectFromOrTo(text)
})

Then("I should see the {string} modal", (text) => {
  makeBookingPage.elements.fromToModal(text).should("be.visible")
})

Then("I select a date in the modal that pops up", () => {
  cy.iframe("#ticknovate-frame", { timeout: 60000 })
    .find('div[class^="modal-module_caddy"]')
    .find("span")
    .contains("From")
    .parent()
    .click()
})

Then("I select an option in the {string} modal", (text) => {
  makeBookingPage.elements.fromToModalOptions(text).should("be.visible")
  makeBookingPage.elements
    .fromToModalOptions(text)
    .children()
    .eq(0)
    .click({ force: true })
})

Then("I click the {string} button", (text) => {
  makeBookingPage.elements.modalNextButton(text).click({ force: true })
})

Then("I select {string} in the modal that pops up", (visitors) => {
  console.log("Vis Type ", visitorSelection[visitors].visitorType)
  makeBookingPage.elements
    .visitorSelectorInput(visitorSelection[visitors].visitorType)
    .type(visitorSelection[visitors].count, { force: true })
})

Then("I select a ticket", () => {
  makeBookingPage.selectTicket()
})

Then("The {string} widget show be visible", (text) => {
  makeBookingPage.elements
    .bookingSummaryHeader(text)
    .should("exist")
    .and("be.visible")

  makeBookingPage.elements
    .bookingSummaryHeader(text)
    .parent()
    .find("span")
    .contains("Total")
    .eq(0)
    .should("exist")
    .and("be.visible")
})

Then("I click the main done button", () => {
  makeBookingPage.elements.mainDoneButton().should("not.have.attr", "disabled")
  makeBookingPage.elements
    .mainDoneButton()
    .should("be.visible")
    .click({ force: true })
})

Then("I fill in the needed contact details", () => {
  makeBookingPage.lakeDistrictFillContactsDetails()
})

Then("I accept terms conditions and newsletter", () => {
  makeBookingPage.confirmTermsAndConditionsAndNewLetter()
})

Then("I click the make payment button", () => {
  makeBookingPage.makePayment()
})

Then("I fill in the card details information", () => {
  makeBookingPage.lakeDistrictFillPaymentDetails()
})

Then("I click the complete payment button", () => {
  makeBookingPage.elements.completePaymentButton().click()
})
