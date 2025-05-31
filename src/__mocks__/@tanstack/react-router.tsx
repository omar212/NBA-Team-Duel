// __mocks__/@tanstack/react-router.tsx
export const Link = ({ children, to, ...props }: any) => (
  <a href={to} {...props}>
    {children}
  </a>
)
