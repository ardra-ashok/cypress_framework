class CartPage {
  get_cartCheckOutBtn() {
    return cy.contains('Checkout')
  }
}

export default CartPage
