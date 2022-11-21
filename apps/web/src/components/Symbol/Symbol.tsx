interface SymbolProps {
  symbol: string
  className?: string
}

export default function Symbol({ symbol, className }: SymbolProps) {
  return <span className={`font-symbols ${className}`}>{symbol}</span>
}
