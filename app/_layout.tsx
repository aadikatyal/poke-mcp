import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { TamaguiProvider } from '@tamagui/core';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import tamaguiConfig from '../tamagui.config';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="prizepicks">
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>

        <StatusBar style="light" />
      </ThemeProvider>
    </TamaguiProvider>
  );
}