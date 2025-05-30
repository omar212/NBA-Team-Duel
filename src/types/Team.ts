export type Division =
  | 'Central'
  | 'Southeast'
  | 'Northwest'
  | 'Pacific'
  | 'Southwest'
  | 'Atlantic'

export type Conference = 'East' | 'West'

export interface Team {
  id: number
  abbreviation: string
  city: string
  conference: Conference
  division: Division
  full_name: string
  name: string
  short_name?: string
  state?: string
}
