import { useSelectedTeamsStore } from '@/stores/selectedTeamStore'
import * as NBAIcons from 'react-nba-logos'
import { motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function SelectedTeamsSummary() {
  const { selectedTeams, removeTeam } = useSelectedTeamsStore()

  return (
    <div
      className="
        grid 
        grid-cols-1
        
        justify-center
        items-center
        w-fit
        
        
        fixed
        bottom-5
        left-0
        right-0
        bg-gray-300
        bg-opacity-90
        border-t border-gray-700
        rounded-xl
        py-2
        px-4
        m-auto
        gap-2
        z-50
        shadow-xl
      "
    >
      {selectedTeams.length === 0 ? (
        <p className="text-black font-extrabold text-lg">
          Select up to 5 teams!
        </p>
      ) : (
        <motion.div
          className="flex flex-row items-center gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {selectedTeams.map((team) => {
            const TeamIcon =
              NBAIcons[team.abbreviation as keyof typeof NBAIcons]
            return (
              <motion.div
                key={team.id}
                variants={cardVariants}
                className="flex flex-col items-center border rounded-xl p-2 bg-black text-white"
              >
                <div className="relative">
                  <TeamIcon size={50} />

                  <button
                    className="
                      absolute top-0 right-0 
                      -mt-3 -mr-4 bg-red-600 hover:bg-red-500
                      text-white rounded-full 
                      w-5 h-5 flex justify-center items-center text-xs
                    "
                    onClick={() => removeTeam(team.id)}
                  >
                    X
                  </button>
                </div>
                <p className="text-sm mt-1">{team.name}</p>
              </motion.div>
            )
          })}
        </motion.div>
      )}
      {selectedTeams.length === 5 && (
        <Link
          to="/battle"
          className="bg-[#1D428A] hover:bg-[#1D428A]/80 text-white font-extrabold rounded-xl p-2"
        >
          It's Time to Ball!
        </Link>
      )}
    </div>
  )
}
