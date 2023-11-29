class LoginPage {
  elements = {
    loginOutNavButton: (header) =>
      cy.get(`a.chakra-button`).contains(header).as("loginOutNav"),
    logOutNavButton: (header) =>
      cy.get(`button.chakra-button`).contains(header),
    loginHeader: (header) => cy.get("h2").contains(header),
    loginHeaderNoExist: () => cy.get("h2"),
    loginCredential: (name) => cy.get(`[name="${name}"]`),
    btnWithText: (btnText) =>
      cy.get(`button.amplify-button`).contains(btnText).as("btnWithText"),
    btnTabWithText: (btnTabText) =>
      cy.get(`button.amplify-tabs-item`).contains(btnTabText).as("btnTabText"),
    loginModal: () => cy.get('[data-variation="modal"]'),
    InputLabel: (label) =>
      this.elements.loginModal().find("label").contains(label),
    loginErrorAlert: () => cy.get("div.amplify-alert__body"),
  }

  signIn(data) {
    this.elements.loginOutNavButton("Login").click()
    this.elements.loginCredential("username").typeFast(data.email)
    this.elements.loginCredential("password").typeFast(data.password)
    this.elements.btnWithText(data.button).click()
  }
}

module.exports = new LoginPage()
