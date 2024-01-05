import {Given, Then, When, And } from "cypress-cucumber-preprocessor/steps"
import ResLandingPage from "../pom/res-landing"
const landingPage = ResLandingPage
var placeholderText
const x6 = 60000
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

When("I am on the reservations page", () => {
  cy.visit("/")
})

Then("I should be on the base url", () => {
  cy.url().then((url) => {
    const expectedUrl = Cypress.config("baseUrl")
    expect(url).to.equal(expectedUrl)
  })
})

Then("I should see a greeting {string}", (greetingText) => {
  landingPage.validateGreeting(greetingText)
})

Then("I should see that the page header is {string}", (headerText) => {
  landingPage.validateHeaderText(headerText)
})

Then(
  "I should see the New Order button having an Icon on the top right of the page",
  () => {
    landingPage.validateNewOrderButton()
  }
)

Then(
  "Below the New Order button i should see three buttons {string} and {string} and {string} on the page",
  (button1, button2, button3) => {
    landingPage.validateOtherButtons([button1, button2, button3])
  }
)

Then(
  "Below the three buttons I should see a search bar with placeholder text {string} in grey color",
  (_placeholderText) => {
    placeholderText = _placeholderText
    landingPage.elements
      .searchBar(placeholderText)
      .should("exist")
      .and("be.visible")
  }
)

And(
  "Beside the search bar I should see a Date Filter Having Values {string} and {string} and {string} and {string} in dropdown",
  (value1, value2, value3, value4) => {
    landingPage.validateDateFilter(placeholderText, [
      value1,
      value2,
      value3,
      value4,
    ])
  }
)

Then(
  "Below The search bar I should see a table having {string} headers with texts {string}, {string}, {string}, {string}, {string} as headers",
  (numHeaders, header1, header2, header3, header4, header5) => {
    landingPage.validateTableHeaders(numHeaders, [
      header1,
      header2,
      header3,
      header4,
      header5,
    ])
  }
)

And(
  "If there are no records in the table i should see {string} in table",
  (noResultsText) => {
    cy.get("table tbody")
      .its("length")
      .then((length) => {
        if (length === 0) {
          cy.get("table").as("orderTable")
          cy.get("@orderTable")
            .parent()
            .find("p")
            .as("noResultText")
            .contains(noResultsText)
            .should("exist")
            .and("be.visible")
        }
      })
  }
)

And(
  "If there are records i should not see {string} in table",
  (noResultsText) => {
    cy.get("table tbody")
      .find("tr")
      .its("length")
      .then((length) => {
        if (length === 1) {
          cy.get("table").as("orderTable")
          cy.get("@orderTable")
            .parent()
            .parent()
            .get("p")
            .contains(noResultsText)
            .should("exist")
            .and("be.visible")
        }
        if (length > 1) {
          cy.get("table")
            .parent()
            .parent()
            .siblings()
            .last()
            .then(($el) => {
              const tagName = $el.prop("tagName")
              expect(tagName).to.not.equal("P")
            })
        }
      })
  }
)

When("I click on the a row in the table for an order ID", () => {
  cy.task("getData", { key: "lastOrderID" }).then((data) => {
    cy.log(data)
    cy.get("table.chakra-table", { timeout: 30000 })
      .as("o_table")
      .then(async ($table) => {
        const hasRows = $table.find("tr").length > 1
        if (hasRows) {
          cy.get('tr').eq(1).find('td').eq(0).click()
        } else {
          cy.log("No orders in table")
        }
      })
  })
})

Then("I should see the Order Preview widget", () => {
  cy.get("h1.chakra-heading")
    .contains("Order Preview", { timeout: x6 })
    .should("exist")
    .and("be.visible")
    .parent()
    .parent()
    .should("have.class", "chakra-stack")
    .should("have.class", "chakra-card")
    .and("be.visible")
    .as("orderPreviewWidget")
})

And(
  "The Order Preview widget should contain {string} {string} {string} and {string} section",
  (section1, section2, section3, section4) => {
    cy.wrap([section1, section2, section3, section4]).each((section) => {
      cy.get("h2.chakra-heading")
        // .contains(section, { timeout: x6 })
        // .scrollIntoView()
        .should("exist")
        .and("be.visible")
        .parent()
        .should("exist")
        .and("be.visible")
    })
  }
)

And(
  "The Order Preview widget should have a {string} button with background colors {string}",
  (btnTxt1, bgColor) => {
    [btnTxt1].forEach((btnTxt) => {
      if (btnTxt == "View Order Details") {
        cy.get("@orderPreviewWidget").find("a.chakra-button").as("btn")
      } else {
        cy.get("@orderPreviewWidget").find("button.chakra-button").as("btn")
      }
      cy.get("@btn")
        .contains(btnTxt, { timeout: x6 })
        .should("exist")
        .and("be.visible")
        .should("have.css", "background-color", bgColor)
    })
  }
)

And(
  "The Order Preview widget {string} should contains a Name Label and the name in the Table matches the name on the Label value",
(section) => {
    cy.get("h2.chakra-heading")
      .contains(section, { timeout: x6 })
      .parent()
      .as("section")
      .scrollIntoView()
    cy.get("@section")
      .find("p.chakra-text")
      .contains("Name")
      .should("exist")
      .and("be.visible")
      .siblings()
      .eq(0)
      .as("customerNameEl")
  }
)

And(
  "The Order Preview widget {string} should contains a Email Label and the Email should be a valid Email Address",
  (section) => {

    cy.get("h2.chakra-heading")
      .contains(section, { timeout: x6 })
      .parent()
      .as("section")
      .scrollIntoView()
    cy.get("@section")
      .find("p.chakra-text")
      .contains("Email")
      .should("exist")
      .and("be.visible")
      .siblings()
      .eq(0)
      .as("customerEmailEl")
      .invoke("text")
      .then((email) => {
        expect(emailPattern.test(email)).to.eq(true)
      })
  }
)

When(
  "The {string} section in Booking Redemption shows {string} The {string} button does show and Vice Versa",
  (section, status, btnTxt) => {
    const eitherOr = (status) => {
      return status == "Tickets Redeemed" || status == "Tickets not redeemed"
    }
    cy.get("h2.chakra-heading")
      .contains(section, { timeout: x6 })
      .parent()
      .as("section")
      .scrollIntoView()
    cy.get("@section")
      .find("p.chakra-text")
      .contains("Booking Redemption")
      .should("exist")
      .and("be.visible")
      .siblings()
      .eq(0)
      .as("customerStatusEl")
      .invoke("text")
      .then((statusTxt) => {
        expect(true).to.eq(eitherOr(statusTxt))
        if (statusTxt == "Tickets Redeemed") {
          cy.get("@orderPreviewWidget").find("button.chakra-button").as("btn")
          cy.get("@btn").contains(btnTxt, { timeout: x6 }).should("not.exist")
        } else {
          cy.get("@orderPreviewWidget").find("button.chakra-button").as("btn")
          cy.get("@btn")
            .contains(btnTxt, { timeout: x6 })
            .should("exist")
            .and("be.visible")
        }
      })
  }
)

Given("I have orders created {string}", (periodTxt) => {
  const period =
    periodTxt === "Today"
      ? 0
      : periodTxt === "Yesterday"
        ? 1
        : periodTxt === "Last 7 days"
          ? 7
          : 0
  const dateToCheck = getDateNDaysAgo(period)
  Cypress.env("dateToCheck", dateToCheck)
  cy.get("tr > td:nth-child(3)").then((tds) => {
    let presentDates = []
    Array.from(tds).forEach((td) => {
      if (Cypress.$(td)[0].innerText.includes(String(dateToCheck))) {
        presentDates.push(Cypress.$(td)[0].innerText)
      }
    })
    if (presentDates.length > 0) {
      expect(presentDates).to.have.length.gte(1)
    }
  })
})

When("I select {string} in the filter", (periodTxt) => {
  const periodIndex =
    periodTxt === "Today"
      ? 1
      : periodTxt === "Yesterday"
        ? 2
        : periodTxt === "Last 7 days"
          ? 3
          : 0
  cy.get("select.chakra-select").select(3)
  cy.get("select.chakra-select").select(periodIndex)
})

Then("I should see a spinner loading", () => {
  cy.get("div.chakra-spinner").as("spinner")
    .scrollIntoView()
  cy.get("@spinner").should("exist")
    .and("be.visible")
})

When("The spinner disappears", () => {
  cy.get("div.chakra-spinner").should("not.exist", { timeout: 40000 })
})

Then("The entries in the table should all have {string} date", () => {
  const rows = Cypress.$("tr > td")
  if (rows.length > 0) {
    cy.get("tr > td:nth-child(3)").then((tds) => {
      Array.from(tds).forEach((td) => {
        const stat = Cypress.$(td)[0].innerText.includes(
          String(Cypress.env("dateToCheck"))
        )
        expect(stat).to.eq(true)
      })
    })
  } else {
    cy.log("No results found, skipping")
  }
})

Then(
  "The entries in the table should all have dates within the {string}",
  () => {
    const rows = Cypress.$("tr > td")
    if (rows.length > 0) {
      const n = 7
      cy.get("tr > td:nth-child(3)").then((tds) => {
        Array.from(tds).forEach((td) => {
          const dateToCheck = Cypress.$(td)[0].innerText
          expect(isDateWithinLastNDays(dateToCheck, n)).to.eq(true)
        })
      })
    } else {
      cy.log("No results found, skipping")
    }
  }
)

function isDateWithinLastNDays(dateString, n) {
  const months = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  }

  const dateParts = dateString.match(
    /(\w{3}) (\d{1,2}), (\d{4}), (\d{1,2}):(\d{2}) (AM|PM)/
  )

  if (!dateParts) {
    return false
  }

  const month = months[dateParts[1]]
  const day = parseInt(dateParts[2], 10)
  const year = parseInt(dateParts[3], 10)
  let hours = parseInt(dateParts[4], 10)
  const minutes = parseInt(dateParts[5], 10)
  const isPM = dateParts[6] === "PM"

  if (isPM && hours !== 12) {
    hours += 12
  }

  const inputDate = new Date(year, month, day, hours, minutes)
  const today = new Date()
  const lastNDays = new Date()
  lastNDays.setDate(today.getDate() - n)

  return inputDate >= lastNDays && inputDate <= today
}

function formatDate(date) {
  const options = { year: "numeric", month: "short", day: "numeric" }
  return date.toLocaleDateString("en-US", options)
}

function getDateNDaysAgo(ndays) {
  const currentDate = new Date()
  currentDate.setDate(currentDate.getDate() - ndays)
  return formatDate(currentDate)
}

// after(() => {
//   rs2.cancelLastOrder()
// })
