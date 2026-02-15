describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('verifica o titulo da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.clock()

    const longText = Cypress._.repeat('abcdefgh', 10)

    cy.get('#firstName').type('Gabrielle')
    cy.get('#lastName').type('Kieffer')
    cy.get('#email').type('gabikieffer4@gmail.com')
    cy.get('#open-text-area').type(longText, { delay: 0.5 })
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')

    cy.tick(3000)

    cy.get('.success').should('not.be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.clock()

    cy.get('#firstName').type('Gabrielle')
    cy.get('#lastName').type('Kieffer')
    cy.get('#email').type('gabikieffer4@gmail,com')
    cy.get('#open-text-area').type('Text')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')

    cy.tick(3000)

    cy.get('.success').should('not.be.visible')
  })

  it('campo telefone continua vazio quando preenchido com valor não-numérico', () => {
    cy.get('#phone')
      .type('abcde')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock()
    
    cy.get('#firstName').type('Gabrielle')
    cy.get('#lastName').type('Kieffer')
    cy.get('#email').type('gabikieffer4@gmail.com')
    cy.get('#open-text-area').type('Text')
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')

        cy.tick(3000)

    cy.get('.success').should('not.be.visible')
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
    cy.clock()

    const data = {
      firstName: 'Gabrielle',
      lastName: 'Kieffer',
      email: 'gabikieffer4@gmail.com',
      text:'Teste.'
    }

    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')

    cy.tick(3000)

    cy.get('.success').should('not.be.visible')
  })


  // utilizando a função select para selecionar pelo texto

  it('seleciona um produto (Youtube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })


  // utilizando a função select para selecionar pelo valor

  it('seleciona um produto (Mentoria) por seu valor', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })


  // utilizando a função select para selecionar pelo indice

  it('seleciona um produto "Blog" por seu texto', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type= "radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
  })

  it('marca ambos checkboxes e depois desmarcar o último', () => {
    cy.get('input[type= "checkbox"]')
     .check()
     .should('be.checked')
     .last()
     .uncheck()
     .should('not.be.checked')
  })


  // fazendo upload de arquivos

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
    .should(input =>{
     expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('selecione um arquivo para o qual foi dado um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
    .selectFile('@sampleFile', {action: 'drag-drop'})
    .should(input =>{
     expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  // lidando com links que abrem em outra aba do navegador

// primeiro teste simulamos a abertura do link em outra aba

  it('verifica que a política de privacidade abre em outra aba sem necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
    .should('have.attr', 'href', 'privacy.html')
    .and('have.attr', 'target', '_blank')
  })

  // segundo teste acessamos as informações do link removendo o target com a função invoke, ou seja, sem abrir me outra aba

  it('acessa a página da política de privacidade removendo o target e clica no link', () => {
    cy.contains('a', 'Política de Privacidade')
    .invoke('removeAttr', 'target')
    .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })

  it.only('faz uma requisição HTTP', () => {
    cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
    .as('getRequest')
    .its('status')
    .should('be.equal', 200)
    cy.get('@getRequest')
    .its('statusText')
    .should('be.equal', 'OK')
    cy.get('@getRequest')
    .its('body')
    .should('include', 'CAC TAT')
  })

})