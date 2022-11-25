interface PageTitleProps {
  title: string
  className?: string
}

export default function PageTitle({ title, className }: PageTitleProps) {
  return <h1 className={`text-3xl font-bold ${className}`}>{title}</h1>
}
