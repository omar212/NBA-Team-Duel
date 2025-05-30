import { Link } from '@tanstack/react-router'

import ClerkHeader from '../integrations/clerk/header-user.tsx'

export default function Header() {
  return (
    <header className="p-4 flex gap-2 bg-black border-b border-gray-200 text-white justify-between">
      <nav className="flex flex-row items-center">
        <div className="px-2 font-bold">
          <Link to="/">Home</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/battle">Battle</Link>
        </div>
      </nav>

      <div>
        <ClerkHeader />
      </div>
    </header>
  )
}
