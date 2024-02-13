Cypress.Commands.add("login", (username, password) => {
  cy.session([username, password], () => {
    cy.visit("/login")
    cy.get('input[name="username"]').type(username)
    cy.get('input[name="password"]').type(password)
    cy.get('button[type="submit"]').click()
    cy.url().should("contain", "/some-url")
  })
})

Cypress.Commands.add("silentlogin", (isAdmin = false) => {
  const data = {
    email: isAdmin ? Cypress.env("USERNAME") : Cypress.env("ADMIN_USERNAME"),
    password: isAdmin ? Cypress.env("PASSWORD") : Cypress.env("ADMIN_PASSWORD"),
  }

  cy.request("POST", "some-url", data).then((response) => {
    expect(response.status).to.eq(200)
    expect(response.body.status).to.eq(true)
    cy.window().then((win) => {
      win.localStorage.setItem("token", response.body.token)
    })
  })
})

Cypress.Commands.add("getInputsInIframe", { timeout: 60000 }, (timeout) => {
  const findInputsInFrame = ($frame) => {
    return $frame.contentDocument.querySelectorAll('input')
  }

  const traverseIframes = ($parent, inputs = []) => {
    const $iframes = $parent.contentDocument.querySelectorAll('iframe')
    $iframes.forEach($frame => {
      inputs.push(...findInputsInFrame($frame))
      traverseIframes($frame, inputs)
    })
    return inputs
  }

  return cy.get('iframe',timeout).then($iframes => {
    const inputs = []
    $iframes.each((index, $iframe) => {
      inputs.push(...findInputsInFrame($iframe))
      traverseIframes($iframe, inputs)
    })
    return inputs
  })
})

// Command to check if the payment iframe is visible
Cypress.Commands.add("checkPaymentIframeVisibility", () => {
  return cy.window().then(window => {
    const $ticknovateFrame = window.parent.document.querySelector('#ticknovate-frame')
    console.log($ticknovateFrame)
    if ($ticknovateFrame) {
      const allIframes = $ticknovateFrame.contentDocument.querySelectorAll('iframe')
      allIframes.forEach(iframe => {
        if (iframe.name === 'payment-iframe') {
          cy.wrap(iframe).should('be.visible')
        }
      })
    }
  })
})







Cypress.Commands.add("deauthenticate", () => {
  cy.window().then((win) => {
    win.localStorage.removeItem("token")
  })
})

Cypress.Commands.add("waitStabilizedDom", (ms) => {
  cy.wait(ms * 1000)
})

Cypress.Commands.add(
  "typeFast",
  { prevSubject: "element" },
  (subject, text) => {
    cy.wrap(subject).type(text, {force:true, delay: 0 })
  },
)

Cypress.Commands.add("isUrlMatch", (url) => {
  cy.url().should("eq", `${Cypress.config("baseUrl")}${url}`)
})
