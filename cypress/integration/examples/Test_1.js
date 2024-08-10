

describe('Calender Tests', function () {
  before(function () {
    cy.fixture('example').then(function (data) {
      this.data = data
    })
  })
  it('Verify date selection', function () {
    cy.visit(Cypress.env('url') + '/angularpractice/')
    cy.get('form input[name*="name"]').type(this.data.name)
    cy.get('form input[name*="email"]').type(this.data.email)
    cy.get('select').select(this.data.gender)
    cy.get(':nth-child(4) > .ng-untouched').should('have.value', this.data.name) // can also be done by .text() method
    cy.get('form input[name*="name"]').should('have.attr', 'minlength', '2') // can also be done by prop method
    cy.get('#inlineRadio3').should('be.disabled')
    cy.pause()
    cy.get(':nth-child(2) > .nav-link').click()
    // cy.get(':nth-child(2) > .nav-link').click().debug()

    // cy.selectProduct(this.data.product_name)

    this.data.product_names.forEach((prod) => {
      cy.log(prod)
      cy.selectProduct(prod)
    })
  })
})
