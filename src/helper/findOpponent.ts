import type { Game } from '@/types/Game'
import type { Team } from '@/types/Team'

export function findOpponentTeamDetails(
  games: Game[],
  userTeamId: number,
  opponentId: number,
): Team | undefined {
  const opponentTeam = games
    .map((game) =>
      game.home_team.id === userTeamId ? game.visitor_team : game.home_team,
    )
    .find((team) => team.id === opponentId)

  if (!opponentTeam) return undefined

  return {
    id: opponentTeam.id || 0,
    full_name: opponentTeam.full_name || '',
    abbreviation: opponentTeam.abbreviation || '',
    city: opponentTeam.city || '',
    conference: opponentTeam.conference || '',
    division: opponentTeam.division || '',
    name: opponentTeam.name || '',
  }
}
