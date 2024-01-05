const x6 = 60000
const emptyHeader = ''

class ResLandingPage {
  constructor() {
    this.elements = {
      greetingTextEl: (greetingText) =>
        cy.get("p.chakra-text").contains(greetingText).as("greeting"),

      headerTextEl: (headerText) =>
        cy.get("h2.chakra-heading").contains(headerText).as("headerText"),

      newOrderButton: () =>
        cy.get("@headerText").siblings().eq(0).contains("New Order").eq(0),

      searchBar: (placeholderText) =>
        cy.get(`input[placeholder*='${placeholderText}']`).as("searchbar"),

      tableRows: () => cy.get("table > thead> tr"),
    }
  }

  validateGreeting(greetingText) {
    // this.elements.greetingTextEl(greetingTextEl).should("be.visible")
    // cy.get("@greeting")
    //   .invoke("text")
    //   .then((txt) => {
    //     expect(txt).to.eq(greetingText)
    //   })
  }

  validateHeaderText(headerText) {
    this.elements.headerTextEl(headerText).should("be.visible")
    cy.get("@headerText")
      .invoke("text")
      .then((txt) => {
        expect(txt).to.eq(headerText)
      })
  }

  validateNewOrderButton() {
    this.elements
      .newOrderButton()
      .should("exist")
      .and("be.visible")
      .should("have.attr", "href", "/booking")
  }

  validateOtherButtons(buttons) {
    cy.wrap(buttons).each((button) => {
      cy.get("a.chakra-button")
        .find("p")
        .contains(button)
        .as(`${button}`)
        .should("exist")
        .and("be.visible")
    })
  }

  validateDateFilter(placeholderText,values) {
    this.elements
      .searchBar(placeholderText)
      .parent()
      .siblings()
      .eq(0)
      .as("filter")
      .should("exist")
      .and("be.visible")

    cy.get("@filter")
      .children()
      .eq(1)
      .find("select.chakra-select")
      .as("select")
      .should("exist")
      .and("be.visible")

    for (const option of values) {
      cy.get("@select").should("contain", option)
    }
  }

  validateTableHeaders(numHeaders,headers){
    this.elements.tableRows()
      .find("th", { timeout: x6 })
      .then((ths) => {
        expect(Cypress.$(ths).length).to.eq(parseInt(numHeaders))
      })

    for (const header of headers) {
      if (header != "") {
        this.elements.tableRows()
          .find("th")
          .contains(header)
          .should("exist")
          .and("be.visible")
      } else {
        cy.get("table > thead> tr")
          .find("th")
          .last()
          .invoke("text")
          .then((lastThText) => {
            expect(lastThText).to.eq(emptyHeader)
          })
      }
    }
  }
}

module.exports = new ResLandingPage()
