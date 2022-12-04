import { useRouter } from 'next/router'
import Symbol from '@/components/Symbol/Symbol'

export default function Back() {
  const router = useRouter()
  return (
    <button className="flex items-center text-base text-blue-600" type="button" onClick={() => router.back()}>
      <Symbol className="font-bold" symbol="arrow_back_ios" />
      <span>Back</span>
    </button>
  )
}
