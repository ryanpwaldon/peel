interface HeaderTitleSubtitleProps {
  title: string
  subtitle: string
}

export default function HeaderTitleSubtitle({ title, subtitle }: HeaderTitleSubtitleProps) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-base font-semibold">{title}</span>
      <span className="text-xs text-gray-500">{subtitle}</span>
    </div>
  )
}
