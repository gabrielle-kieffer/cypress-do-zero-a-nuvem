Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName:'Ana',
    lastName:'Castro',
    email:'anacastro@gmail.com',
    text: 'Test.'
}) => {
 cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    cycontains('button', 'Enviar').click()
})