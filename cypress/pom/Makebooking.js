import loginMetaData from "../metadata/loginpage.meta"
import newOrderMetaData from "../metadata/neworder.meta"

class MakeBookings {
  constructor() {
    this.contactInputIds = [
      "customer\\.firstname",
      "customer\\.lastname",
      "customer\\.company_name",
      "customer\\.telephone",
      "customer\\.email",
      "meta\\.email_confirm",
      "line_1",
      "line_2",
      "city",
      "post_code",
      "booking_note",
    ]

    this.cardDetailInputIds = [
      "cardholder-name",
      "card-number",
      "expiry-date",
      "security-code",
    ]

    this.cardDetails = ["Taye Tester", "4929000000006", "1230", "123"]

    this.elements = {
      emailInputField: (id) => cy.get(`input#${id}`),
      passWordInputField: (id) => cy.get(`input#${id}`),
      loginButton: () => cy.get(`[data-test-handle="btn-login"]`),
      loginButtonSpinner: () => this.elements.loginButton().find("svg"),
      pageLakeDistrictHeader: (page) => cy.get("h1").contains(page),
      completePaymentButton: () =>
        cy
          .iframe("#ticknovate-frame", { timeout: 120000 })
          .find("span")
          .contains("Complete payment")
          .parent(),
      makePaymentButton: (text) =>
        cy
          .iframe("#ticknovate-frame", { timeout: 120000 })
          .find("span")
          .contains(text)
          .parent()
          .parent(),
      checkButtons: (text, index) =>
        cy
          .iframe("#ticknovate-frame", { timeout: 120000 })
          .find("span")
          .contains(text)
          .parent()
          .parent()
          .eq(index),
      pageLakeDistrictCard: (card) => cy.get("h2").contains(card),
      contactInputField: (id) =>
        cy.iframe("#ticknovate-frame", { timeout: 120000 }).find(`input#${id}`),
      cardInputField: () =>
        cy
          // .iframe("#ticknovate-frame", { timeout: 120000 })
          .iframe("#payment-iframe")
          .find(`input`),
      marketsListItem: (index) =>
        cy.get(`[role="tablist"]`).eq(0).children().eq(index),
      bookJourneyButton: (text) =>
        cy
          .iframe("#ticknovate-frame", { timeout: 60000 })
          .find("span")
          .contains(text)
          .parentsUntil("button"),

      fromToButton: (text) =>
        cy
          .iframe("#ticknovate-frame", { timeout: 60000 })
          .find("span")
          .contains(text),

      fromToModal: (text) =>
        cy
          .iframe("#ticknovate-frame", { timeout: 60000 })
          .find('div[class^="modal-module_caddy"]')
          .find("h2")
          .contains(text),

      fromToModalOptions: (text) =>
        this.elements
          .fromToModal(text)
          .parent()
          .parent()
          .find('div[class^="optionlist-module_list"]'),

      modalNextButton: (text) =>
        cy
          .iframe("#ticknovate-frame", { timeout: 60000 })
          .find('div[class^="modal-module_caddy"]')
          .find("span")
          .contains(text)
          .parentsUntil("button")
          .eq(0),

      visitorSelector: (visitorType, add = true) => {
        let index = 1
        if (!add) index = 0
        cy.iframe("#ticknovate-frame", { timeout: 60000 })
          .find('div[class^="modal-module_caddy"]')
          .find("span")
          .contains(visitorType)
          .parent()
          .siblings()
          .eq(0)
          .find("button")
          .eq(index)
      },

      visitorSelectorInput: (visitorType) =>
        cy
          .iframe("#ticknovate-frame", { timeout: 60000 })
          .find('div[class^="modal-module_caddy"]')
          .find("span")
          .contains(visitorType)
          .parent()
          .parent()
          .find("input"),

      ticketGridList: () =>
        cy
          .iframe("#ticknovate-frame", { timeout: 60000 })
          .find('div[class^="modal-module_caddy"]')
          .find('div[class^="datetile-module_list"]')
          .eq(1),

      mainDoneButton: () =>
        cy
          .iframe("#ticknovate-frame", { timeout: 60000 })
          .find("button")
          .contains("Done"),

      bookingSummaryHeader: (text) =>
        cy
          .iframe("#ticknovate-frame", { timeout: 60000 })
          .find("h4")
          .contains(text),
    }
  }

  lakeDistrictLogin(data) {
    this.elements.emailInputField("username").typeFast(data.email)
    this.elements.passWordInputField("password").typeFast(data.password)
    this.elements.loginButton().click()
  }

  lakeDistrictFillContactsDetails() {
    cy.wrap(this.contactInputIds).each((contactInputId) => {
      const value =
        newOrderMetaData.DATA_OBJECT[
          contactInputId.replace("customer\\.", "").replace("meta\\.", "")
        ]
      this.elements.contactInputField(contactInputId).typeFast(value)
    })
  }

  lakeDistrictFillPaymentDetails() {
    this.elements
      .completePaymentButton()
      .should("exist")
      .and("be.visible")
      .then(() => {
        cy.iframe("#ticknovate-frame")
          .find("iframe")
          .should("be.visible")
          .as("payment-iframe")

        cy.iframe("@payment-iframe").then(($iframe) => {
          cy.wrap($iframe.contents()).then(($elements) => {
            $elements.eq(1).find("form")
            cy.wrap(
              Cypress.$($elements[1]).find("form")[0].querySelectorAll("input")
            ).then(($inputs) => {
              cy.wrap($inputs).each(($input, $index) => {
                cy.wrap($input).typeFast(this.cardDetails[$index])
              })
            })
          })
        })
      })
  }

  validateLakeDistrictReservationSystemPage(page) {
    // this.elements.loginButtonSpinner().should('not.exist')
    this.elements
      .pageLakeDistrictHeader(page)
      .should(
        "have.css",
        "color",
        loginMetaData.css.lakeDistrict.landingpageHeader.color
      )
  }

  clickNewBookingCard(card) {
    this.elements.pageLakeDistrictCard(card).parent().parent().click()
  }

  selectMarketItem(index) {
    this.elements.marketsListItem(index).click()
  }

  bookJourney(text) {
    this.elements.bookJourneyButton(text).eq(0).click()
  }

  selectFromOrTo(text) {
    if (text == "Visitors" || text == "Date") {
      cy.iframe("#ticknovate-frame", { timeout: 60000 })
        .find('div[class^="modal-module_caddy"]')
        .should("not.exist")
        .then(() => {
          this.elements
            .fromToButton(text)
            .should("be.visible")
            .click({ force: true })
        })
    } else {
      this.elements
        .fromToButton(text)
        .should("be.visible")
        .click({ force: true })
    }
  }

  selectTicket() {
    this.elements.ticketGridList().children().eq(1).click()
  }

  confirmTermsAndConditionsAndNewLetter() {
    this.elements.checkButtons("terms and conditions", 0).click()
  }

  makePayment() {
    this.elements.makePaymentButton("Make payment").click()
  }
}

module.exports = new MakeBookings()
