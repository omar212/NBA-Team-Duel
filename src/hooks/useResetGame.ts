import { useBattleResultsStore } from '@/stores/battleResultsStore'
import { useTournamentStore } from '@/stores/useTournamentStore'
import { useSelectedTeamsStore } from '@/stores/selectedTeamStore'

export const resetGame = () => {
  const resetAllPoints = useBattleResultsStore.getState().resetAllPoints
  const resetTournament = useTournamentStore.getState().resetTournament
  const resetTeams = useSelectedTeamsStore.getState().resetTeams

  resetAllPoints()
  resetTournament()
  resetTeams()
  localStorage.clear()
}
