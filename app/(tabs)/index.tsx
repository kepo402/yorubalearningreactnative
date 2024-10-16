// app/(tabs)/index.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../HomeScreen'; // Importing HomeScreen from the parent directory
import ProgressScreen from '../ProgressScreen'; // Import ProgressScreen similarly
import BeginnerScreen from '../BeginnerScreen'; // Import BeginnerScreen

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
      <Tab.Screen name="Beginner" component={BeginnerScreen} />
      {/* Other screens can be added here */}
    </Tab.Navigator>
  );
}
