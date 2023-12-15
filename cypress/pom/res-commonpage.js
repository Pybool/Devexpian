import membershipMetaData from "../metadata/memberships.meta"
import OrdersPage from "./Neworder"
const ordersPage = OrdersPage

class ResCommonPage {
  constructor() {
    this.ordersPage = ordersPage
    this.elements = {
      landingPageColoredBtns: (txt) =>
        cy.get("p.chakra-text").contains(txt).parent(),
      newOrderPageTab: (tabText) =>
        cy.get("button.chakra-button").contains(tabText),
      newOrderPageSubTabs: () =>
        cy.get("div.chakra-card").eq(1).children().eq(1),
      entitlementOptionsAvailable: (entitlementName) =>
        cy.get("p.chakra-text").contains(entitlementName).parent().parent(),
      placeOrderOnBehalfSwitch: () => cy.get("input.chakra-switch__input"),
      selectCustomerButton:() => cy.get('p.chakra-text').contains('Select Customer').parent(),
      customerSearchInput:() => cy.get('input[placeholder="Type to search"]')
    }
  }

  selectEntitlementByDurationType(entitlementType, durationType) {
    let mapping
    if (entitlementType == "membership") {
      mapping = "membershipMapping"
    }
    if (entitlementType == "voucher") {
      mapping = "voucherMapping"
    }
    if (entitlementType == "patronage") {
      mapping = "patronageMapping"
    }
    const membershipNameObject = membershipMetaData[mapping][durationType]
    const membershipName = membershipNameObject.name
    console.log("Membership name ", membershipName)
    this.elements.entitlementOptionsAvailable(membershipName).click()
  }

  placeOrderOnbehalfOf(customer) {
    this.elements.placeOrderOnBehalfSwitch().check({force:true})
    this.elements.selectCustomerButton().click()
    this.elements.customerSearchInput().typeFast(customer)
    cy.get('span').contains(customer,{timeout:60000}).parent().click()
  }
}

module.exports = new ResCommonPage()
