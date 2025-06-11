import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Game {
  id: number
  home_team: any
  visitor_team: any
  home_team_score: number
  visitor_team_score: number
}

interface GameState {
  season: number | null
  games: Array<Game>
  setSeason: (season: number) => void
  setGames: (games: Array<Game>) => void
  resetGames: () => void
  getMatchups: (teamAId: number, teamBId: number) => Array<Game>
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      season: null,
      games: [],
      setSeason: (season) => set({ season }),
      setGames: (games) => set({ games }),
      resetGames: () => set({ season: null, games: [] }),
      getMatchups: (teamAId, teamBId) => {
        return get().games.filter(
          (game) =>
            (game.home_team.id === teamAId &&
              game.visitor_team.id === teamBId) ||
            (game.home_team.id === teamBId && game.visitor_team.id === teamAId),
        )
      },
    }),
    { name: 'game-storage' },
  ),
)
