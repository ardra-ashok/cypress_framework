import HomePage from '../pageObjects/HomePage'
import ProductsPage from '../pageObjects/ProductsPage'
import CartPage from '../pageObjects/CartPage'
import ShippingPage from '../pageObjects/ShippingPage'

describe('Shopping Cart', function () {
  before(function () {
    cy.fixture('example').then(function (data) {
      this.data = data
    })
  })
  it('Verify shopping cart function', function () {
    Cypress.config('defaultCommandTimeout', 8000) // can add this anywhere we need a spec level timeout

    const homePage = new HomePage()
    const products = new ProductsPage()
    const cartPage = new CartPage()
    const shippingPage = new ShippingPage()
    cy.visit(Cypress.env('url') + '/angularpractice/')
    homePage.get_nameInput().type(this.data.name)
    homePage.get_emailInput().type(this.data.email)
    homePage.get_selectGender().select(this.data.gender)
    homePage.get_dataBindingInput().should('have.value', this.data.name) // can also be done by .text() method
    homePage.get_nameInput().should('have.attr', 'minlength', '2') // can also be done by prop method
    homePage.get_entrepreneur().should('be.disabled')
    // cy.pause()
    homePage.get_shopTab().click()
    // cy.get(':nth-child(2) > .nav-link').click().debug() // debug and pause

    // cy.selectProduct(this.data.product_name)
    this.data.product_names.forEach((prod) => {
      cy.selectProduct(prod)
    })
    var sum = 0
    products.get_checkOutBtn().click()
    cartPage
      .get_productPrice()
      .each((el, index, list) => {
        const actualPrice = el.text()
        var res = Number(actualPrice.split(' ')[1].trim())
        sum = sum + res
      })
      .then(() => {
        cartPage.get_totalPrice().then((elem) => {
          var totalPrice = Number(elem.text().split(' ')[1])
          expect(totalPrice).to.equal(sum)
        })
      })

    cartPage.get_cartCheckOutBtn().click()
    shippingPage.get_countryInput().type('India')
    shippingPage.get_selectCountry().click()
    shippingPage.get_agreeTermsCheck().click({ force: true })
    shippingPage.get_purchaseBtn().click()
    shippingPage.get_successAlert().then((elem) => {
      const successAlert = elem.text()
      expect(successAlert.includes('Success')).to.be.true
      cy.log('Purchase is successful')
    })
  })
})
