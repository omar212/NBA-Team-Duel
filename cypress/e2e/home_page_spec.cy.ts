describe('NBA Team Duel Homepage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the Home and Tournament navigation links', () => {
    cy.contains('Home').should('be.visible')
    cy.contains('Tournament').should('be.visible')
  })

  it('should navigate to Tournament page when clicking Tournament', () => {
    cy.contains('Tournament').click()
    cy.url().should('include', '/tournament')
  })
})
