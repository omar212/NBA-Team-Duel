import { motion } from 'framer-motion'
import { useUser } from '@clerk/clerk-react'
import Confetti from 'react-confetti'
import { useEffect } from 'react'
import { useBattleResultsStore } from '@/stores/battleResultsStore'
import { useUpdateTournamentResult } from '@/hooks/useUpdateTournamentResult'

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
      return `${userName.toUpperCase()} WINS ${isTournament ? 'THE TOURNAMENT!' : 'THIS ROUND!'}`
    if (computerPoints > userPoints)
      return `COMPUTER WINS ${isTournament ? 'THE TOURNAMENT!' : 'THIS ROUND!'}`
    return isTournament ? 'THE TOURNAMENT IS A TIE!' : "IT'S A TIE!"
  }

  const isTournamentEnd = currentRound === 4
  const userPoints = isTournamentEnd ? userTournamentPoints : userRoundPoints
  const computerPoints = isTournamentEnd
    ? computerTournamentPoints
    : computerRoundPoints

  const getTextColor = () => {
    if (userPoints > computerPoints)
      return isTournamentEnd
        ? 'bg-white text-[#1D428A]'
        : 'bg-white text-[#1D428A]'
    if (computerPoints > userPoints) return 'bg-[#C8102E] text-white'
    return 'bg-gray-900 text-white'
  }

  const resultText = getWinner(userPoints, computerPoints, isTournamentEnd)

  const { mutate, isPending, isError, isSuccess } = useUpdateTournamentResult()

  useEffect(() => {
    if (isTournamentEnd) {
      if (userTournamentPoints > computerTournamentPoints) {
        mutate('wins')
      } else if (userTournamentPoints < computerTournamentPoints) {
        mutate('losses')
      } else {
        mutate('ties')
      }
    }
  }, [isTournamentEnd, userTournamentPoints, computerTournamentPoints])

  console.log(isPending, isError, isSuccess)

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
