class ProductsPage{
 get_checkOutBtn() {
  return cy.get('#navbarResponsive > .navbar-nav > .nav-item > .nav-link');
 }

}

export default ProductsPage