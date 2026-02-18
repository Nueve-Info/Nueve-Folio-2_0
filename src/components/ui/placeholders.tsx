import { cn } from "@/lib/utils"
import { Play, User } from "lucide-react"
import { useInViewOnce } from "@/hooks/useInViewOnce"

interface PlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  videoUrl?: string
}

export function PlaceholderBlock({ className, videoUrl, ...props }: PlaceholderProps) {
  const [ref, inView] = useInViewOnce()

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-lg border border-black/5 bg-surface-grey",
        "before:absolute before:inset-0 before:bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.4),transparent)] before:opacity-50",
        className
      )}
      {...props}
    >
      {videoUrl && inView ? (
        <div className="absolute inset-0">
          <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
            <iframe
              src={`${videoUrl}?autoplay=1&loop=1&muted=1&title=0&byline=0&portrait=0&badge=0&autopause=0&background=1&player_id=0&app_id=58479`}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
              title="Introduction"
            />
          </div>
        </div>
      ) : videoUrl ? (
        <div className="absolute inset-0 flex items-center justify-center bg-nueve-black">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-orange border-t-transparent" />
        </div>
      ) : (
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />
      )}
      {props.children}
    </div>
  )
}

export function PlaceholderLine({ className, width = "100%", ...props }: PlaceholderProps & { width?: string | number }) {
  return (
    <div
      className={cn("h-4 rounded bg-black/5", className)}
      style={{ width }}
      {...props}
    />
  )
}

export function LogoMarkPlaceholder({ className, ...props }: PlaceholderProps) {
  return (
    <div
      className={cn(
        "flex h-8 items-center justify-center rounded-full bg-surface-grey px-4 font-bold text-black/20",
        className
      )}
      {...props}
    >
      <div className="h-4 w-4 rounded-full bg-black/10" />
      <div className="ml-2 h-2 w-12 rounded-full bg-black/10" />
    </div>
  )
}

export function MediaPlaceholder({ className, ...props }: PlaceholderProps) {
  return (
    <PlaceholderBlock className={cn("flex items-center justify-center bg-surface-grey", className)} {...props}>
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/50 backdrop-blur-sm transition-transform duration-300 hover:scale-110">
        <Play className="ml-1 h-6 w-6 text-nueve-black" fill="currentColor" />
      </div>
    </PlaceholderBlock>
  )
}

export function TestimonialPlaceholder({ className, ...props }: PlaceholderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-md",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-grey text-black/20">
          <User className="h-5 w-5" />
        </div>
        <div className="space-y-1.5">
          <PlaceholderLine width={120} className="h-3" />
          <PlaceholderLine width={80} className="h-2 opacity-60" />
        </div>
      </div>
      <div className="space-y-2">
        <PlaceholderLine width="100%" className="h-2" />
        <PlaceholderLine width="90%" className="h-2" />
        <PlaceholderLine width="60%" className="h-2" />
      </div>
    </div>
  )
}
