import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import {
  HabitsProgressScreen, HabitsConfigureScreen, ToDoProgressScreen, HabitsEditScreen
} from '../screens'

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HabitsProgressScreen}
        options={{
          title: 'Today',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-today" />,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={HabitsConfigureScreen}
        options={{
          title: 'Configure',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-settings" />,
        }}
      />
      <BottomTab.Screen
        name="History"
        component={HabitsEditScreen}
        options={{
          title: 'History',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-analytics" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'How is your day doing?';
    case 'Settings':
      return 'How to configure habits?';
    case 'History':
      return 'How you performed through time?';
  }
}
