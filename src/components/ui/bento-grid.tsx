import { cn } from "@/lib/utils"
import type { HTMLAttributes, ReactNode } from "react"

interface BentoGridProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function BentoGrid({ children, className, ...props }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface BentoCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  colSpan?: 1 | 2 | 3
  rowSpan?: 1 | 2
}

export function BentoCard({
  children,
  className,
  colSpan = 1,
  rowSpan = 1,
  ...props
}: BentoCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-white/10 bg-white/5 p-6",
        "transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07]",
        colSpan === 2 && "md:col-span-2",
        colSpan === 3 && "lg:col-span-3",
        rowSpan === 2 && "row-span-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface BentoCardHeaderProps {
  icon?: ReactNode
  title: string
  description?: string
}

export function BentoCardHeader({ icon, title, description }: BentoCardHeaderProps) {
  return (
    <div className="mb-4">
      {icon && (
        <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-orange/10 text-brand-orange">
          {icon}
        </div>
      )}
      <h6 className="text-white">{title}</h6>
      {description && (
        <p className="mt-1 text-sm text-text-grey">{description}</p>
      )}
    </div>
  )
}
