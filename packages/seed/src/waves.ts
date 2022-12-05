import { WaveRideDirection } from '@peel/db'

interface CreateWaveInput {
  name: string
  lat: number
  lng: number
  rideDirection: WaveRideDirection
  faceDirection: number
}

export const waves: CreateWaveInput[] = [
  {
    name: 'Soldiers Beach',
    rideDirection: 'BOTH',
    faceDirection: 325,
    lng: 151.564602,
    lat: -33.291277,
  },
  {
    name: 'Lakes Beach',
    rideDirection: 'BOTH',
    faceDirection: 270,
    lng: 151.564195,
    lat: -33.254428,
  },
  {
    name: 'Pellows',
    rideDirection: 'BOTH',
    faceDirection: 345,
    lng: 151.553171,
    lat: -33.300842,
  },
  {
    name: 'Little Bommie',
    rideDirection: 'RIGHT',
    faceDirection: 250,
    lng: 151.567639,
    lat: -33.276142,
  },
  {
    name: 'Rocky Point',
    rideDirection: 'RIGHT',
    faceDirection: 210,
    lng: 151.569262,
    lat: -33.277993,
  },
  {
    name: 'Backdoor',
    rideDirection: 'RIGHT',
    faceDirection: 240,
    lng: 151.572796,
    lat: -33.2789,
  },
]
