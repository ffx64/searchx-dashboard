import { Typography } from "@/components/ui/typography"
import { ReactNode } from "react"

interface NavigationProps {
  children: ReactNode
}

interface NavigationLinkProps {
  children?: React.ReactNode
  active?: boolean
  onClick?: () => void
}

export const NavigationRoot = ({ children }: NavigationProps) => {
  return (
    <nav className="flex items-center gap-4">
      {children}
    </nav>
  )
}

export const NavigationLink = ({ children, active = false, onClick }: NavigationLinkProps) => {
  return (
    <Typography variant="h3">
      <a
        onClick={onClick}
        className={`text-sm font-medium transition-colors hover:text-primary ${
          active ? "text-primary" : "text-muted-foreground"
        }`}
      >
        {children}
      </a>
    </Typography>
  )
}
