import membershipMetaData from "../metadata/memberships.meta"

class Membership {
  constructor() {
    this.elements = {
      selectMembershipButton: (text) =>
        cy
          .get(`p.chakra-text`)
          .contains(text)
          .parent()
          .parent()
          .find("button")
          .eq(0)
          .as("membershipButton"),
      checkOutButton: () => cy.get(`button.chakra-button`).contains("Checkout"),
      orderReferenceHeader: () => cy.get("h2").eq(2),
    }
    }

  chooseMemberships(item, membershipTypes) {
    let mapping
    if (item == "membership") {
      mapping = "membershipMapping"
    }
    if (item == "voucher") {
      mapping = "voucherMapping"
    }
    cy.wrap(membershipTypes).each((membershipType) => {
      const membershipNameObject = membershipMetaData[mapping][membershipType]
      const membershipName = membershipNameObject.name
      this.elements.selectMembershipButton(membershipName).click()
    })
  }

  validatePurchaseAndExpiration(type = "year", isRound = false) {
    if (type == "year") {
      let formattedNextYear
      const today = new Date()
      const options = { month: "short", day: "numeric", year: "numeric" }
      const formattedDate = today.toLocaleString("en-US", options)
      const nextYear = new Date(today)
      nextYear.setFullYear(today.getFullYear() + 1)
      if (!isRound) {
        formattedNextYear = nextYear.toLocaleString("en-US", options)
      } else {
        nextYear.setMonth(nextYear.getMonth() + 1)
        nextYear.setDate(0)
        formattedNextYear = nextYear.toLocaleString("en-US", options)
      }

      const purchaseText = `Purchased on: ${formattedDate}`
      const validToText = `Valid until: ${formattedNextYear}`
      console.log("Year ", purchaseText, validToText)
      cy.get("p.chakra-text")
        .contains(purchaseText)
        .should("exist")
        .and("be.visible")

      cy.get("p.chakra-text")
        .contains(validToText)
        .should("exist")
        .and("be.visible")
    } else {
      let formattedNextMonthEnd
      const today = new Date()
      const options = { month: "short", day: "numeric", year: "numeric" }
      const formattedDate = today.toLocaleString("en-US", options)
      const nextMonth = new Date(today)

      nextMonth.setMonth(nextMonth.getMonth() + 1)

      if (isRound) {
        nextMonth.setMonth(nextMonth.getMonth() + 1)
        nextMonth.setDate(0)
      }

      formattedNextMonthEnd = nextMonth.toLocaleString("en-US", options)

      const purchaseText = `Purchased on: ${formattedDate}`
      const validToText = `Valid until: ${formattedNextMonthEnd}`

      console.log(purchaseText, validToText)
      cy.get("p.chakra-text")
        .contains(purchaseText)
        .should("exist")
        .and("be.visible")

      cy.get("p.chakra-text")
        .contains(validToText)
        .should("exist")
        .and("be.visible")
    }
  }

  compareOrderReference() {
    this.elements
      .orderReferenceHeader()
      .should("have.text", `Order ${Cypress.env("orderId")}`)
  }
}

module.exports = new Membership()
