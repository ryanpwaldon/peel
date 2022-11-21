import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useRef } from 'react'
import { MAPBOX_PUBLIC_KEY, MAPBOX_STYLE } from '@/constants'

export default function Map() {
  const map = useRef<mapboxgl.Map>()
  const mapContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapContainer.current) return
    map.current = new mapboxgl.Map({
      accessToken: MAPBOX_PUBLIC_KEY,
      container: mapContainer.current,
      style: MAPBOX_STYLE,
      center: [-9.3624, 39.3351],
      zoom: 12,
    })
  }, [])

  return <div ref={mapContainer} className="h-full w-full" />
}
