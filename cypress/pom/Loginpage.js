class LoginPage {
  constructor() {
    this.elements = {
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
        cy
          .get(`button.amplify-tabs-item`)
          .contains(btnTabText)
          .as("btnTabText"),
      loginModal: () => cy.get('[data-variation="modal"]'),
      resLoginModal: () => cy.get("div.modal-body").eq(1),
      InputLabel: (label) =>
        this.elements.loginModal().find("label").contains(label),

      resInputLabel: (label) =>
        this.elements.resLoginModal().find("label").contains(label),
      loginErrorAlert: () => cy.get("div.amplify-alert__body"),
      resLoginErrorAlert: () => cy.get("#loginErrorMessage"),
      inputBtnWithVal: (btnText) => cy.get(`input[value='${btnText}']`),
      forgotPasswordLink: (linkText) => cy.get(`a`).contains(linkText),
    }
  }

  signIn(data) {
    let index = 1
    if (Cypress.env("testenv") == "booking") {
      index = 0
      this.elements.loginOutNavButton("Login").click()
    }
    this.elements.loginCredential("username").eq(index).typeFast(data.email)
    this.elements.loginCredential("password").eq(index).typeFast(data.password)
    if (Cypress.env("testenv") == "booking") {
      this.elements.btnWithText(data.button).eq(index).click()
    } else {
      this.elements.inputBtnWithVal(data.button).eq(index).click()
    }
  }

  assertLoginButton(btnElement, loginMetaData) {
    btnElement
      .should("exist")
      .and("be.visible")
      .and(
        "have.css",
        "color",
        loginMetaData.css[Cypress.env("testenv")].loginmodal.signIn.color
      )
      .and(
        "have.css",
        "background-color",
        loginMetaData.css[Cypress.env("testenv")].loginmodal.signIn
          .backgroundColor
      )
  }

  assertLinkButton(linkElement, loginMetaData, cssKey) {
    linkElement
      .should("exist")
      // .and("be.visible")
      .and(
        "have.css",
        "color",
        loginMetaData.css[Cypress.env("testenv")].loginmodal[cssKey].color
      )
      .and(
        "have.css",
        "background-color",
        loginMetaData.css[Cypress.env("testenv")].loginmodal[cssKey]
          .backgroundColor
      )
  }
}

module.exports = new LoginPage()
