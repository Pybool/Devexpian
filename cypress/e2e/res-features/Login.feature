Feature: Customer Login
    As a tester on Reservations i want to validate the login page to ensure it displays correctly and one can login

    @automated @functional
    Scenario: On Reservations environment i ensure that the login page is rendered correctly
        When I navigate to the "login" page on the selected environment
        Then I should see the "login" modal displayed
        Then I should see that there is an "Email" label
        Then I should see that there is an "username" input field
        Then I should see that there is an "Password" label
        Then I should see that there is an "password" input field
        And I should see that there is a "Sign in" button with the correct css properties
        And I should also see that there is a "Forgot your password?" link on the login page with the correct css properties

    @automated @functional
    Scenario Outline: On Reservations environment i proceed to enter my correct credentials and login successfully
        When I navigate to the "login" page on the selected environment
        Then I login using valid "<username>" and "<password>"
        # Then The account page should show the user email and have header "Welcome back"
        Examples:
                | username                  | password      |
                | taye.oyelekan@expian.io   | Radio9*981tai |


    @automated @functional
    Scenario Outline: User enters incorrect login
        When I navigate to the "login" page on the selected environment
        And I login using invalid "<username>" and "<password>"
        Then I should see "The username or password you entered is invalid" displayed
        And user is not logged into account area
        Examples:
            | username                  | password      |
            | taye.oyelekan@expian.io   | Radio9        |

    # # Scenario: User is able to logout
    # #     Given I am logged into Account area
    # #     When I click Logout button
    # #     Then the New Order page displays
    # #     # And The Login button displays


