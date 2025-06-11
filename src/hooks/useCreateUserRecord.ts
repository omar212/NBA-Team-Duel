import { useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import supabase from '../utils/supabase'
import { resetGame } from '@/hooks/useResetGame'

const fetchUserRecord = async (clerkUserId: string) => {
  const { data, error } = await supabase
    .from('user_records')
    .select('*')
    .eq('clerk_user_id', clerkUserId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows found; return null explicitly
      return null
    }
    // Other errors should be thrown
    throw error
  }

  return data
}

const createUserRecord = async (
  clerkUserId: string,
  firstName: string,
  lastName: string,
  email: string,
) => {
  const { data, error } = await supabase
    .from('user_records')
    .insert({
      clerk_user_id: clerkUserId,
      wins: 0,
      losses: 0,
      ties: 0,
      first_name: firstName,
      last_name: lastName,
      email: email,
    })
    .single()

  if (error) throw error
  return data
}

export const useCreateUserRecord = () => {
  const { user, isSignedIn, isLoaded } = useUser()

  const {
    data: existingUserRecord,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['userRecord', user?.id],
    queryFn: () => fetchUserRecord(user!.id),
    enabled: !!user?.id && isLoaded,
  })

  const createMutation = useMutation({
    mutationFn: () =>
      createUserRecord(
        user!.id,
        user!.firstName!,
        user!.lastName!,
        user!.emailAddresses[0].emailAddress,
      ),
    onSuccess: () => {
      refetch()
    },
  })

  useEffect(() => {
    if (
      isSignedIn &&
      user.id &&
      !isFetching &&
      existingUserRecord === null &&
      !createMutation.isPending
    ) {
      createMutation.mutate()
    }
  }, [
    isSignedIn,
    user?.id,
    existingUserRecord,
    isFetching,
    createMutation.isPending,
  ])

  // Clear localStorage + reset stores when user signs out
  useEffect(() => {
    if (!isSignedIn && isLoaded) {
      console.log(
        '👋 User signed out — clearing localStorage and resetting game',
      )
      resetGame()
    }
  }, [isSignedIn, isLoaded])

  return {
    wins: existingUserRecord?.wins || 0,
    losses: existingUserRecord?.losses || 0,
    ties: existingUserRecord?.ties || 0,
    isLoading: isFetching || createMutation.isPending,
  }
}
