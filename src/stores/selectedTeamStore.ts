import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Team {
  id: number
  conference: 'East' | 'West'
  division: 'Southeast' | 'Southwest' | 'Northwest' | 'Pacific' | 'Central'
  city: string
  name: string
  full_name: string
  abbreviation: string
}

interface SelectedTeamsState {
  selectedTeams: Team[]
  selectTeam: (team: Team) => void
  removeTeam: (teamId: number) => void
  resetTeams: () => void
}

export const useSelectedTeamsStore = create<SelectedTeamsState>()(
  persist(
    (set, get) => ({
      selectedTeams: [],

      selectTeam: (team: Team) => {
        const current = get().selectedTeams
        if (current.length >= 5 || current.some((t) => t.id === team.id)) {
          return // No duplicates or more than 5 teams
        }
        set({ selectedTeams: [...current, team] })
      },

      removeTeam: (teamId: number) => {
        set({
          selectedTeams: get().selectedTeams.filter(
            (team) => Number(team.id) !== teamId,
          ),
        })
      },

      resetTeams: () => {
        set({ selectedTeams: [] })
      },
    }),
    {
      name: 'selected-teams-storage', // key name in localStorage
    },
  ),
)
