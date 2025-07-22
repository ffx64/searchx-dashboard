import { Badge } from "@/components/ui/badge"

type SoftBadgeProps = {
  status: "paused" | "active"
}

const STATUS_CONFIG = {
  paused: {
    label: "paused",
    className: "bg-amber-600/10 dark:bg-amber-600/20 hover:bg-amber-600/10 text-amber-500",
    dot: "bg-amber-500",
  },
  active: {
    label: "active",
    className: "bg-emerald-600/10 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-500",
    dot: "bg-emerald-500",
  },
}

export const SoftBadge = ({ status }: SoftBadgeProps) => {
  const { label, className, dot } = STATUS_CONFIG[status]

  return (
    <Badge className={`${className} shadow-none rounded-md`}>
      <div className={`h-1.5 w-1.5 rounded-full mr-2 ${dot}`} />
      {label}
    </Badge>
  )
}
