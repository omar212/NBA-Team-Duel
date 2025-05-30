import { Link } from '@tanstack/react-router'
import ClerkHeader from '@/integrations/clerk/header-user.tsx'
import GameInfoModal from '@/components/TournamentComponents/GameInfoModal'

export default function Header() {
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
      <div className="flex  items-center justify-between align-center w-fit h-full gap-4">
        <GameInfoModal />
        <ClerkHeader />
      </div>
    </header>
  )
}
