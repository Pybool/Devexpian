Feature: Ensure that the accounts page is rendered correctly after login
    As a tester i want to validate the account page to ensure it displays correctly

    @automated @functional
    Scenario: On selected environment i ensure that the accounts page is rendered correctly
        When I navigate to the "login" page on the selected environment
        Then I login using valid "taye.oyelekan@expian.io" and "Radio9*981tai"
        Then The account page should show the user email and have header "Welcome back"
        Then I ensure that all nav links are complete and visible with each having an Icon
        Then I should see that the Account Area has 6 tabs present
        |Tab 1                        |Tab 2            |Tab 3                 |Tab 4                 |Tab 5        | Tab 6     |
        |Number of Upcoming Bookings: |Number of Passes |Number of Past Orders:|Number of Memberships:|No Patronages|No Vouchers|
        Then For tab "1" The "Number of Upcoming Bookings:" count when "0" , "No Active Orders" should be seen in the list below else count should match items displayed
        Then For tab "2" The "Number of Passes:" count when "0" , "No Passes" should be seen in the list below else count should match items displayed
        Then For tab "3" The "Number of Past Orders:" count when "0" , "No Past Orders" should be seen in the list below else count should match items displayed
        Then For tab "4" The "Number of Memberships:" count when "0" , "No Memberships" should be seen in the list below else count should match items displayed
        Then For tab "5" The "Number of Patronages:" count when "0" , "No Patronages" should be seen in the list below else count should match items displayed
        Then For tab "6" The "Number of Vouchers:" count when "0" , "No Vouchers" should be seen in the list below else count should match items displayed

    # Scenario: Account Page tabs correspond to booking
    # Given I am a registered user
    # When I login to Account area
    # Then <Booking Counter> should match <Number of Booking>
    # |Number of Upcoming Bookings: |Number of Passes |Number of Past Orders:|Number of Memberships:|No Patronages    |No Vouchers      |
    # |Booking Counter              |Booking Counter  |Booking Counter       |Booking Counter       |Booking Counter  |Booking Counter  |
    # |Number of Booking            |Number of Booking|Number of Booking     |Number of Booking     |Number of Booking|Number of Booking|