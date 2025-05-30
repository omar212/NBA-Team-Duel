// _root.tsx
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Header from '../components/Header'
import TanStackQueryLayout from '../integrations/tanstack-query/layout.tsx'
import ClerkProvider from '../integrations/clerk/provider.tsx'
import { useCreateUserRecord } from '../hooks/useCreateUserRecord'
import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

// NEW: AppInnerLayout component placed INSIDE ClerkProvider
const AppInnerLayout = () => {
  useCreateUserRecord() // ✅ Now safely inside ClerkProvider

  return (
    <>
      <Header />
      <Outlet />
      <TanStackRouterDevtools />
      <TanStackQueryLayout />
    </>
  )
}

// Root layout, wraps everything in ClerkProvider
const AppLayout = () => {
  return (
    <ClerkProvider>
      <AppInnerLayout />
    </ClerkProvider>
  )
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: AppLayout,
})
