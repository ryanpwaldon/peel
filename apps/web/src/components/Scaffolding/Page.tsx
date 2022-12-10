import { motion } from 'framer-motion'
import Navigation from '@/components/Scaffolding/Navigation'

interface PageProps {
  children: React.ReactNode
  header?: React.ReactNode
  showNavigation?: boolean
}

export default function Page({ children, header, showNavigation = true }: PageProps) {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-25%' }}
      transition={{ ease: [0.23, 0.71, 0.36, 1], duration: 0.512 }}
      className="absolute top-0 left-0 flex h-full w-full flex-col bg-gray-100"
    >
      {header && header}
      <div className="flex-1 overflow-auto">{children}</div>
      {showNavigation && <Navigation />}
    </motion.div>
  )
}
