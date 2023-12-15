import { Then } from "cypress-cucumber-preprocessor/steps"
import ResCommonPage from "../pom/res-commonpage"
const common = ResCommonPage

Then("I click on the {string} button on the landing page", (btnText) => {
  common.elements
    .landingPageColoredBtns(btnText)
    .should("be.visible")
    .then(() => {
      common.elements.landingPageColoredBtns(btnText).click()
    })
})

Then(
  "I use {string} feature to purchase entitlement for {string}",
  (onBehalfText, customer) => {
    cy.log(onBehalfText)
    common.placeOrderOnbehalfOf(customer)
  }
)

Then("I click on the {string} button on the new order page", (tabText) => {
  common.elements
    .newOrderPageTab(tabText)
    .should("be.visible")
    .then(() => {
      common.elements.newOrderPageTab(tabText).click()
    })
})

Then(
  "I should see subtabs {string}, {string} and {string} displayed",
  (subTabText1, subTabText2, subTabText3) => {
    common.elements
      .newOrderPageSubTabs()
      .children()
      .should("have.length", 3)
      .then(() => {
        cy.wrap([subTabText1, subTabText2, subTabText3]).each((subTab) => {
          common.elements.newOrderPageSubTabs().find("button").contains(subTab)
        })
      })
  }
)

Then("I click the {string} subtab to buy a new {string}", (subTabText) => {
  common.elements
    .newOrderPageSubTabs()
    .find("button")
    .contains(subTabText)
    .click()
})

Then(
  "I select a {string} for purchase for {string}",
  (entitlementType, durationType) => {
    common.selectEntitlementByDurationType(entitlementType, durationType)
  }
)

Then("The Add To Cart button should be visible", () => {
  common.ordersPage.addToCartButtonIsVisible()
})

Then("I click Add To Cart button after the spinner disappears", () => {
  common.ordersPage.clickAddToOrder()
})
