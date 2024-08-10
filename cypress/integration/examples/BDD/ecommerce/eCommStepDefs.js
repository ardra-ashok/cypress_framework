import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import HomePage from '../../../../support/pageObjects/HomePage'
import CartPage from '../../../../support/pageObjects/CartPage'
import ProductsPage from '../../../../support/pageObjects/ProductsPage'
import ShippingPage from '../../../../support/pageObjects/ShippingPage'

const homePage = new HomePage()
const products = new ProductsPage()
const cartPage = new CartPage()
const shippingPage = new ShippingPage()

let name
Given('I open Ecommerce Page', function () {
  cy.visit(Cypress.env('url') + '/angularpractice/')
})

When('I add items to Cart', () => {
  homePage.get_shopTab().click()
  data.product_names.forEach((prod) => {
    cy.selectProduct(prod)
  })
  products.get_checkOutBtn().click()
})

Then('I validate the total prices', () => {
  var sum = 0
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
})
Then('I add the shipping details and verify purchase successful', () => {
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

When('I fill the form details', (dataTable) => {
  name = dataTable.rawTable[1][0]
  homePage.get_nameInput().type(dataTable.rawTable[1][0])
  homePage.get_emailInput().type(dataTable.rawTable[1][2])
  homePage.get_selectGender().select(dataTable.rawTable[1][1])
})

Then('I validate the forms behaviour', () => {
  homePage.get_dataBindingInput().should('have.value', name) // can also be done by .text() method
  homePage.get_nameInput().should('have.attr', 'minlength', '2') // can also be done by prop method
  homePage.get_entrepreneur().should('be.disabled')
})

Then('I finally select the Shop Page', () => {
  homePage.get_shopTab().click()
})
