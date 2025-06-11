import { useMemo } from 'react'
import type { Team } from '@/types/Team'
import type { Game } from '@/types/Game'

export interface MatchupResult {
  userTeamName: string
  userTeamScore: number
  computerTeamName: string
  computerTeamScore: number
  winner: 'user' | 'computer' | 'tie'
  gameId: number
}

export const useMatchupResults = (
  userTeam: Team,
  computerTeam: Team,
  games: Array<Game>,
) => {
  return useMemo(() => {
    const matchupGames = games.filter(
      (game) =>
        (game.home_team.id === userTeam.id &&
          game.visitor_team.id === computerTeam.id) ||
        (game.home_team.id === computerTeam.id &&
          game.visitor_team.id === userTeam.id),
    )

    const results: Array<MatchupResult> = matchupGames.map((game) => {
      const userIsHome = game.home_team.id === userTeam.id

      const userTeamScore = userIsHome
        ? game.home_team_score
        : game.visitor_team_score

      const computerTeamScore = userIsHome
        ? game.visitor_team_score
        : game.home_team_score

      let winner: 'user' | 'computer' | 'tie'
      if (userTeamScore > computerTeamScore) winner = 'user'
      else if (userTeamScore < computerTeamScore) winner = 'computer'
      else winner = 'tie'

      return {
        userTeamName: userTeam.abbreviation,
        userTeamScore,
        computerTeamName: computerTeam.abbreviation,
        computerTeamScore,
        winner,
        gameId: game.id,
      }
    })

    return results
  }, [userTeam, computerTeam, games])
}
