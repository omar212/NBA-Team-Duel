export type Division =
  | 'Central'
  | 'Southeast'
  | 'Northwest'
  | 'Pacific'
  | 'Southwest'
  | 'Atlantic'

export interface Team {
  id: number
  abbreviation: string
  city: string
  conference: 'East' | 'West'
  division: Division
  full_name: string
  name: string
  short_name?: string
  state?: string
}
