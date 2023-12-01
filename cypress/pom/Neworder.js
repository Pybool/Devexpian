import newOrderMetaData from "../metadata/neworder.meta.js"
const x6 = 60000
const x4 = 40000
const cypress = cy

class OrdersPage {
  constructor() {
    this.previousCountText = ''
    this.currentCountText = ''
    this.elements = {
      navbarItem: (navText) => cy.get(`button.chakra-button`).contains(navText),
      pageHeader: (headerText) =>
        cy.get(`h2.chakra-heading`).contains(headerText),
      tabs: (index) =>
        cy
          .get("div.chakra-card")
          .children()
          .eq(index - 1),
      orderTypeBtn: (type) =>
        cy.get("ul.chakra-wrap__list").find("button").contains(type),
      section: (sectionText) =>
        cy
          .get("button.chakra-menu__menu-button > span > p.chakra-text")
          .contains(sectionText),
      whoSection: (sectionText) =>
        cy.get("button.chakra-button > p.chakra-text").contains(sectionText),
      whenSection: (sectionText) =>
        cy
          .get("button.chakra-menu__menu-button > p.chakra-text")
          .contains(sectionText),
      addToCartButton: (cartText) => cy.get("button").contains(cartText),
      checkoutButton: (checkOutText) => cy.get("button").contains(checkOutText),
      selectAddOnModal: (modalheaderText) =>
        cy.get("h2").contains(modalheaderText),
      selectDropDownByname: (field) =>
        cy.get(`select[name=${field}]`, { timeout: x4 }),
      selectInputByname: (field) =>
        cy.get(`input[name=${field}]`, { timeout: x4 }),
      optionsCheckoutCheckboxes: () => cy.get("input.chakra-checkbox__input"),
      continueToPayment: () =>
        cy
          .get('button[class^="chakra-button"]', { timeout: x4 })
          .find("div>p")
          .contains("Continue to payment", { timeout: x6 }),
      sagePayOption: () =>
        cy.get("p.chakra-text").contains("Via Card (SagePay)", { timeout: x6 }),
      paymentIframe: () =>
        cy.iframe("#payment-iframe", { timeout: x6 }).as("paymentIframe"),
      payButton: () =>
        cy
          .get('button[class^="chakra-button"]')
          .find("div>p")
          .contains("Pay", { timeout: x6 }),
      refLabel: () =>
        cy.get("p.chakra-text").contains("Order reference", { timeout: x6 }),
      orderCompleteHeader: () => cy.get("h3 > span").contains("Order complete"),
    }
  }


  chooseWhat(sectionText) {
    this.elements
      .section(sectionText)
      .parent()
      .parent()
      .as("what")
      .click()
      .then(($btn) => {
        cy.log($btn)
        cy.get("@what")
          .siblings()
          .eq(0)
          .find("button>span")
          .contains(Cypress.env("TEST_PRODUCT"))
          .parent()
          .click()
      })
  }

  chooseWho(sectionText, type, count) {
    this.elements
      .whoSection(sectionText)
      .click()
      .then(($btn) => {
        cy.wrap($btn)
          .parent()
          .siblings()
          .eq(0)
          .find("p.chakra-text")
          .contains(type)
          .parent()
          .parent()
          .siblings()
          .eq(0)
          .find("input")
          .typeFast(count)
      })
  }

  chooseWhen(sectionText) {
    this.elements
      .whoSection(sectionText)
      .click()
      .then(($btn) => {
        cy.get("div.chakra-spinner")
          .should("not.exist")
          .then(() => {
            cy.wrap($btn)
              .parent()
              .siblings()
              .eq(0)
              .find("tbody")
              .eq(0)
              .find("button.chakra-button")
              .then(($tds) => {
                let dateBtns = $tds.toArray()
                let activeDates = []
                dateBtns.forEach((btn) => {
                  if (!btn.hasAttribute("aria-disabled")) {
                    activeDates.push(btn)
                  }
                })
                const firstDate =
                  activeDates[Cypress.env("ORDER_DAYS_FROM_TODAY")]
                cy.wrap(firstDate).click()
              })
          })
      })
  }

  chooseTime() {
    cy.get("div.chakra-card")
      .eq(3)
      .find("div.chakra-stack")
      .last()
      .parent()
      .click()
  }

  addToCartButtonIsVisible() {
    this.elements
      .addToCartButton("Add To Cart")
      .should("exist")
      .and("be.visible")
  }

  clickAddToOrder() {
    this.elements
      .addToCartButton("Add To Cart")
      .find("div.chakra-button__spinner")
      .should("not.exist")
      .then(() => {
        this.elements.addToCartButton("Add To Cart").click()
      })
  }

  getCounterText(instance) {
    return cy
      .get("@counter")
      .children()
      .eq(0)
      .invoke("text")
      .then((txt) => {
        if (instance == 1) this.previousCountText = txt
        else this.currentCountText = txt
      })
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  checkCounterIsDisplayedAndWorks() {
    let instance = 1
    this.elements
      .pageHeader("New Order")
      .siblings()
      .last()
      .as("counter")
      .should("exist")
      .and("be.visible")
      .then(() => {
        this.getCounterText(instance)
        instance += 1
        cypress.wait(2000) // Wait 2 seconds and check text again
          .then(() => {
            this.getCounterText(instance).then(() => {
              expect(this.currentCountText).not.to.eq(this.previousCountText)
              const firstTime = this.currentCountText.split(": ")[1]
              const secondTime = this.previousCountText.split(": ")[1]
              expect(
                this.isSecondTimeGreaterThanFirst(firstTime, secondTime),
              ).to.eq(true)
            })
          })
      })
  }

  isSecondTimeGreaterThanFirst(firstTime, secondTime) {
    return secondTime > firstTime
  }

  clickCheckout(checkoutText) {
    this.elements.checkoutButton(checkoutText).click()
  }

  fillGeneralInformationForm(market = "") {
    cy.wrap([
      "firstname",
      "lastname",
      "email",
      "telephone",
      "country",
      "line_1",
      "town",
      "post_code",
    ]).each((field) => {
        if (field != "country") {
          cy.log(field, newOrderMetaData.DATA_OBJECT[field])

          this.elements.selectInputByname(field).scrollIntoView()
          this.elements.selectInputByname(field).clear({ force: true })
          this.elements
            .selectInputByname(field)
            .typeFast(newOrderMetaData.DATA_OBJECT[field], { force: true })
        } else {
          this.elements
            .selectDropDownByname(field)
            .select(
              newOrderMetaData.DATA_OBJECT[field],
              { force: true },
              { timeout: x6 },
            )
        }
      })

    cy.then(() => {
        const dob = Cypress.$(`input[name=member_dob]`)
        if (dob[0]) {
          cy.wrap(dob).typeFast("1990-11-20")
        }
      })
    cy.log(market)
  }

  fillPaymentInformationForm() {
    cy.wrap([
      "cardholder-name",
      "card-number",
      "expiry-date",
      "security-code",
    ]).each((field) => {
      this.elements.paymentIframe().scrollIntoView()
      this.elements
        .paymentIframe()
        .find(`input[name=${field}]`)
        .typeFast(newOrderMetaData.DATA_OBJECT[field], { force: true })
    })
    this.elements.payButton().click({ force: true })
    this.validateOrderCompletePage()
  }

  validateOrderCompletePage() {
    this.elements.refLabel().scrollIntoView()
    this.elements.refLabel().should("exist").and("be.visible")

    this.elements
      .refLabel()
      .siblings()
      .eq(0)
      .should("exist")
      .and("be.visible")
      .invoke("text")
      .then((txt) => {
        expect(txt.length).to.be.greaterThan(5)
        Cypress.env("orderId", txt)
      })

    this.elements
      .orderCompleteHeader()
      .should("exist")
      .and("be.visible")
      .and("have.css", "color", newOrderMetaData.orderCompleteStyles.color)
      .and(
        "have.css",
        "font-size",
        newOrderMetaData.orderCompleteStyles["font-size"],
      )

    cy.wrap([
      "orderThanks",
      "bookingConfrimed",
      "contactDetails",
      "ticketDelivery",
    ]).each((val) => {
      cy.get(newOrderMetaData.texts[val].selector)
        .contains(newOrderMetaData.texts[val].msg)
        .should("exist")
        .and("be.visible")
    })
  }
}

module.exports = new OrdersPage()
