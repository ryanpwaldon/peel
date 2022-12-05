interface HeaderProps {
  left?: React.ReactNode
  center?: React.ReactNode
  right?: React.ReactNode
}

export default function Header({ left, center, right }: HeaderProps) {
  return (
    <div className="mb-1 box-content grid h-12 w-full flex-shrink-0 grid-cols-[1fr_max-content_1fr] items-center whitespace-nowrap pt-device-bar-top">
      <div className="flex h-full items-center justify-start pl-4 text-left">{left}</div>
      <div className="flex h-full items-center justify-center text-center">{center}</div>
      <div className="flex h-full items-center justify-end pr-4 text-right">{right}</div>
    </div>
  )
}
