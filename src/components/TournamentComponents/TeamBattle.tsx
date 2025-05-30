import { useEffect, useMemo } from 'react'
import * as NBAIcons from 'react-nba-logos'
import { motion } from 'framer-motion'
import { useUser } from '@clerk/clerk-react'
import type { Team } from '@/types/Team'
import type { Game } from '@/types/Game'
import { useBattleResultsStore } from '@/stores/battleResultsStore'

interface TeamBattleProps {
  userTeam: Team
  opponentTeam: Team
  games: Array<Game>
  round: number
}

function TeamBattle({ userTeam, opponentTeam, games, round }: TeamBattleProps) {
  const { user } = useUser()
  const {
    addUserRoundPoint,
    addComputerRoundPoint,
    addUserTournamentPoint,
    addComputerTournamentPoint,
    userRoundPoints,
    computerRoundPoints,
  } = useBattleResultsStore()

  const matchupResults = useMemo(() => {
    return games
      .filter(
        (game) =>
          (game.home_team.id === userTeam.id &&
            game.visitor_team.id === opponentTeam.id) ||
          (game.home_team.id === opponentTeam.id &&
            game.visitor_team.id === userTeam.id),
      )
      .map((game) => {
        const userIsHome = game.home_team.id === userTeam.id
        const userTeamScore = userIsHome
          ? game.home_team_score
          : game.visitor_team_score
        const computerTeamScore = userIsHome
          ? game.visitor_team_score
          : game.home_team_score

        return {
          userTeamName: userTeam.abbreviation,
          userTeamScore,
          computerTeamName: opponentTeam.abbreviation,
          computerTeamScore,
          winner:
            userTeamScore > computerTeamScore
              ? 'user'
              : userTeamScore < computerTeamScore
                ? 'computer'
                : 'tie',
          gameId: game.id,
        }
      })
  }, [games, userTeam, opponentTeam, round])

  useEffect(() => {
    if (matchupResults.length === 0) return
    const userWins = matchupResults.filter((r) => r.winner === 'user').length
    const computerWins = matchupResults.filter(
      (r) => r.winner === 'computer',
    ).length

    addUserRoundPoint(userWins)
    addComputerRoundPoint(computerWins)
  }, [matchupResults])

  useEffect(() => {
    if (userRoundPoints > computerRoundPoints) addUserTournamentPoint()
    else if (computerRoundPoints > userRoundPoints) addComputerTournamentPoint()
  }, [userRoundPoints, computerRoundPoints])

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center font-semibold mt-4">
        Round {round + 1} Series: {userRoundPoints} - {computerRoundPoints}
      </div>
      <div
        className="
        mt-4 
        border 
        p-1 
        rounded-xl 
        bg-gray-100 
        shadow-md 
        text-black 
        grid 
        grid-cols-2
        w-full 
        gap-2


        md:grid-cols-3
        md:p-2

        lg:grid-cols-4
        lg:p-4
      "
      >
        {matchupResults.length > 0 ? (
          matchupResults.map((result, idx) => {
            const UserTeamIcon =
              NBAIcons[result.userTeamName as keyof typeof NBAIcons]
            const ComputerTeamIcon =
              NBAIcons[result.computerTeamName as keyof typeof NBAIcons]

            return (
              <motion.div
                key={result.gameId}
                className="
                   
                  flex 
                  flex-col 
                  items-center 
                  justify-between 
                  border-2
                  gap-2
                  rounded-lg 
                  p-2 
                  bg-white 
                  w-full 
                  h-full
                  shadow-lg
                  shadow-black/50

                  md:w-52
                  md:h-40
                  md:justify-around

                  lg:w-48
                  lg:h-24
                  lg:justify-around
                  
                "
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.2 }}
              >
                <span
                  className={`w-32 text-center mt-2 px-2 py-1 rounded font-semibold text-sm text-white ${
                    result.winner === 'user'
                      ? 'bg-[#1D428A]'
                      : result.winner === 'computer'
                        ? 'bg-[#C8102E]'
                        : 'bg-gray-500'
                  }`}
                >
                  {result.winner === 'user'
                    ? user?.firstName
                      ? `${user.firstName.toUpperCase()} WINS`
                      : 'YOU WIN'
                    : result.winner === 'computer'
                      ? 'COMPUTER WINS'
                      : 'TIE'}
                </span>
                <div className="flex items-center justify-center gap-2">
                  <UserTeamIcon size={30} />
                  <span className="font-bold text-lg">
                    {result.userTeamScore}
                  </span>
                  <span className="text-sm font-semibold">vs</span>
                  <span className="font-bold text-lg">
                    {result.computerTeamScore}
                  </span>
                  <ComputerTeamIcon size={30} />
                </div>
              </motion.div>
            )
          })
        ) : (
          <p className="text-center text-sm col-span-4">
            No matchups found this season.
          </p>
        )}
      </div>
    </div>
  )
}

export default TeamBattle
