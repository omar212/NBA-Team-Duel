import { useMutation } from '@tanstack/react-query'
import { useUser } from '@clerk/clerk-react'
import supabase from '@/utils/supabase'

type UserRecord = {
  wins: number
  losses: number
  ties: number
}

export const useUpdateTournamentResult = () => {
  const { user } = useUser()
  const userId = user?.id

  const tournamentKey = userId ? `tournament-updated-${userId}` : null

  const mutation = useMutation({
    mutationFn: async (column: keyof UserRecord) => {
      if (!userId || !tournamentKey) throw new Error('User not logged in')

      const hasUpdated = localStorage.getItem(tournamentKey)
      if (hasUpdated) return

      const { data: record, error: fetchError } = await supabase
        .from('user_records')
        .select('*')
        .eq('clerk_user_id', userId)
        .single()

      if (fetchError) throw fetchError
      const currentCount = record[column] || 0

      const { error: updateError } = await supabase
        .from('user_records')
        .update({ [column]: currentCount + 1 })
        .eq('clerk_user_id', userId)
        .select()

      if (updateError) throw updateError

      localStorage.setItem(tournamentKey, 'true')
    },
  })

  return mutation
}
