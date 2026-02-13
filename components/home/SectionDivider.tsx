'use client'

export function SectionDivider({ variant = 'wave' }: { variant?: 'wave' | 'diagonal' | 'dots' | 'minimal' | 'gradient' }) {
  if (variant === 'diagonal') {
    return (
      <div className="h-20 bg-gradient-to-b from-muted to-background flex items-center justify-center overflow-hidden">
        <div className="w-full h-full relative">
          <svg
            viewBox="0 0 1200 80"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <path
              d="M0,40 Q300,10 600,40 T1200,40 L1200,80 L0,80 Z"
              className="fill-muted"
            />
          </svg>
        </div>
      </div>
    )
  }

  if (variant === 'dots') {
    return (
      <div className="py-12 bg-background flex items-center justify-center">
        <div className="flex gap-2">
          <div className="w-1 h-1 rounded-full bg-primary/30 animate-pulse" />
          <div className="w-1 h-1 rounded-full bg-primary/50 animate-pulse" style={{ animationDelay: '0.1s' }} />
          <div className="w-1 h-1 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-1 h-1 rounded-full bg-primary/50 animate-pulse" style={{ animationDelay: '0.1s' }} />
          <div className="w-1 h-1 rounded-full bg-primary/30 animate-pulse" />
        </div>
      </div>
    )
  }

  if (variant === 'minimal') {
    return (
      <div className="py-8 bg-background">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>
    )
  }

  if (variant === 'gradient') {
    return (
      <div className="h-16 bg-gradient-to-b from-background via-primary/5 to-background flex items-center justify-center">
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>
    )
  }

  // wave variant
  return (
    <div className="h-20 bg-gradient-to-b from-background to-background flex items-center justify-center overflow-hidden relative">
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(219, 234, 254)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="rgb(240, 249, 255)" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <path
          d="M0,30 Q300,15 600,30 T1200,30 L1200,60 L0,60 Z"
          fill="url(#gradient)"
        />
      </svg>
    </div>
  )
}
