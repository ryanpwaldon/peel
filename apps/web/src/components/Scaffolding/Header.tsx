interface HeaderProps {
  left?: React.ReactNode
  center?: React.ReactNode
  right?: React.ReactNode
}

export default function Header({ left, center, right }: HeaderProps) {
  return (
    <div className="grid h-12 w-full grid-cols-[1fr_max-content_1fr] items-center whitespace-nowrap flex-shrink-0 pt-device-bar-top box-content">
      <div className="h-full flex items-center justify-start text-left pl-4">{left}</div>
      <div className="h-full flex items-center justify-center text-center">{center}</div>
      <div className="h-full flex items-center justify-end text-right pr-4">{right}</div>
    </div>
  )
}
