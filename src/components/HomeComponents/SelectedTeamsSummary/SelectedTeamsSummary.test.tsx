import { render, screen } from '@testing-library/react'
import { describe, test, expect, beforeEach, vi } from 'vitest'
import { useSelectedTeamsStore } from '@/stores/selectedTeamStore'
import SelectedTeamsSummary from './SelectedTeamsSummary'
// import type { Team } from '@/types/Team'

// Mock some NBA team data
// const mockTeams: Team[] = [
//   {
//     id: 1,
//     abbreviation: 'BOS',
//     name: 'Celtics',
//     conference: 'East',
//     division: 'Atlantic',
//     city: 'Boston',
//     full_name: 'Boston Celtics',
//   },
//   {
//     id: 2,
//     abbreviation: 'LAL',
//     name: 'Lakers',
//     conference: 'West',
//     division: 'Pacific',
//     city: 'Los Angeles',
//     full_name: 'Los Angeles Lakers',
//   },
//   {
//     id: 3,
//     abbreviation: 'NYK',
//     name: 'Knicks',
//     conference: 'East',
//     division: 'Atlantic',
//     city: 'New York',
//     full_name: 'New York Knicks',
//   },
//   {
//     id: 4,
//     abbreviation: 'GSW',
//     name: 'Warriors',
//     conference: 'West',
//     division: 'Pacific',
//     city: 'Golden State',
//     full_name: 'Golden State Warriors',
//   },
//   {
//     id: 5,
//     abbreviation: 'CHI',
//     name: 'Bulls',
//     conference: 'East',
//     division: 'Central',
//     city: 'Chicago',
//     full_name: 'Chicago Bulls',
//   },
// ]

// Use a cleanup function to completely reset the store state between tests
beforeEach(() => {
  // First clear all previous state and listeners
  useSelectedTeamsStore.setState({
    selectedTeams: [],
    selectTeam: vi.fn(),
    removeTeam: vi.fn(),
    resetTeams: vi.fn(),
  })
})

describe('SelectedTeamsSummary Component', () => {
  test('shows message when no teams selected', () => {
    render(<SelectedTeamsSummary />)

    expect(screen.getByText('Select up to 5 teams!')).toBeInTheDocument()
  })
})
