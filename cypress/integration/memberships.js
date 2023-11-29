import {Then } from "cypress-cucumber-preprocessor/steps"
import Membership from "../pom/membership"
import membershipMetaData from "../metadata/memberships.meta"

const membership = Membership

Then(
  "I select a {string} plan for {string} for purchase",
  (item, membershipType) => {
    membership.chooseMemberships(item, [membershipType])
  }
)

Then(
  "I check the the {string} button {string} is {string} just {string} selecting for {string}",
  (item, style, styleVal, when, membershipType) => {
    let mapping
    if (item == "membership") {
      mapping = "membershipMapping"
    }
    if (item == "voucher") {
      mapping = "voucherMapping"
    }
    const membershipNameObject = membershipMetaData[mapping][membershipType]
    const membershipName = membershipNameObject.name
    const getCssType = (style) => {
      if (style === "color") {
        return "color"
      } else if (style.includes("background")) {
        return "background-color"
      }
    }

    const checkCss = (membershipName, cssType, expectedCss) => {
      membership.elements
        .selectMembershipButton(membershipName)
        .should("have.css", cssType, expectedCss)
    }
    const cssType = getCssType(style)

    if (when === "before") {
      checkCss(membershipName, cssType, membershipMetaData.css[style])
    } else {
      checkCss(
        membershipName,
        cssType,
        membershipMetaData.css[style + "Selected"]
      )
    }
  }
)

Then(
  "I check that the expiration date is on the same day next year as today",
  () => {
    membership.validatePurchaseAndExpiration("year", false)
  }
)

Then(
  "I check that the expiration date is on the same day next month as today",
  () => {
    membership.validatePurchaseAndExpiration("month", false)
  }
)

Then(
  "I check that the expiration date is on the month end next year of the same month",
  () => {
    membership.validatePurchaseAndExpiration("year", true)
  }
)

Then(
  "I check that the expiration date is on the month end of the next month",
  () => {
    membership.validatePurchaseAndExpiration("month", true)
  }
)

Then(
  "I check that the order reference is same as that on the order complete page",
  () => {
    membership.compareOrderReference()
  }
)
