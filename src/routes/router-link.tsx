import { ForwardedRef, forwardRef } from 'react'
import { Link, LinkProps } from 'react-router-dom'

// ----------------------------------------------------------------------
interface RouterLinkProps extends LinkProps {
  to: string
}

const RouterLink = forwardRef<HTMLAnchorElement, RouterLinkProps>(({ to, ...other }, ref) => (
  <Link ref={ref as ForwardedRef<HTMLAnchorElement>} to={to} {...other} />
))

export default RouterLink
