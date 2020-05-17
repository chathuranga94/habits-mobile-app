import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import TabBarIcon from '../../components/TabBarIcon';

import { HabitsEditScreen, HabitsTrackScreen, ToDoProgressScreen, ToDoConfigureScreen, ToDoHistoryScreen } from '../index'

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HabitsBottomTab({ navigation, route }) {
    // navigation.setOptions({ headerTitle: getHeaderTitle(route) });
    navigation.setOptions({
      headerTitle: 'To-Do',
      headerTitleAlign: 'center',
      headerLeft: ({ focused }) => <Ionicons name="md-menu" size={30} style={{marginStart:10}} backgroundColor="#000000" onPress={() => navigation.openDrawer()} />,
      headerTitleStyle: { fontWeight: 'bold', fontFamily: 'space-mono', fontSize: 30 }, // ''
    });
    const INITIAL_ROUTE_NAME = 'Home';

    return (
      <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
        <BottomTab.Screen
          name="Home"
          component={ToDoProgressScreen}
          options={{
            title: 'Home',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-today" />,
          }}
        />
        <BottomTab.Screen
          name="Settings"
          component={ToDoConfigureScreen}
          options={{
            title: 'Configure',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-settings" />,
          }}
        />
        <BottomTab.Screen
          name="History"
          component={ToDoHistoryScreen}
          options={{
            title: 'History',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-analytics" />,
          }}
        />
      </BottomTab.Navigator>
    );
}

export default function HabitsScreen({ navigation, route }) {
    return (
      <Stack.Navigator>
      <Stack.Screen name="Root" component={HabitsBottomTab} />
      <Stack.Screen name="editHabit" component={HabitsEditScreen} options={{ title: 'Habit Edit' }} />
      <Stack.Screen
        name="trackHabit"
        component={HabitsTrackScreen}
        options={{ title: '', headerStyle: {backgroundColor: '#f4511e'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold'}  }}
      />
    </Stack.Navigator>
    )

    // return <HabitsBottomTab navigation={navigation} route={route} />
  }



  // Note Currently Bottom Navigation inside Stack Navigation. Hence editHabit or trackHabit screens doesn't have bottom tabs.
  
  // To enable, wrap Stack Navigation inside Bottom Navigation.
  // Default export -> return <HabitsBottomTab navigation={navigation} route={route} />
  // Change component in <BottomTab.Screen name="Home" /> into component={HabitsTodayScreen}

  // const HabitsToday = createStackNavigator();
  // function HabitsTodayScreen({ navigation }) {
  //   return (
  //     <HabitsToday.Navigator>
  //       <HabitsToday.Screen
  //         name="now"
  //         component={HabitsProgressScreen}
  //         options={{
  //           headerTitle: 'Habits',
  //           // headerTitle: (props) => <Text>HELLO</Text>,
  //           // headerRight: () => <Ionicons name="md-repeat" size={30} style={{marginRight:30}} backgroundColor="#000000" />,
  //           headerTitleAlign: 'center',
  //           headerLeft: ({ focused }) => <Ionicons name="md-menu" size={30} style={{marginStart:10}} backgroundColor="#000000" onPress={() => navigation.openDrawer()} />,
  //           headerTitleStyle: { fontWeight: 'bold' },
  //         }}
  //       />
  //       <HabitsToday.Screen name="trackHabit" component={HabitsTrackScreen} options={{ title: '' }} />
  //     </HabitsToday.Navigator>
  //   );
  // }