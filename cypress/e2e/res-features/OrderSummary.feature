Feature: Ensure that Overide price button is not present on customer portal
    As a tester i want to Ensure that Overide price button is not present on customer portal

    @automated @booking
    Scenario: Overide price button not visible in customer portal
        When I navigate to the "login" page on the "booking" environment
        Then I login using valid "taye.oyelekan@expian.io" and "Radio9*981tai"
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
        Then I should not see "Overide price?" button