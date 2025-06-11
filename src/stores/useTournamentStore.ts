import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Team } from '@/types/Team'

interface MatchupHistory {
  userTeam: Team
  computerTeam: Team
  season: number | null
  round: number
  winner: 'user' | 'computer' | 'tie'
}

interface TournamentState {
  randomTeams: Array<Team>
  matchupsHistory: Array<MatchupHistory>
  addRandomTeam: (team: Team) => void
  addMatchupHistory: (matchup: MatchupHistory) => void
  resetTournament: () => void
}

export const useTournamentStore = create<TournamentState>()(
  persist(
    (set) => ({
      randomTeams: [],
      matchupsHistory: [],
      addRandomTeam: (team) =>
        set((state) => ({ randomTeams: [...state.randomTeams, team] })),
      addMatchupHistory: (matchup) =>
        set((state) => ({
          matchupsHistory: [...state.matchupsHistory, matchup],
        })),
      resetTournament: () => set({ randomTeams: [], matchupsHistory: [] }),
    }),
    { name: 'tournament-storage' },
  ),
)
