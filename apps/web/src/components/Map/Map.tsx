import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { env } from '@/env/client.mjs'
import { useEffect, useRef } from 'react'

export default function Map() {
  const map = useRef<mapboxgl.Map>()
  const mapContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapContainer.current) return
    map.current = new mapboxgl.Map({
      accessToken: env.NEXT_PUBLIC_MAPBOX_TOKEN,
      container: mapContainer.current,
      style: env.NEXT_PUBLIC_MAPBOX_STYLE,
      center: [-9.3624, 39.3351],
      zoom: 12,
    })
  }, [])

  return <div ref={mapContainer} className="h-full w-full" />
}
