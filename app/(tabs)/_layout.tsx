import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        // Active icon/label bright white, inactive dimmed
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#B3B3B3',
        tabBarStyle: {
          backgroundColor: '#000000', // Pure black background
          borderTopColor: '#000000',
          borderTopWidth: 1,
          height: 64,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <IconSymbol size={28} name="house.fill" color={color} />
              {focused && (
                <View
                  style={{
                    width: 44,
                    height: 6,
                    backgroundColor: '#8000FF',
                    borderRadius: 999,
                    marginTop: 6,
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <IconSymbol size={28} name="list.bullet" color={color} />
              {focused && (
                <View
                  style={{
                    width: 44,
                    height: 6,
                    backgroundColor: '#8000FF',
                    borderRadius: 999,
                    marginTop: 6,
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Friends',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <IconSymbol size={28} name="person.2.fill" color={color} />
              {focused && (
                <View
                  style={{
                    width: 44,
                    height: 6,
                    backgroundColor: '#8000FF',
                    borderRadius: 999,
                    marginTop: 6,
                  }}
                />
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
