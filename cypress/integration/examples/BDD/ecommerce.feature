Feature: E2E Ecommerce Validation

 @Regression
 Scenario: Ecommerce products delivery
  Given I open Ecommerce Page
  When I add items to Cart
  And I validate the total prices
  Then I add the shipping details and verify purchase successful

 @Smoke
 Scenario: Filling the Home Page Form
  Given I open Ecommerce Page
  When I fill the form details
  | name | gender | email               |
  | Vinc | Male   | test@automation.com |
  Then I validate the forms behaviour
  And I finally select the Shop Page