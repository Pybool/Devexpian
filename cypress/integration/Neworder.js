import { Then } from "cypress-cucumber-preprocessor/steps"
import OrdersPage from "../pom/Neworder"

const ordersPage = OrdersPage

// function completeOrderExternal(url,cartToken){
//   cy.request({
//     method: 'POST',
//     url: url,
//     body: {
//       key1: 'value1',
//       key2: 'value2'
//     },
//     headers: {
//       'Content-Type': 'application/json',
//       'cart-token': cartToken,
//       'Accept':'*/*'
//     }
//   }).then((response) => {
//     expect(response.status).to.equal(200);
//     const urlSegments = url.split('/');
//     const extractedValue = urlSegments[urlSegments.length - 2];
//     rs2.saveToSessionStorage('order_id',extractedValue)
//   });
// }

// function executeFnInWindow(){
//   cy.window().then((win) => {
//       win.console.defaultLog = win.console.log.bind(console);
//       win.console.logs = [];
//       win.console.log = function(){
//           win.console.defaultLog.apply(console, arguments);
//           win.console.logs.push(Array.from(arguments));
//       };

//       win.TICKNOVATE_HOST = {
//         externalPayment: true,
//         sendMessage: (message) => { console.log(message); },
//         deviceId: 'YOUR_DEVICE_ID'
//       };
//   });
// }

// executeFnInWindow()
//   cy.get('div.chakra-collapse').parent().find('button').contains('Checkout',{timeout:x6}).should('exist').click({force:true})
//   cy.window().then((win) => {
//       try{
//         const resp = win.console.logs[win.console.logs.length-1][1]
//         const url = resp?.completionUrl
//         const cartToken = resp.cart.token
//         win.localStorage.setItem('url', url )
//         win.localStorage.setItem('cartToken',cartToken)
//         completeOrderExternal(url,cartToken)
//       }
//       catch(err){}
//   })

Then(
  "I click on {string} in the navigation bar after reaching landing page",
  (navItem) => {
    ordersPage.elements.navbarItem("My Orders").should("be.visible")
    ordersPage.elements.navbarItem(navItem).click()
  },
)

Then("I should see a header with text {string}", (headerText) => {
  ordersPage.elements.pageHeader(headerText).should("exist").and("be.visible")
})

Then(
  "I click the {string} button to create an {string} type order",
  (orderType) => {
    ordersPage.elements
      .orderTypeBtn(orderType)
      .as(`${orderType}-order`)
      .should("exist")
      .and("be.visible")

    cy.get(`@${orderType}-order`).click()
  },
)

Then("For the {string} option i select an option", (section) => {
  ordersPage.chooseWhat(section)
})

Then(
  "For the {string} option i select {string} {string}",
  (section, count, type) => {
    ordersPage.chooseWho(section, type, parseInt(count))
  },
)

Then("For the {string} option i select a date", (section) => {
  ordersPage.chooseWhen(section)
})

Then("I select a time for the order", () => {
  ordersPage.chooseTime()
})

Then("The Add To Cart Button should be visible", () => {
  ordersPage.addToCartButtonIsVisible()
})

Then("I click the Add To Cart Button after the spinner disappears", () => {
  ordersPage.clickAddToOrder()
})

Then(
  "I check that there is a counter displayed at the top off the page and the count down works",
  () => {
    ordersPage.checkCounterIsDisplayedAndWorks()
  },
)

Then("I click the {string} button", (checkOutText) => {
  ordersPage.clickCheckout(checkOutText)
})

Then("I fill in the customer general information", () => {
  ordersPage.fillGeneralInformationForm()
  if(Cypress.env('testenv')==='booking'){
    ordersPage.elements
    .optionsCheckoutCheckboxes()
    .check({ multiple: true, force: true })
  }
  ordersPage.elements.continueToPayment().click({ force: true })
  ordersPage.elements.sagePayOption().click()
  ordersPage.fillPaymentInformationForm()
})
