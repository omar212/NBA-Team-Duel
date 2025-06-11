import { Link } from '@tanstack/react-router'
import { useUser } from '@clerk/clerk-react'
import ClerkHeader from '@/integrations/clerk/header-user.tsx'
import GameInfoModal from '@/components/TournamentComponents/GameInfoModal'
import { useCreateUserRecord } from '@/hooks/useCreateUserRecord'

export default function Header() {
  const { wins, losses, ties, isLoading } = useCreateUserRecord()
  const { isSignedIn } = useUser()

  return (
    <header
      role="header"
      data-testid="header"
      className="p-4 flex gap-2 bg-black border-b border-gray-200 text-white justify-between items-center"
    >
      <nav role="navigation" className="flex items-center">
        <div className="px-2 font-bold">
          <Link to="/">Home</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/tournament">Tournament</Link>
        </div>
      </nav>

      <div className="flex items-center px-4 py-1 border border-white/20 rounded-lg bg-white/10 backdrop-blur-sm text-white text-sm font-semibold w-fit">
        {isSignedIn ? (
          isLoading ? (
            <p className="italic text-gray-300">Loading stats...</p>
          ) : (
            <>
              <span className="text-green-400">
                <span className="md:inline hidden">Wins</span>
                <span className="md:hidden inline">W</span>: {wins}
              </span>
              <span className="mx-2 text-gray-400">|</span>
              <span className="text-red-400">
                <span className="md:inline hidden">Losses</span>
                <span className="md:hidden inline">L</span>: {losses}
              </span>
              <span className="mx-2 text-gray-400">|</span>
              <span className="text-yellow-300">
                <span className="md:inline hidden">Ties</span>
                <span className="md:hidden inline">T</span>: {ties}
              </span>
            </>
          )
        ) : (
          <p className="italic text-gray-300">Sign in to view your stats.</p>
        )}
      </div>

      <div className="flex items-center justify-between align-center w-fit h-full gap-4">
        <GameInfoModal />
        <ClerkHeader />
      </div>
    </header>
  )
}
