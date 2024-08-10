class HomePage {
  get_nameInput() {
    return cy.get('form input[name*="name"]')
  }
  get_dataBindingInput() {
    return cy.get(':nth-child(4) > .ng-untouched')
  }
  get_emailInput() {
    return cy.get('form input[name*="email"]')
  }
  get_selectGender() {
    return cy.get('select')
  }
 get_entrepreneur() {
   return cy.get('#inlineRadio3')
 }
 get_shopTab() {
  return cy.get(':nth-child(2) > .nav-link')
 }
}

export default HomePage