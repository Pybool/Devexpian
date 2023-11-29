Feature: Ensure that the new orders can be created
    As a customer i should be able to create new orders

    @automated @functional
    Scenario: On selected environment i ensure that new orders can be created
        When I navigate to the "login" page on the selected environment
        Then I enter my credentials and sign in
        Then I click on "New Order" in the navigation bar after reaching landing page
        Then I click the "Event" button to create an "Event" type order
        Then For the "What" option i select an option
        And For the "Who" option i select '4' "Adult"
        And For the "when" option i select a date
        Then I select a time for the order
        Then The Add To Cart Button should be visible
        Then I click the Add To Cart Button after the spinner disappears
        Then I check that there is a counter displayed at the top off the page and the count down works
        Then I click the "Checkout" button
        Then I fill in the customer general information
        