interface ArrowDownProps {
  className?: string
  rotate?: number | null
}

export default function ArrowDown({ className, rotate }: ArrowDownProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 12" className={className}>
      <path
        fill="currentColor"
        transform-origin="center"
        transform={`rotate(${rotate})`}
        d="M6.709 11.71A.967.967 0 0 1 6 12a.95.95 0 0 1-.709-.29L1.3 7.731c-.2-.198-.3-.42-.3-.666 0-.282.087-.509.26-.681a.906.906 0 0 1 .653-.259c.147 0 .276.026.386.079.116.057.215.13.3.219l1.26 1.245 1.25 1.367-.077-1.343V.995c0-.298.089-.538.267-.72C5.478.09 5.711 0 6 0c.283 0 .514.091.693.274.178.183.268.423.268.72v6.698l-.077 1.343 1.25-1.367 1.268-1.245a1.1 1.1 0 0 1 .29-.22.946.946 0 0 1 .395-.078c.257 0 .472.086.645.259.179.172.268.4.268.681 0 .246-.1.468-.3.666l-3.991 3.98Z"
      />
    </svg>
  )
}
