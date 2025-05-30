import { motion } from 'framer-motion'
import * as NBAIcons from 'react-nba-logos'
import { useUser } from '@clerk/clerk-react'
import type { Team } from '@/types/Team'

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
    <div className="h-full w-full  flex flex-col items-center justify-center align-center m-auto">
      <p className="font-semibold mb-2">
        TEAM{' '}
        {role === 'user'
          ? user?.firstName?.toUpperCase() || 'GUEST'
          : 'COMPUTER'}
      </p>
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring' }}
        className="flex items-center justify-center"
      >
        <TeamIcon size={120} />
      </motion.div>
      <p className="mt-2 font-bold">{team.name.toUpperCase()}</p>
    </div>
  )
}
