describe('SelectedTeamsSummary Component', () => {
  const teams = ['Hawks', 'Celtics', 'Nets', 'Hornets', 'Bulls']

  beforeEach(() => {
    cy.visit('/')

    // Clear persisted state
    cy.clearLocalStorage()
  })

  it('displays message when no teams are selected', () => {
    cy.contains('Select up to 5 teams!').should('exist')
  })

  it('allows selecting up to 5 teams and displays them correctly', () => {
    teams.forEach((teamName) => {
      cy.findByText(teamName).click()
    })

    // Verify all selected teams are displayed
    teams.forEach((teamName) => {
      cy.get('[data-testid="selected-teams"]').should('contain', teamName)
    })

    // Verify the "It's Time to Ball!" button appears
    cy.contains("It's Time to Ball!").should('exist')

    cy.contains("It's Time to Ball!").click()

    cy.url().should('include', '/tournament')
  })

  it('allows removing a team', () => {
    teams.forEach((teamName) => {
      cy.findByText(teamName).click()
    })

    // Remove 'Celtics'
    cy.get('[data-testid="remove-team-button-2"]').click()

    // Verify Celtics is no longer displayed
    cy.get('[data-testid="selected-teams"]').should('not.contain', 'Celtics')
  })
})
