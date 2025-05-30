import { createFileRoute } from '@tanstack/react-router'
import TeamCards from '@/components/HomeComponents/TeamCards/TeamCards'
import SelectedTeamsSummary from '@/components/HomeComponents/SelectedTeamsSummary/SelectedTeamsSummary'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="bg-[#1D428A] text-white text-center pb-32 font-helvetica h-[100vh] overflow-y-auto">
      <h1 className="text-4xl font-bold p-4">🏀 NBA Team Duel 🏀</h1>
      <SelectedTeamsSummary />
      <TeamCards />
    </div>
  )
}
