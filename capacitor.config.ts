
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lovable.pieceflowdashboard',
  appName: 'piece-flow-dashboard',
  webDir: 'dist',
  server: {
    url: 'https://39a299dc-99dc-4bcd-9760-1310beebfeec.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      showSpinner: false
    }
  }
};

export default config;
