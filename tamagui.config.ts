import { config } from '@tamagui/config/v3'
import { createTamagui } from '@tamagui/core'

// Create custom PrizePicks theme
const prizepicksTheme = {
  ...config.themes.dark,
  background: '#0A0A0A',
  backgroundHover: '#1A1A1A',
  backgroundPress: '#2A2A2A',
  backgroundFocus: '#1A1A1A',
  color: '#FFFFFF',
  colorHover: '#FFFFFF',
  colorPress: '#CCCCCC',
  colorFocus: '#FFFFFF',
  borderColor: '#333333',
  borderColorHover: '#00D4AA',
  borderColorPress: '#00D4AA',
  borderColorFocus: '#00D4AA',
  placeholderColor: '#666666',
  // PrizePicks green accent
  accent: '#00D4AA',
  accentHover: '#00B894',
  accentPress: '#00A085',
  accentFocus: '#00D4AA',
}

const tamaguiConfig = createTamagui({
  ...config,
  themes: {
    ...config.themes,
    prizepicks: prizepicksTheme,
  },
  defaultTheme: 'prizepicks',
})

export default tamaguiConfig

export type Conf = typeof tamaguiConfig

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}
