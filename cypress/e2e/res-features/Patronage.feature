Feature: Ensure that patronages can be purchased
    As a tester i want to ensure that patronages can be purchased

    @automated @functional
    Scenario: On Reservations environment i ensure that patronages can be purchased for 1 year no month rounding
        When I navigate to the "login" page on the selected environment
        Then I login using valid "<username>" and "<password>"
        Then I click on the "New Order" button on the landing page
        Then I use "Place Order On Behalf" feature to purchase entitlement for "taye.oyelekan@expian.io"
        When I click on the "Entitlements" button on the new order page
        Then I should see subtabs "Memberships", "Patronages" and "Vouchers" displayed
        Then I click the "Patronages" subtab to buy a new "Patronage"
        Then I select a "patronage" for purchase for "1 year without rounding"
        Then The Add To Cart button should be visible
        Then I click Add To Cart button after the spinner disappears
        Then I click the "Checkout" button
        Then I fill in the customer general information
        Then I click the "View Order" link button
        Then I check that the expiration date is on the same day next year as today
        Then I check that the order reference is same as that on the order complete page

    @automated @functional
    Scenario: On Reservations environment i ensure that Patronage can be purchased for 1 year with month rounding
        When I navigate to the "login" page on the selected environment
        Then I login using valid "<username>" and "<password>"
        Then I click on the "New Order" button on the landing page
        Then I use "Place Order On Behalf" feature to purchase entitlement for "taye.oyelekan@expian.io"
        When I click on the "Entitlements" button on the new order page
        Then I should see subtabs "Memberships", "Patronages" and "Vouchers" displayed
        Then I click the "Patronages" subtab to buy a new "Patronages"
        Then I select a "patronage" for purchase for "1 year with rounding"
        Then The Add To Cart button should be visible
        Then I click Add To Cart button after the spinner disappears
        Then I click the "Checkout" button
        Then I fill in the customer general information
        Then I click the "View Order" link button
        Then I check that the expiration date is on the month end next year of the same month
        Then I check that the order reference is same as that on the order complete page

    @automated @functional
    Scenario: On Reservations environment i ensure that patronage can be purchased for 1 month no month rounding
        When I navigate to the "login" page on the selected environment
        Then I login using valid "<username>" and "<password>"
        Then I click on the "New Order" button on the landing page
        Then I use "Place Order On Behalf" feature to purchase entitlement for "taye.oyelekan@expian.io"
        When I click on the "Entitlements" button on the new order page
        Then I should see subtabs "Memberships", "Patronages" and "Vouchers" displayed
        Then I click the "Patronages" subtab to buy a new "Patronage"
        Then I select a "patronage" for purchase for "1 month without rounding"
        Then The Add To Cart button should be visible
        Then I click Add To Cart button after the spinner disappears
        Then I click the "Checkout" button
        Then I fill in the customer general information
        Then I click the "View Order" link button
        Then I check that the expiration date is on the same day next month as today
        Then I check that the order reference is same as that on the order complete page

    @automated @functional
    Scenario: On Reservations environment i ensure that patronages can be purchased for 1 month with month rounding
        When I navigate to the "login" page on the selected environment
        Then I login using valid "<username>" and "<password>"
        Then I click on the "New Order" button on the landing page
        Then I use "Place Order On Behalf" feature to purchase entitlement for "taye.oyelekan@expian.io"
        When I click on the "Entitlements" button on the new order page
        Then I should see subtabs "Memberships", "Patronages" and "Vouchers" displayed
        Then I click the "Patronages" subtab to buy a new "Patronage"
        Then I select a "patronage" for purchase for "1 month with rounding"
        Then The Add To Cart button should be visible
        Then I click Add To Cart button after the spinner disappears
        Then I click the "Checkout" button
        Then I fill in the customer general information
        Then I click the "View Order" link button
        Then I check that the expiration date is on the month end of the next month
        Then I check that the order reference is same as that on the order complete page


