class ShippingPage {
 get_countryInput() {
  return cy.get('#country')
 }
 get_selectCountry() {
  return cy.get('.suggestions > ul > li > a')
 }
 get_agreeTermsCheck() {
  return cy.get('#checkbox2')
 }
 get_purchaseBtn() {
  return cy.get('input[type="submit"]')
 }
 get_successAlert() {
  return cy.get('.alert')
 }
}
export default ShippingPage;