import accountsMetaData from "../metadata/accounts.meta"

class AccountsPage {
  constructor() {
    this.elements = {
      navbarItem: (navText) => cy.get(`button.chakra-button`).contains(navText),
      logoutBtn: (navText) => cy.get(`button.chakra-button`).contains(navText),
      tabs: (index) =>
        cy
          .get("div.chakra-card")
          .children()
          .eq(index - 1),
    }
  }

  checkNavLinks() {
    cy.wrap(accountsMetaData.navbarList).each((navItem) => {
      if (navItem != "Logout")
        this.elements
          .navbarItem(navItem)
          .as(`${navItem}`)
          .should("exist")
          .and("be.visible")
      else
        this.elements
          .logoutBtn(navItem)
          .as(`${navItem}`)
          .should("exist")
          .and("be.visible")
      cy.get(`@${navItem}`).find("svg").should("exist").and("be.visible")
    })
  }

  checkTabs(data) {
    this.elements
      .tabs(parseInt(data.tabIndex))
      .click()
      .then(($tab) => {
        cy.wrap($tab).should(
          "contain.text",
          accountsMetaData.css[`tab${data.tabIndex}`].text,
        )
        cy.get("div.chakra-card")
          .eq(0)
          .siblings()
          .eq(1)
          .find("p.chakra-text")
          .eq(0)
          .as(`tab${data.tabIndex}`)
          .should("contain.text", data.qString)
          .and("be.visible")

        cy.get(`@tab${data.tabIndex}`)
          .find("span.chakra-badge")
          .invoke("text")
          .then((txt) => {
            if (txt == "0") {
              cy.get("div.chakra-card")
                .eq(1)
                .find("p")
                .contains(data.emptyTxt)
                .should("exist")
                .and("be.visible")
            }
          })
      })
  }
}

module.exports = new AccountsPage()
