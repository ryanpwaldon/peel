interface HeaderTitleProps {
  title: string
}

export default function HeaderTitle({ title }: HeaderTitleProps) {
  return <div className="text-base font-semibold">{title}</div>
}
