import { vibrate } from '@/utils/vibrate'
import { RadioGroup } from '@headlessui/react'
import { Dispatch, SetStateAction } from 'react'

interface InputTabsProps {
  tabs: Tab[]
  selected: number
  setSelected: Dispatch<SetStateAction<number>>
  className?: string
}

export interface Tab {
  label: string
  value: number
}

export default function InputTabs({ tabs, selected, setSelected, className }: InputTabsProps) {
  const onChange = (value: number) => {
    vibrate()
    setSelected(value)
  }

  return (
    <RadioGroup value={selected} onChange={onChange} className={`flex space-x-1 ${className}`}>
      {tabs.map((tab) => (
        <RadioGroup.Option key={tab.value} value={tab.value}>
          {({ checked }) => (
            <div className={`relative rounded-md border-hairline py-1.5 px-3 ${checked ? 'border-gray-200 bg-white' : 'border-transparent'}`}>
              <span className={`${checked ? 'invisible' : ''}`}>{tab.label}</span>
              <span className={`absolute top-0 left-0 flex h-full w-full items-center justify-center font-semibold ${checked ? '' : 'hidden'}`}>
                {tab.label}
              </span>
            </div>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  )
}
