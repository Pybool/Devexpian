Feature: User should be able to make bookings on all environments 
As a User I want to make bookings

@automated
Scenario: I should be able to make a booking on lakedistrict selecting 4 Adults
    Given I am logged in to lakedistrict environment
    When I click on the "New Booking" card on the "Reservation System" page
    Then I select "Ullswater market" on the modal market list
    Then I click "Book a journey" button on Event or Journey page
    Then I select the "From" location
    Then I should see the "From" modal
    Then I select an option in the "From" modal
    Then I click the "Next" button
    Then I select the "To" location
    Then I should see the "To" modal
    Then I select an option in the "To" modal
    Then I click the "Done" button
    Then I select the "Visitors" location
    Then I should see the "Select Visitors" modal
    Then I select "4 Adults" in the modal that pops up
    Then I click the "Done" button
    Then I select the "Date" location
    Then I select a date in the modal that pops up
    Then I click the "Next" button
    Then I select a ticket
    Then I click the "Done" button
    Then The "Booking Summary" widget show be visible
    Then I click the main done button
    Then I fill in the needed contact details
    Then I accept terms conditions and newsletter
    Then I click the make payment button
    Then I fill in the card details information
    Then I click the complete payment button

@automated
Scenario: I should be able to make a booking on lakedistrict selecting 2 Adults and 2 Children
    Given I am logged in to lakedistrict environment
    When I click on the "New Booking" card on the "Reservation System" page
    Then I select "Ullswater market" on the modal market list
    Then I click "Book a journey" button on Event or Journey page
    Then I select the "From" location
    Then I should see the "From" modal
    Then I select an option in the "From" modal
    Then I click the "Next" button
    Then I select the "To" location
    Then I should see the "To" modal
    Then I select an option in the "To" modal
    Then I click the "Done" button
    Then I select the "Visitors" location
    Then I should see the "Select Visitors" modal
    Then I select "2 Adults" in the modal that pops up
    Then I select "2 Child" in the modal that pops up
    Then I click the "Done" button
    Then I select the "Date" location
    Then I select a date in the modal that pops up
    Then I click the "Next" button
    Then I select a ticket
    Then I click the "Done" button
    Then The "Booking Summary" widget show be visible
    Then I click the main done button
    Then I fill in the needed contact details
    Then I accept terms conditions and newsletter
    Then I click the make payment button
    Then I fill in the card details information
    Then I click the complete payment button
    

@automated
Scenario: I should be able to make a booking on lakedistrict selecting 2 Adults and 2 Children
    Given I am logged in to lakedistrict environment
    When I click on the "New Booking" card on the "Reservation System" page
    Then I select "Ullswater market" on the modal market list
    Then I click "Book a journey" button on Event or Journey page
    Then I select the "From" location
    Then I should see the "From" modal
    Then I select an option in the "From" modal
    Then I click the "Next" button
    Then I select the "To" location
    Then I should see the "To" modal
    Then I select an option in the "To" modal
    Then I click the "Done" button
    Then I select the "Visitors" location
    Then I should see the "Select Visitors" modal
    Then I select "1 Adults" in the modal that pops up
    Then I select "3 Under 3" in the modal that pops up
    Then I click the "Done" button
    Then I select the "Date" location
    Then I select a date in the modal that pops up
    Then I click the "Next" button
    Then I select a ticket
    Then I click the "Done" button
    Then The "Booking Summary" widget show be visible
    Then I click the main done button
    Then I fill in the needed contact details
    Then I accept terms conditions and newsletter
    Then I click the make payment button
    Then I fill in the card details information
    Then I click the complete payment button
    

