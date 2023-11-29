class Commonpage {
  elements = {
    anchorTxtButton: (txt) => cy.get("a.chakra-button").contains(txt),
  }

  validateNavs(role) {
    cy.waitStabilizedDom(1)
  }

  validatePageAndUrl(page, header, models) {}
}

module.exports = new Commonpage()
