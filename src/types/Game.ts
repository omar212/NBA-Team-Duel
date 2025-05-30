import type { Division } from '@/types/Team'

export interface Game {
  id: number
  home_team: {
    id: number
    full_name: string
    abbreviation: string
    city: string
    conference: 'East' | 'West'
    division: Division
    name: string
  }
  visitor_team: {
    id: number
    full_name: string
    abbreviation: string
    city: string
    conference: 'East' | 'West'
    division: Division
    name: string
  }
  home_team_score: number
  visitor_team_score: number
}
