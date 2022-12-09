import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'surf.peel',
  appName: 'Peel',
  backgroundColor: '#f5f5f5',
  server: { url: 'https://peel.vercel.app' },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
    },
  },
  ios: {
    allowsLinkPreview: false,
  },
}

export default config
