Feature: Ensure that memberships can be purchased
    As a tester i want to ensure that memberships can be purchased

    @automated @functional
    Scenario: On Reservations environment i ensure that memberships can be purchased for 1 year no month rounding
        When I navigate to the "login" page on the selected environment
        Then I login using valid "<username>" and "<password>"
        Then I click on the "New Order" button on the landing page
        Then I use "Place Order On Behalf" feature to purchase entitlement for "taye.oyelekan@expian.io"
        When I click on the "Entitlements" button on the new order page
        Then I should see subtabs "Memberships", "Patronages" and "Vouchers" displayed
        Then I click the "Memberships" subtab to buy a new "Membership"
        Then I select a "membership" for purchase for "1 year without rounding"
        Then The Add To Cart button should be visible
        Then I click Add To Cart button after the spinner disappears
        Then I click the "Checkout" button
        Then I fill in the customer general information
        Then I click the "View Order" link button
        Then I check that the expiration date is on the same day next year as today
        Then I check that the order reference is same as that on the order complete page

    @automated @functional
    Scenario: On Reservations environment i ensure that memberships can be purchased for 1 year with month rounding
        When I navigate to the "login" page on the selected environment
        Then I login using valid "<username>" and "<password>"
        Then I click on the "New Order" button on the landing page
        Then I use "Place Order On Behalf" feature to purchase entitlement for "taye.oyelekan@expian.io"
        When I click on the "Entitlements" button on the new order page
        Then I should see subtabs "Memberships", "Patronages" and "Vouchers" displayed
        Then I click the "Memberships" subtab to buy a new "Membership"
        Then I select a "membership" for purchase for "1 year with rounding"
        Then The Add To Cart button should be visible
        Then I click Add To Cart button after the spinner disappears
        Then I click the "Checkout" button
        Then I fill in the customer general information
        Then I click the "View Order" link button
        Then I check that the expiration date is on the month end next year of the same month
        Then I check that the order reference is same as that on the order complete page

    @automated @functional
    Scenario: On Reservations environment i ensure that memberships can be purchased for 1 month no month rounding
        When I navigate to the "login" page on the selected environment
        Then I login using valid "<username>" and "<password>"
        Then I click on the "New Order" button on the landing page
        Then I use "Place Order On Behalf" feature to purchase entitlement for "taye.oyelekan@expian.io"
        When I click on the "Entitlements" button on the new order page
        Then I should see subtabs "Memberships", "Patronages" and "Vouchers" displayed
        Then I click the "Memberships" subtab to buy a new "Membership"
        Then I select a "membership" for purchase for "1 month without rounding"
        Then The Add To Cart button should be visible
        Then I click Add To Cart button after the spinner disappears
        Then I click the "Checkout" button
        Then I fill in the customer general information
        Then I click the "View Order" link button
        Then I check that the expiration date is on the same day next month as today
        Then I check that the order reference is same as that on the order complete page

    @automated @functional
    Scenario: On Reservations environment i ensure that memberships can be purchased for 1 month with month rounding
        When I navigate to the "login" page on the selected environment
        Then I login using valid "<username>" and "<password>"
        Then I click on the "New Order" button on the landing page
        Then I use "Place Order On Behalf" feature to purchase entitlement for "taye.oyelekan@expian.io"
        When I click on the "Entitlements" button on the new order page
        Then I should see subtabs "Memberships", "Patronages" and "Vouchers" displayed
        Then I click the "Memberships" subtab to buy a new "Membership"
        Then I select a "membership" for purchase for "1 month with rounding"
        Then The Add To Cart button should be visible
        Then I click Add To Cart button after the spinner disappears
        Then I click the "Checkout" button
        Then I fill in the customer general information
        Then I click the "View Order" link button
        Then I check that the expiration date is on the month end of the next month
        Then I check that the order reference is same as that on the order complete page




    # @automated
    # Scenario: On Reservations environment i ensure that memberships shows expired once validity has passed
    #     Given I am logged into Reservations Portal
    #     Then The account page should show the user email and have header "Welcome back"
    #     When I click the "Memberships" navigation link
    #     Then Clicking View information For an expired order 
    #     Then I should see 'Expired' once validity period has passed
    
    # # @automating
    # # Scenario: On Reservations environment i ensure that i can cancel a memberhip entitlement
    # #     Given I am logged into Reservations Portal
    # #     Then The account page should show the user email and have header "Welcome back"
    # #     When I click the "Memberships" tab link
    # #     Then I select the last created "Membership" to cancel it
    # #     Then I click the More Actions button
    # #     And I click the "Cancel Order" option in the dropdown
    # #     Then I validate the i am on the Amend Booking page with the correct OrderID
    # #     Then I click the refund button

    # @automated
    # Scenario: Membership should not have lead member
    #     Given I am logged into Reservations Portal
    #     Then The account page should show the user email and have header "Welcome back"
    #     When I click the "Memberships" tab link
    #     Then I select the last created "Membership" to cancel it
    #     Then Lead Member section should not be present
