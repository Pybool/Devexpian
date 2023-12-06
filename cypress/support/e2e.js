import "./commands"
import "cypress-iframe"
const testenv = Cypress.env('testenv') || ''
console.log(Cypress.env(testenv.toUpperCase()))
Cypress.config('baseUrl', Cypress.env(testenv.toUpperCase()));


Cypress.on("uncaught:exception", (e, runnable) => {
  console.log(e, runnable)
  return false
})
