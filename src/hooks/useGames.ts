// useGames.ts
import { useQuery } from '@tanstack/react-query'
import { BalldontlieAPI } from '@balldontlie/sdk'

const api = new BalldontlieAPI({
  apiKey: import.meta.env.VITE_BALL_DONT_LIE_API_TOKEN,
})

const fetchGames = async (season: number, teamId: number) => {
  const params = {
    seasons: [season],
    team_ids: [teamId],
    per_page: 100,
  }

  const response = await api.nba.getGames(params)
  return response.data
}

export const useGames = (
  season: number,
  teamId: number,
  enabled: boolean = false,
) => {
  return useQuery({
    queryKey: ['games', season, teamId],
    queryFn: () => fetchGames(season, teamId),
    enabled,
    staleTime: 1000 * 60 * 60 * 24,
  })
}
