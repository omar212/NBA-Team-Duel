import { useState } from 'react'
import { useTeams } from '../hooks/useTeams'
import * as NBAIcons from 'react-nba-logos'
import { motion } from 'framer-motion'
import { useSelectedTeamsStore } from '@/stores/selectedTeamStore'
import type { Team } from '@/types/Team'

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

const conferences = ['East', 'All', 'West']
const divisions = {
  East: ['Atlantic', 'Central', 'Southeast'],
  West: ['Northwest', 'Pacific', 'Southwest'],
}

export default function TeamCards() {
  const { teams, isLoading } = useTeams()
  const { selectedTeams, selectTeam, removeTeam } = useSelectedTeamsStore()

  const [selectedConference, setSelectedConference] = useState('All')
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null)

  if (isLoading) return null

  const filteredTeams = teams?.filter((team: Team) => {
    return (
      (selectedConference === 'All' ||
        team.conference === selectedConference) &&
      (!selectedDivision || team.division.includes(selectedDivision))
    )
  })

  return (
    <div className="space-y-4">
      <div className="flex justify-center space-x-4">
        {conferences.map((conf) => (
          <button
            key={conf}
            className={`px-4 w-24 py-2 rounded-xl transition-colors ${
              selectedConference === conf
                ? 'bg-[#1D428A] border border-white text-white'
                : 'bg-gray-200 border-gray-200 text-black'
            }`}
            onClick={() => {
              setSelectedConference(conf)
              setSelectedDivision(null)
            }}
          >
            {conf}
          </button>
        ))}
      </div>

      {selectedConference !== 'All' && (
        <div className="flex justify-center space-x-4">
          {divisions[selectedConference as keyof typeof divisions].map(
            (div) => (
              <button
                key={div}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  selectedDivision === div
                    ? 'bg-[#1D428A] border border-white text-white'
                    : 'bg-gray-200 border-gray-200 text-black'
                }`}
                onClick={() =>
                  setSelectedDivision(div === selectedDivision ? null : div)
                }
              >
                {div}
              </button>
            ),
          )}
        </div>
      )}

      <motion.div
        className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredTeams?.map((team: Team) => {
          const TeamIcon = NBAIcons[team.abbreviation as keyof typeof NBAIcons]
          const isSelected = selectedTeams.some((t) => t.id === team.id)

          return (
            <motion.div
              key={team.id}
              variants={cardVariants}
              className={`
                m-2 p-2 border rounded-xl cursor-pointer shadow-xl shadow-black/50
                ${isSelected ? 'border-5 border-[#C8102E]' : 'border-gray-200'} 
                bg-black/90
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (isSelected) {
                  removeTeam(team.id)
                } else {
                  selectTeam(team)
                }
              }}
            >
              {TeamIcon && <TeamIcon />}
              <h2 className="text-white font-extrabold text-lg">{team.name}</h2>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
