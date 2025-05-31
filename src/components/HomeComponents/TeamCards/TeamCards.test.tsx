import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, test, vi, beforeEach } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TeamCards from './TeamCards'
import { useTeams } from '@/hooks/useTeams'
import { useSelectedTeamsStore } from '@/stores/selectedTeamStore'

// Mock data
const mockTeams = [
  {
    id: 1,
    name: 'Celtics',
    abbreviation: 'BOS',
    conference: 'East',
    division: 'Atlantic',
    city: 'Boston',
    full_name: 'Boston Celtics',
  },
  {
    id: 2,
    name: 'Lakers',
    abbreviation: 'LAL',
    conference: 'West',
    division: 'Pacific',
    city: 'Los Angeles',
    full_name: 'Los Angeles Lakers',
  },
]

// Mock useTeams hook
vi.mock('@/hooks/useTeams', () => ({
  useTeams: vi.fn(),
}))

// Reset zustand store before each test
beforeEach(() => {
  useSelectedTeamsStore.getState().resetTeams()
})

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
})

describe('TeamCards Component', () => {
  test('renders all team cards', () => {
    ;(useTeams as jest.Mock).mockReturnValue({
      teams: mockTeams,
      isLoading: false,
    })

    render(
      <QueryClientProvider client={queryClient}>
        <TeamCards />
      </QueryClientProvider>,
    )

    const teamCards = screen.getAllByRole('team-card')
    expect(teamCards).toHaveLength(mockTeams.length)

    expect(screen.getByText('Celtics')).toBeInTheDocument()
    expect(screen.getByText('Lakers')).toBeInTheDocument()
  })

  test('ensure team cards are clickable and added to selected teams within the store', () => {
    ;(useTeams as jest.Mock).mockReturnValue({
      teams: mockTeams,
      isLoading: false,
    })

    render(
      <QueryClientProvider client={queryClient}>
        <TeamCards />
      </QueryClientProvider>,
    )

    // Click on the Celtics card by using a test id
    const teamCards = screen.getAllByRole('team-card')
    const celticsCard = teamCards[0]
    fireEvent.click(celticsCard)

    // Verify Celtics is added
    const selectedTeams = useSelectedTeamsStore.getState().selectedTeams
    expect(selectedTeams).toHaveLength(1)
    expect(selectedTeams[0].name).toBe('Celtics')

    // Click on the Lakers card
    const lakersCard = teamCards[1]
    fireEvent.click(lakersCard)

    // Verify Lakers is added as well
    expect(useSelectedTeamsStore.getState().selectedTeams).toHaveLength(2)
    expect(useSelectedTeamsStore.getState().selectedTeams[1].name).toBe(
      'Lakers',
    )
  })
})
