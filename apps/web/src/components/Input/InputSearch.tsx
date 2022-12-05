import Symbol from '@/components/Symbol/Symbol'

interface InputSearchProps {
  prompt: string
  className?: string
}

export default function InputSearch({ prompt, className }: InputSearchProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex w-full items-center rounded-[10px] bg-gray-200 px-2 py-1.5 text-base text-gray-500">
        <Symbol symbol="search" className="mr-1 text-xl leading-6" />
        <span>{prompt}</span>
      </div>
    </div>
  )
}
