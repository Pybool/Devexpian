import "./commands"
import "cypress-iframe"

Cypress.on("uncaught:exception", (e, runnable) => {
  console.log(e,runnable)
  return false
})
