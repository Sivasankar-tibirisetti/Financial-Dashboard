import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.project.financialdashboard',
  appName: 'Financial Dashboard',
  webDir: 'out',
  server: {
    url: "http://10.0.2.2:3000", // 👈 point the Android app to your dev server
    cleartext: true              // allow http (not https) during development
  }
};

export default config;
