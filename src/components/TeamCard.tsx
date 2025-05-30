import type { Team } from '@/types/Team'

export function TeamCard({ team }: { team: Team }) {
  return (
    <div className="text-center">
      <p className="font-semibold">{team.name}</p>
      <p className="text-sm text-gray-500">{team.city}</p>
    </div>
  )
}
