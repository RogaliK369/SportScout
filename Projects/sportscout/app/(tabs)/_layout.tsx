import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import type { ComponentProps } from 'react';

import { Colors } from '@/constants';

type IoniconName = ComponentProps<typeof Ionicons>['name'];

function tabIcon(name: IoniconName) {
  return ({ color, size }: { color: string; size: number }) => (
    <Ionicons name={name} size={size} color={color} />
  );
}

/**
 * Bottom tab navigation for the main app (after login).
 */
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.muted,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: -2,
        },
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.borderLight,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 28 : 10,
          ...Platform.select({
            ios: {
              shadowColor: Colors.primary,
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
            },
            android: {
              elevation: 8,
            },
            default: {},
          }),
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Map',
          tabBarIcon: tabIcon('map-outline'),
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: tabIcon('calendar-outline'),
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: 'Friends',
          tabBarIcon: tabIcon('people-outline'),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: tabIcon('person-outline'),
        }}
      />
    </Tabs>
  );
}
