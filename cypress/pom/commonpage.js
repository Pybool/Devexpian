import membershipMetaData from "../metadata/memberships.meta"

class Commonpage {
  constructor() {
    this.elements = {
      anchorTxtButton: (txt) => cy.get("a.chakra-button").contains(txt),
      orderDetailsOrderIdHeader: () => cy.get("h2").eq(2),
      spanTextButton: (text) => cy.get("button>span").contains(text).parent(),
      getButtonByText: (text) => cy.get("button").contains(text),
      leadMemberSectionHeader: () => cy.get("h3").contains('Lead Member Details:'),
      overidePriceButton:(btnText) => cy.get("button").contains(btnText),
      completeRefundButton: () =>
        cy.get("button>div>p").contains("Complete refund").parent().parent(),
    }
  }

  validateNavs(_role) {
    cy.log(_role)
    cy.waitStabilizedDom(1)
  }

  validatePageAndUrl(_page, _header, _models) {
    cy.log(_page, _header, _models)
  }

  storeOrderIdFromOrderDetailsPage() {
    this.elements
      .orderDetailsOrderIdHeader()
      .invoke("text")
      .then((txt) => {
        const orderId = txt.split("Order")[1]?.trim()
        Cypress.env("selectedOrderId", orderId)
      })
  }

  validateAmendBookingPageByOrderID() {
    cy.get("h2")
      .contains(`Amending Booking: ${Cypress.env("selectedOrderId")}`)
      .should("exist")
      .and("be.visible")
  }

  validateAmendBookingPageByCancelText() {
    cy.get("h5")
      .contains(`The order will be cancelled`)
      .should("exist")
      .and("be.visible")
      .and(
        "have.css",
        "color",
        membershipMetaData.css.amendingPageCancelTextColor
      )
  }
}

module.exports = new Commonpage()
