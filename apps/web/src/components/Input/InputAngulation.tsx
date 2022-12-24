import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import { vibrate } from '@/utils/vibrate'
import Draggable from 'gsap/dist/Draggable'

interface InputAngulationProps {
  initial?: number
  onChange: (value: number) => void
  className?: string
}

export default function InputAngulation({ className, initial, onChange }: InputAngulationProps) {
  gsap.registerPlugin(Draggable)

  const angle = useRef(0)
  const wheel = useRef<SVGSVGElement>(null)
  const trigger = useRef<SVGPathElement>(null)

  useEffect(() => {
    gsap.set(wheel.current, { rotation: initial ?? 0 })
    Draggable.create(wheel.current, {
      type: 'rotation',
      inertia: true,
      trigger: trigger.current,
      liveSnap: (value) => {
        let snappedAngle = value < 0 ? 360 - (Math.abs(Math.round(value)) % 360) : Math.round(value) % 360
        snappedAngle = snappedAngle === 360 ? 0 : snappedAngle
        if (snappedAngle !== angle.current) {
          angle.current = snappedAngle
          onChange(snappedAngle)
          vibrate()
        }
        return value
      },
    })
  }, [])

  return (
    <div className={className}>
      {/* prettier-ignore */}
      <svg ref={wheel} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 306 306" className="w-full h-full">
        <path fill="#fff" fillOpacity=".8" fillRule="evenodd" stroke="#E5E7EB" strokeWidth=".8" d="M153 49C95.562 49 49 95.562 49 153s46.562 104 104 104 104-46.562 104-104S210.438 49 153 49ZM1 153C1 69.053 69.053 1 153 1s152 68.053 152 152-68.053 152-152 152S1 236.947 1 153Z"/>
        <g ref={trigger}>
          <path stroke="#2563EB" strokeLinecap="round" strokeWidth="36" d="M113.446 31.265a127.998 127.998 0 0 1 79.108 0"/>
          <path stroke="#60A5FA" strokeLinecap="round" strokeWidth="2" d="m106.621 27.283 4.153 11.258m1.533-13.212 3.633 11.436m2.511-13.234 3.088 11.596m3.1-13.091 2.537 11.729m3.686-12.923 1.982 11.835"/>
          <path stroke="#60A5FA" strokeLinecap="round" strokeWidth="2" d="m195.227 38.54 4.153-11.258m-9.563 9.405 3.633-11.436m-9.125 9.838 3.088-11.595m-8.647 10.257 2.537-11.728m-8.152 10.652 1.982-11.835"/>
          <path fill="#fff" d="M153 34.35c.417 0 .755-.137 1.016-.41.26-.267.39-.622.39-1.065v-10.83l-.146-3.672-.811.547 2.832 3.271 2.207 2.188c.124.13.27.237.44.322.169.078.358.117.566.117a1.301 1.301 0 0 0 .957-.38c.261-.254.391-.583.391-.987 0-.377-.147-.716-.44-1.015l-6.357-6.368c-.13-.13-.29-.23-.479-.302a1.466 1.466 0 0 0-.566-.118c-.195 0-.387.04-.576.118-.175.068-.335.17-.469.302l-6.357 6.368c-.293.3-.44.638-.44 1.015 0 .404.127.733.381.986.26.254.583.381.967.381.208 0 .394-.039.556-.117.17-.085.32-.192.45-.322l2.197-2.188 2.832-3.27-.811-.548-.146 3.672v10.83c0 .443.13.797.391 1.065.26.273.602.41 1.025.41Z"/>
        </g>
      </svg>
    </div>
  )
}
