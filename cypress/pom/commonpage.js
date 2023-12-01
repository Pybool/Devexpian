class Commonpage {
  constructor() {
    this.elements = {
      anchorTxtButton: (txt) => cy.get("a.chakra-button").contains(txt),
    }
  }


  validateNavs(_role) {
    cy.log(_role)
    cy.waitStabilizedDom(1)
  }

  validatePageAndUrl(_page, _header, _models) {
    cy.log(_page, _header, _models)
  }
}

module.exports = new Commonpage()
