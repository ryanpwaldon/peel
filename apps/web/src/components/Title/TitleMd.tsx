interface TitleMdProps {
  title: string
  className?: string
}

export default function TitleMd({ title, className }: TitleMdProps) {
  return <h1 className={`text-xl font-bold ${className}`}>{title}</h1>
}
