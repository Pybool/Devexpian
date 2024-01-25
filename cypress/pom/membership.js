import fns from "../helpers"
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
      purchaseAndValidityTextEl: () =>
        cy
          .get('button[aria-label="View Booking Notes"]')
          .parent()
          .parent()
          .parent()
          .siblings()
          .eq(1)
          .children()
          .eq(0)
          .find("p")
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
    if (item == "patronage") {
      mapping = "patronageMapping"
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
      const purchaseDateItems = purchaseText.replaceAll(',','').split(" ")
      cy.wrap(purchaseDateItems).each((purchaseDateItem)=>{
        this.elements.purchaseAndValidityTextEl().eq(0).should('contain', purchaseDateItem)
      })

      const validToDateItems = validToText.replaceAll(',','').split(" ")
      cy.wrap(validToDateItems).each((validToDateItem)=>{
        this.elements.purchaseAndValidityTextEl().eq(2).should('contain', validToDateItem)
      })

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
      const purchaseDateItems = purchaseText.replaceAll(',','').split(" ")
      cy.wrap(purchaseDateItems).each((purchaseDateItem)=>{
        this.elements.purchaseAndValidityTextEl().eq(0).should('contain', purchaseDateItem)
      })

      const validToDateItems = validToText.replaceAll(',','').split(" ")
      cy.wrap(validToDateItems).each((validToDateItem)=>{
        this.elements.purchaseAndValidityTextEl().eq(2).should('contain', validToDateItem)
      })
    }
  }

  compareOrderReference() {
    this.elements
      .orderReferenceHeader()
      .should("have.text", `Order ${Cypress.env("orderId")}`)
  }

  navigateAndConfirmExpiration() {
    cy.visit(membershipMetaData.constantProperties.expiredMembership).then(
      () => {
        cy.get('p:contains("Valid until:")')
          .invoke("text")
          .then((txt) => {
            const date = txt.split("Valid until:")[1]
            expect(fns.checkPastOrFutureDate(date)).to.eq("expired")
          })
      }
    )
  }
}

module.exports = new Membership()
