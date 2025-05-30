import { motion } from 'framer-motion'
import type { Team } from '@/types/Team'
import * as NBAIcons from 'react-nba-logos'
import { useUser } from '@clerk/clerk-react'

export default function TeamSide({
  team,
  role,
}: {
  team: Team
  role: 'user' | 'computer'
}) {
  const { user } = useUser()
  const TeamIcon = NBAIcons[team.abbreviation as keyof typeof NBAIcons]

  return (
    <div className="flex flex-col items-center">
      <p className="font-semibold mb-2">
        Team {role === 'user' ? user?.firstName || 'Guest' : 'Computer'}
      </p>
      <motion.div whileHover={{ scale: 1.1 }} transition={{ type: 'spring' }}>
        <TeamIcon size={80} />
      </motion.div>
      <p className="mt-2 font-bold">{team.name}</p>
    </div>
  )
}
