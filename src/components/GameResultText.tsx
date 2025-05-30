import { motion } from 'framer-motion'
import { useBattleResultsStore } from '@/stores/battleResultsStore'
import { useUser } from '@clerk/clerk-react'
import Confetti from 'react-confetti'

const GameResultText = ({ currentRound }: { currentRound: number }) => {
  const {
    userRoundPoints,
    computerRoundPoints,
    userTournamentPoints,
    computerTournamentPoints,
  } = useBattleResultsStore()
  const { user } = useUser()

  const checkUser = user?.firstName ? `${user.firstName}` : 'Guest'

  const baseStyle = 'font-extrabold p-2 rounded-lg'
  const roundTextColor =
    userRoundPoints > computerRoundPoints
      ? 'bg-white text-[#1D428A]'
      : computerRoundPoints > userRoundPoints
        ? 'bg-[#C8102E] text-white'
        : 'bg-gray-900 text-white'

  const tournamentTextColor =
    userTournamentPoints > computerTournamentPoints
      ? 'bg-[#1D428A] text-white'
      : computerTournamentPoints > userTournamentPoints
        ? 'bg-[#C8102E] text-white'
        : 'bg-gray-900 text-white'

  if (currentRound === 4) {
    return (
      <>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`${baseStyle} text-2xl ${tournamentTextColor}`}
        >
          {userTournamentPoints > computerTournamentPoints
            ? checkUser + ' wins the tournament !'
            : computerTournamentPoints > userTournamentPoints
              ? 'Computer wins the tournament !'
              : 'The tournament is a tie !'}
        </motion.p>
        {userTournamentPoints > computerTournamentPoints && <Confetti />}
      </>
    )
  }

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`${baseStyle} text-xl ${roundTextColor}`}
    >
      {userRoundPoints > computerRoundPoints
        ? checkUser + ' wins this round !'
        : computerRoundPoints > userRoundPoints
          ? 'Computer wins this round !'
          : "It's a tie !"}
    </motion.p>
  )
}

export default GameResultText
