import type { Game } from '@/types/Game'
import type { Team } from '@/types/Team'

export function getMostFrequentOpponentId(
  games: Game[],
  userTeamId: number,
  excludedTeams: Team[],
): number | undefined {
  const opponentCount: Record<number, number> = {}

  // Count how many times each opponent team has played against user's team
  games.forEach((game) => {
    const opponentId =
      game.home_team.id === userTeamId
        ? game.visitor_team.id
        : game.home_team.id

    opponentCount[opponentId] = (opponentCount[opponentId] || 0) + 1
  })

  // Sort opponents by frequency, highest first
  const sortedOpponents = Object.entries(opponentCount).sort(
    ([, countA], [, countB]) => countB - countA,
  )

  const excludedTeamIds = excludedTeams.map((team) => team.id)

  // Return the first valid opponent that's not already selected
  for (const [opponentId] of sortedOpponents) {
    if (!excludedTeamIds.includes(Number(opponentId))) {
      return Number(opponentId)
    }
  }

  // Return undefined if no suitable opponent is found
  return undefined
}
