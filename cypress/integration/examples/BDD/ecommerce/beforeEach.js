before(() => {
  cy.fixture('example').then(function (data) {
    globalThis.data = data
  })
})
