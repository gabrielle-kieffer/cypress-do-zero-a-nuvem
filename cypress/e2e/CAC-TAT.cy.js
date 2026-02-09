describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('verifica o titulo da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('abcdefgh', 10)

    cy.get('#firstName').type('Gabrielle')
    cy.get('#lastName').type('Kieffer')
    cy.get('#email').type('gabikieffer4@gmail.com')
    cy.get('#open-text-area').type(longText, { delay: 0.5 })
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('#firstName').type('Gabrielle')
    cy.get('#lastName').type('Kieffer')
    cy.get('#email').type('gabikieffer4@gmail,com')
    cy.get('#open-text-area').type('Text')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('campo telefone continua vazio quando preenchido com valor não-numérico', () => {
    cy.get('#phone')
      .type('abcde')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Gabrielle')
    cy.get('#lastName').type('Kieffer')
    cy.get('#email').type('gabikieffer4@gmail.com')
    cy.get('#open-text-area').type('Text')
    cy.get('#phone-checkbox').click()
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e tel', () => {
    cy.get('#firstName')
      .type('Gabrielle')
      .should('have.value', 'Gabrielle')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Kieffer')
      .should('have.value', 'Kieffer')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('gabikieffer4@gmail.com')
      .should('have.value', 'gabikieffer4@gmail.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('123456789')
      .should('have.value', '123456789')
      .clear()
      .should('have.value', '')
  })

  it('envia o formulário com sucesso usando um comando customizado', () => {
    // const data = {
    //   firstName: 'Gabrielle',
    //   lastName: 'Kieffer',
    //   email: 'gabikieffer4@gmail.com',
    //   text:'Teste.'
    // }

    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })


  // utilizando a função select para selecionar pelo texto

  it('seleciona um produto (Youtube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })


  // utilizando a função select para selecionar pelo valor

  it.only('seleciona um produto (Mentoria) por seu valor', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })


  // utilizando a função select para selecionar pelo indice

  it('seleciona um produto (Blog) por seu texto', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 1)
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio""] [value="feedback"]')
      .check()
      .should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type-"raio"')
      .each(typeOfService => {
        cy.warp(typeOfService)
          .check()
          .should('be.checked')
      })
  })

})