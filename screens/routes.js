import * as React from 'react';
import { View, Button, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeScreenNavigation from './home/routes'
import HabitsScreenNavigation from './habits/routes'

import { HomeScreen } from './index'

const icon = ({ name }) => <Ionicons name={name} size={30} style={{marginStart:10}} backgroundColor="#000000" onPress={() => navigation.openDrawer()} />

const Drawer = createDrawerNavigator();

export default function MainNavigation({ containerRef, initialNavigationState }) {
    // TODO BIBI: Check usage of initialState
    return (
        <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
        
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen
              name="home"
              component={HomeScreenNavigation}
              options={{
                drawerLabel: 'Home',
                drawerIcon: ({ color, size, focused }) => icon({ name: "md-home" }),
              }}
            />
            <Drawer.Screen
              name="habits"
              component={HabitsScreenNavigation}
              options={{
                drawerLabel: 'Habits',
                drawerIcon: ({ color, size, focused }) => icon({ name: "md-repeat" }),
              }}
            />
            <Drawer.Screen
              name="todo"
              component={HomeScreen}
              options={{
                drawerLabel: 'To Do',
                drawerIcon: ({ color, size, focused }) => icon({ name: "ios-checkbox-outline" }),
            }}
            />

            <Drawer.Screen name="Notifications" component={HomeScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
    );
  }