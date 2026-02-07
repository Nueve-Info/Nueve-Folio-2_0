import { cn } from "@/lib/utils"

interface HeroBackgroundProps {
  className?: string
}

export function HeroBackground({ className }: HeroBackgroundProps) {
  return (
    <div
      id="unicorn-embed"
      className={cn(
        "absolute inset-0 -z-10 bg-background",
        className
      )}
    >
      {/* Optional: Subtle grid pattern for light mode */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />
    </div>
  )
}
