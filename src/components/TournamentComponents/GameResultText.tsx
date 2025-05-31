import { motion } from 'framer-motion'
import { useUser } from '@clerk/clerk-react'
import Confetti from 'react-confetti'
import { useBattleResultsStore } from '@/stores/battleResultsStore'

interface GameResultTextProps {
  currentRound: number
}

const GameResultText = ({ currentRound }: GameResultTextProps) => {
  const {
    userRoundPoints,
    computerRoundPoints,
    userTournamentPoints,
    computerTournamentPoints,
  } = useBattleResultsStore()

  const { user } = useUser()
  const userName = user?.firstName || 'Guest'

  const getWinner = (
    userPoints: number,
    computerPoints: number,
    isTournament: boolean,
  ) => {
    if (userPoints > computerPoints)
      return `${userName} wins ${isTournament ? 'the tournament!' : 'this round!'}`
    if (computerPoints > userPoints)
      return `Computer wins ${isTournament ? 'the tournament!' : 'this round!'}`
    return isTournament ? 'The tournament is a tie!' : "It's a tie!"
  }

  const isTournamentEnd = currentRound === 4
  const userPoints = isTournamentEnd ? userTournamentPoints : userRoundPoints
  const computerPoints = isTournamentEnd
    ? computerTournamentPoints
    : computerRoundPoints

  const getTextColor = () => {
    if (userPoints > computerPoints)
      return isTournamentEnd
        ? 'bg-[#1D428A] text-white'
        : 'bg-white text-[#1D428A]'
    if (computerPoints > userPoints) return 'bg-[#C8102E] text-white'
    return 'bg-gray-900 text-white'
  }

  const resultText = getWinner(userPoints, computerPoints, isTournamentEnd)

  return (
    <>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`min-w-32 mt-2 font-extrabold p-2 text-center rounded-lg text-[1rem] md:text-base lg:text-lg text-xl md:text-2xl lg:text-3xl ${getTextColor()}`}
      >
        {resultText}
      </motion.p>
      {isTournamentEnd && userPoints > computerPoints && <Confetti />}
    </>
  )
}

export default GameResultText
