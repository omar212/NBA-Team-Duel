import { useQuery } from '@tanstack/react-query'
import { BalldontlieAPI } from '@balldontlie/sdk'

const api = new BalldontlieAPI({
  apiKey: import.meta.env.VITE_BALL_DONT_LIE_API_TOKEN,
})

// Fetch from API normally
async function fetchTeams() {
  const cached = localStorage.getItem('nba_teams')
  if (cached) {
    console.log('cached')
    return JSON.parse(cached) // return cached data immediately if present
  }

  try {
    const teams = await api.nba.getTeams()
    // slicing teams to 30 because there are some additional fake teams in the data , the first 30 are the legit teams
    const teamsToReturn = teams.data.slice(0, 30)

    localStorage.setItem('nba_teams', JSON.stringify(teamsToReturn)) // cache fetched data
    return teamsToReturn
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useTeams = () => {
  const {
    data: teams,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['teams'],
    queryFn: fetchTeams,
    staleTime: 1000 * 60 * 60 * 24, // 1 day (adjust as needed)
  })

  return {
    teams,
    isLoading,
    error,
  }
}
