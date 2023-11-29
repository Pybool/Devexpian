Feature: Ensure that memberships can be purchased
    As a tester i want to ensure that memberships can be purchased

    @automated @functional
    Scenario: On selected environment i ensure that memberships can be purchased for 1 year no month rounding
        Given I am logged into Account area
        When I click the "Memberships" navigation link
        Then I check the the "membership" button "color" is "rgb(15, 28, 42)" just "before" selecting for "1 year without rounding"
        Then I check the the "membership" button "backgroundColor" is "rgb(125, 227, 203)" just "before" selecting for "1 year without rounding"
        Then I select a "membership" plan for "1 year without rounding" for purchase
        Then I check the the "membership" button "color" is "rgb(225, 226, 228)" just "after" selecting for "1 year without rounding"
        Then I check the the "membership" button "backgroundColor" is "rgb(29, 53, 62)" just "after" selecting for "1 year without rounding"
        Then I click the "Checkout" button
        Then I fill in the customer general information
        Then I click the "View Order" link button
        Then I check that the expiration date is on the same day next year as today
        Then I check that the order reference is same as that on the order complete page
        

    @automated @functional
    Scenario: On selected environment i ensure that memberships can be purchased for 1 year with month rounding
        Given I am logged into Account area
        When I click the "Memberships" navigation link
        Then I check the the "membership" button "color" is "rgb(15, 28, 42)" just "before" selecting for "1 year with rounding"
        Then I check the the "membership" button "backgroundColor" is "rgb(125, 227, 203)" just "before" selecting for "1 year with rounding"
        Then I select a "membership" plan for "1 year with rounding" for purchase
        Then I check the the "membership" button "color" is "rgb(225, 226, 228)" just "after" selecting for "1 year with rounding"
        Then I check the the "membership" button "backgroundColor" is "rgb(29, 53, 62)" just "after" selecting for "1 year with rounding"
        Then I click the "Checkout" button
        Then I fill in the customer general information
        Then I click the "View Order" link button
        Then I check that the expiration date is on the month end next year of the same month
        Then I check that the order reference is same as that on the order complete page
    

    @automated @functional
    Scenario: On selected environment i ensure that memberships can be purchased for 1 month no month rounding
        Given I am logged into Account area
        When I click the "Memberships" navigation link
        Then I check the the "membership" button "color" is "rgb(15, 28, 42)" just "before" selecting for "1 month without rounding"
        Then I check the the "membership" button "backgroundColor" is "rgb(125, 227, 203)" just "before" selecting for "1 month without rounding"
        Then I select a "membership" plan for "1 month without rounding" for purchase
        Then I check the the "membership" button "color" is "rgb(225, 226, 228)" just "after" selecting for "1 month without rounding"
        Then I check the the "membership" button "backgroundColor" is "rgb(29, 53, 62)" just "after" selecting for "1 month without rounding"
        Then I click the "Checkout" button
        Then I fill in the customer general information
        Then I click the "View Order" link button
        Then I check that the expiration date is on the same day next month as today
        Then I check that the order reference is same as that on the order complete page

    @automated @functional
    Scenario: On selected environment i ensure that memberships can be purchased for 1 month no month rounding
        Given I am logged into Account area
        When I click the "Memberships" navigation link
        Then I check the the "membership" button "color" is "rgb(15, 28, 42)" just "before" selecting for "1 month with rounding"
        Then I check the the "membership" button "backgroundColor" is "rgb(125, 227, 203)" just "before" selecting for "1 month with rounding"
        Then I select a "membership" plan for "1 month with rounding" for purchase
        Then I check the the "membership" button "color" is "rgb(225, 226, 228)" just "after" selecting for "1 month with rounding"
        Then I check the the "membership" button "backgroundColor" is "rgb(29, 53, 62)" just "after" selecting for "1 month with rounding"
        Then I click the "Checkout" button
        Then I fill in the customer general information
        Then I click the "View Order" link button
        Then I check that the expiration date is on the month end of the next month
        Then I check that the order reference is same as that on the order complete page