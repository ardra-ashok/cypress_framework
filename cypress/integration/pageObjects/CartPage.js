class CartPage {
  get_cartCheckOutBtn() {
    return cy.contains('Checkout')
  }
 get_productPrice() {
   return cy.get('tr td:nth-child(4) strong')
 }
 get_totalPrice() {
  return cy.get('h3 strong')
 }
}

export default CartPage
