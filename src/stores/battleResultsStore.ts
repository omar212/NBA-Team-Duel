import { create } from 'zustand'

interface BattleResults {
  userTournamentPoints: number
  userRoundPoints: number
  computerTournamentPoints: number
  computerRoundPoints: number
  addUserTournamentPoint: () => void
  addComputerTournamentPoint: () => void
  addUserRoundPoint: (points: number) => void
  addComputerRoundPoint: (points: number) => void
  resetAllPoints: () => void
  resetRoundPoints: () => void
}

export const useBattleResultsStore = create<BattleResults>((set) => ({
  userTournamentPoints: 0,
  userRoundPoints: 0,
  computerTournamentPoints: 0,
  computerRoundPoints: 0,
  addUserTournamentPoint: () =>
    set((state) => ({
      userTournamentPoints: state.userTournamentPoints + 1,
    })),
  addComputerTournamentPoint: () =>
    set((state) => ({
      computerTournamentPoints: state.computerTournamentPoints + 1,
    })),
  addUserRoundPoint: (points: number) =>
    set(() => ({
      userRoundPoints: points,
    })),
  addComputerRoundPoint: (points: number) =>
    set(() => ({
      computerRoundPoints: points,
    })),
  resetAllPoints: () =>
    set({
      userTournamentPoints: 0,
      userRoundPoints: 0,
      computerTournamentPoints: 0,
      computerRoundPoints: 0,
    }),
  resetRoundPoints: () =>
    set({
      userRoundPoints: 0,
      computerRoundPoints: 0,
    }),
}))
