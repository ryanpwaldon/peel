interface HeaderProps {
  left?: React.ReactNode
  center?: React.ReactNode
  right?: React.ReactNode
  fill: boolean
}

export default function Header({ left, center, right, fill }: HeaderProps) {
  return (
    <div className={`box-content grid h-12 w-full border-b-hairline flex-shrink-0 grid-cols-[1fr_max-content_1fr] items-center whitespace-nowrap pt-device-bar-top transition-colors duration-[256ms] ${fill ? 'bg-white border-gray-200' : 'border-transparent'}`}>
      <div className="flex h-full items-center justify-start pl-4 text-left">{left}</div>
      <div className={`flex h-full items-center justify-center text-center transition-opacity duration-[256ms] ${fill ? 'opacity-100' : 'opacity-0'}`}>{center}</div>
      <div className="flex h-full items-center justify-end pr-4 text-right">{right}</div>
    </div>
  ) // prettier-ignore
}
