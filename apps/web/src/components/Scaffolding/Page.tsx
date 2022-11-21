import Navigation from '@/components/Scaffolding/Navigation'

interface PageProps {
  children: React.ReactNode
  header?: React.ReactNode
  showNavigation?: boolean
}

export default function Page({ children, header, showNavigation = true }: PageProps) {
  return (
    <div className="w-full h-full flex flex-col">
      {header && header}
      <div className="flex-1 overflow-auto">{children}</div>
      {showNavigation && <Navigation />}
    </div>
  )
}
