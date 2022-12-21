import Mapbox from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { env } from '@/env/client.mjs'
import { ComponentProps } from 'react'

type MapProps = Omit<ComponentProps<typeof Mapbox>, 'mapboxAccessToken' | 'mapStyle'> & {
  className?: string
}

export default function Map({ className, ...props }: MapProps) {
  return (
    <div className={`h-full w-full ${className}`}>
      <Mapbox
        {...props}
        mapStyle={env.NEXT_PUBLIC_MAPBOX_STYLE}
        mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{ latitude: 39.3351, longitude: -9.3624, zoom: 12 }}
      />
    </div>
  )
}
