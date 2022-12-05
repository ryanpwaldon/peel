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
    name: 'Reef',
    rideDirection: 'LEFT',
    offshoreWindDirection: 130,
    lng: -9.423429,
    lat: 38.984043,
  },
  {
    name: 'The Bunker',
    rideDirection: 'LEFT',
    offshoreWindDirection: 110,
    lng: -9.344796,
    lat: 39.241555,
  },
  {
    name: 'Foz Do Lizandro',
    rideDirection: 'BOTH',
    offshoreWindDirection: 115,
    lng: -9.419362,
    lat: 38.941334,
  },
  {
    name: 'Nazare',
    rideDirection: 'LEFT',
    offshoreWindDirection: 30,
    lng: -9.088789,
    lat: 39.603149,
  },
  {
    name: "Ribeira D'Ilhas",
    rideDirection: 'RIGHT',
    offshoreWindDirection: 90,
    lng: -9.423545,
    lat: 38.98795,
  },
  {
    name: 'Backdoor',
    rideDirection: 'RIGHT',
    offshoreWindDirection: 110,
    lng: -9.423922,
    lat: 38.982724,
  },
  {
    name: 'Santa Amaro',
    rideDirection: 'LEFT',
    offshoreWindDirection: 0,
    lng: -9.313589,
    lat: 38.681139,
  },
  {
    name: 'Cave',
    rideDirection: 'RIGHT',
    offshoreWindDirection: 120,
    lng: -9.427338,
    lat: 38.994368,
  },
  {
    name: 'Pedra Branca',
    rideDirection: 'LEFT',
    offshoreWindDirection: 95,
    lng: -9.425079,
    lat: 38.979591,
  },
  {
    name: 'Inatel',
    rideDirection: 'LEFT',
    offshoreWindDirection: 0,
    lng: -9.315323,
    lat: 38.678375,
  },
  {
    name: 'Consolacao',
    rideDirection: 'RIGHT',
    offshoreWindDirection: 30,
    lng: -9.362723,
    lat: 39.323389,
  },
  {
    name: 'Molho Leste',
    rideDirection: 'RIGHT',
    offshoreWindDirection: 50,
    lng: -9.369039,
    lat: 39.349335,
  },
  {
    name: 'Porto Batel',
    rideDirection: 'RIGHT',
    offshoreWindDirection: 65,
    lng: -9.35756,
    lat: 39.319052,
  },
  {
    name: 'Paco de Arcos',
    rideDirection: 'LEFT',
    offshoreWindDirection: 330,
    lng: -9.295347,
    lat: 38.690088,
  },
  {
    name: 'Supertubos',
    rideDirection: 'BOTH',
    offshoreWindDirection: 70,
    lng: -9.36545,
    lat: 39.343492,
  },
  {
    name: 'Praia da Torre',
    rideDirection: 'RIGHT',
    offshoreWindDirection: 340,
    lng: -9.322814,
    lat: 38.673334,
  },
  {
    name: 'Sao Lourenco',
    rideDirection: 'BOTH',
    offshoreWindDirection: 100,
    lng: -9.424732,
    lat: 39.01377,
  },
  {
    name: 'Martinhal Beach',
    rideDirection: 'BOTH',
    offshoreWindDirection: 320,
    lng: -8.92487,
    lat: 37.018344,
  },
  {
    name: 'Coxos',
    rideDirection: 'RIGHT',
    offshoreWindDirection: 110,
    lng: -9.426752,
    lat: 38.999847,
  },
  {
    name: 'Crazy Left',
    rideDirection: 'LEFT',
    offshoreWindDirection: 120,
    lng: -9.426943,
    lat: 38.99773,
  },
  {
    name: 'Carcavelos',
    rideDirection: 'BOTH',
    offshoreWindDirection: 20,
    lng: -9.335669,
    lat: 38.676886,
  },
  {
    name: 'Tonel Beach',
    rideDirection: 'BOTH',
    offshoreWindDirection: 70,
    lng: -8.949866,
    lat: 37.007427,
  },
  {
    name: 'Soldiers Beach',
    rideDirection: 'BOTH',
    offshoreWindDirection: 325,
    lng: 151.564602,
    lat: -33.291277,
  },
]
