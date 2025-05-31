export const ClerkProvider = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
)

export const SignedIn = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
)
export const SignedOut = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
)
export const useUser = () => ({
  user: { id: 'test-user-id', firstName: 'Test' },
})
