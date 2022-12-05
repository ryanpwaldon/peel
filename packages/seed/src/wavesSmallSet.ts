import { WaveRideDirection } from '@peel/db'

interface CreateWaveInput {
  name: string
  lat: number
  lng: number
  rideDirection: WaveRideDirection
  offshoreWindDirection: number
}

export const waves: CreateWaveInput[] = [
  {
    name: 'Supertubos',
    rideDirection: 'BOTH',
    offshoreWindDirection: 70,
    lng: -9.36545,
    lat: 39.343492,
  },
  {
    name: 'Soldiers Beach',
    rideDirection: 'BOTH',
    offshoreWindDirection: 325,
    lng: 151.564602,
    lat: -33.291277,
  },
]
