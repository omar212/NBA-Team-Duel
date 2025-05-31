import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { useSelectedTeamsStore } from '@/stores/selectedTeamStore'
import { useTournamentStore } from '@/stores/useTournamentStore'
import { useGames } from '@/hooks/useGames'
import { useGameStore } from '@/stores/gameStore'
import TeamBattle from '@/components/TournamentComponents/TeamBattle'
import TeamSide from '@/components/TournamentComponents/TeamSide'
import { useBattleResultsStore } from '@/stores/battleResultsStore'
import { getMostFrequentOpponentId } from '@/helper/getMostFrequent'
import { findOpponentTeamDetails } from '@/helper/findOpponent'
import GameResultText from '@/components/TournamentComponents/GameResultText'

export const Route = createFileRoute('/tournament')({
  component: TournamentComponent,
})

function TournamentComponent() {
  const { selectedTeams, resetTeams } = useSelectedTeamsStore()
  const { addRandomTeam, randomTeams, resetTournament } = useTournamentStore()

  const {
    userTournamentPoints,
    computerTournamentPoints,
    resetAllPoints,
    resetRoundPoints,
  } = useBattleResultsStore()

  const [currentRound, setCurrentRound] = useState(0)
  const [battleStarted, setBattleStarted] = useState(false)
  const [fetchEnabled, setFetchEnabled] = useState(false)
  const { season, setSeason, games, setGames, resetGames } = useGameStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!season) setSeason(getRandomSeason())
  }, [season, setSeason])

  const userTeam = selectedTeams[currentRound]

  if (selectedTeams.length < 5) {
    return (
      <div className="bg-[#1D428A] h-screen flex items-center justify-center text-white">
        <p className="text-2xl font-bold">
          Please select 5 teams from the list!
        </p>
      </div>
    )
  }

  const {
    data: fetchedGames,
    refetch,
    isFetching,
  } = useGames(season!, userTeam.id, fetchEnabled)

  useEffect(() => {
    if (fetchedGames) {
      const opponentId = getMostFrequentOpponentId(fetchedGames, userTeam.id, [
        ...selectedTeams,
        ...randomTeams,
      ])

      if (opponentId) {
        const opponentTeam = findOpponentTeamDetails(
          fetchedGames,
          userTeam.id,
          opponentId,
        )
        if (opponentTeam) {
          addRandomTeam(opponentTeam)
        }
      }

      setGames(fetchedGames)
    }
  }, [fetchedGames])

  const handleStartBattle = () => {
    resetAllPoints()
    setFetchEnabled(true)
    setBattleStarted(true)
    refetch()
  }

  const handleNextRound = () => {
    setCurrentRound((prev) => prev + 1)
    resetRoundPoints()
    setFetchEnabled(true)
    refetch()
  }

  const handleResetGame = () => {
    resetAllPoints()
    resetGames()
    resetTeams()
    resetTournament()
    setCurrentRound(0)
    setBattleStarted(false)
    navigate({ to: '/' })
  }

  if (!battleStarted) {
    return (
      <div className="bg-[#1D428A] h-screen flex items-center justify-center">
        <button
          onClick={handleStartBattle}
          className="px-8 py-3 font-bold bg-[#FDB927] shadow-lg shadow-black/50 rounded-lg text-black hover:bg-[#FDB927]/80"
        >
          🏆 BEGIN TOURNAMENT 🏆
        </button>
      </div>
    )
  }

  if (isFetching || randomTeams.length <= currentRound || !games.length) {
    return (
      <div className="bg-[#1D428A] h-screen flex flex-col items-center gap-2 justify-center text-white">
        <FaSpinner className="animate-spin text-3xl" />
        <p>LOADING MATCHUPS...</p>
      </div>
    )
  }

  const computerTeam = randomTeams[currentRound]

  return (
    <div
      className="
      bg-[#1D428A] 
      h-full
      min-h-screen
      flex 
      flex-col 
      items-center 
      justify-around 
      text-white
      p-5

      md:justify-center
      lg:justify-center
      
      
      "
    >
      <div className="flex flex-col gap-2 text-center">
        <h2 className="border-b border-t border-white rounded p-2 text-2xl font-bold mb-4">
          NBA TOURNAMENT
        </h2>
        <span className="text-xl">ROUND {currentRound + 1}</span>
        <p className="text-md text-gray-200">SEASON {season}</p>
      </div>
      <div className="flex justify-between gap-2 w-full max-w-4xl">
        <TeamSide team={userTeam} role="user" />
        <div className="flex flex-col justify-between w-full h-full gap-4 items-center">
          <div className="flex flex-col items-center">
            <p className="mt-2 mb-2 text-xl text-center">TOURNAMENT SERIES</p>
            <p className="text-3xl font-bold text-center">
              {userTournamentPoints} - {computerTournamentPoints}
            </p>
            <GameResultText currentRound={currentRound} />
          </div>
        </div>
        <TeamSide team={computerTeam} role="computer" />
      </div>
      <TeamBattle
        userTeam={userTeam}
        opponentTeam={computerTeam}
        games={games}
        round={currentRound}
      />
      {currentRound < 4 ? (
        <button
          onClick={handleNextRound}
          className="mt-4 px-4 py-2 border border-white rounded shadow-lg shadow-black/50 bg-white text-black hover:bg-gray-100 cursor-pointer font-bold"
        >
          NEXT ROUND
        </button>
      ) : (
        <button
          onClick={handleResetGame}
          className="bg-[#FDB927] mt-4 px-4 py-2 border border-white rounded shadow-lg shadow-black/50 text-black hover:bg-gray-100 cursor-pointer font-bold"
        >
          Play Again ?
        </button>
      )}
    </div>
  )
}

function getRandomSeason() {
  return [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022][
    Math.floor(Math.random() * 11)
  ]
}
