import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'surf.peel',
  appName: 'Peel',
  backgroundColor: '#f5f5f5',
  server: { url: 'http://192.168.1.4:3000' },
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
