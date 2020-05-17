import * as React from 'react';
import { View, Button, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import TabBarIcon from '../../components/TabBarIcon';

const Stack = createStackNavigator();

function TabAScreen({ navigation }) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="TabA Home"
          component={TabADetailsScreen}
          options={{
            title: 'home',
            headerLeft: ({ focused }) => (
              <Ionicons name="md-menu" size={30} style={{marginStart:10}} backgroundColor="#000000" onPress={() => navigation.openDrawer()} />
            )
          }}
        />
        <Stack.Screen name="TabA Details" component={Details} />
      </Stack.Navigator>
    );
  }
  function TabADetailsScreen({navigation}) {
    return (
      <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
        <Text>
          Welcome to TabA page!
        </Text>
        <Button 
        onPress={() => navigation.navigate('TabA Details')}
        title="Go to TabA Details"
        />
        <Button 
        onPress={() => navigation.openDrawer()}
        title="Toggle drawer"
        />
      </View>
    );
  }
  function Details() {
    return (
      <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
        <Text>
          TabA Details here!
        </Text>
      </View>
    );
  }
  function TabBScreen() {
    return (
      <View>
        <Text style={{textAlign: 'center', marginTop: 300}}>
          Welcome to TabB page!
        </Text>
      </View>
    );
  }

// const Tab = createBottomTabNavigator();
const BottomTab = createBottomTabNavigator();

export default function HomeScreen({ navigation }) {
  // return (
  //   <Tab.Navigator
  //   screenOptions={({ route }) => ({
  //     tabBarIcon: ({ focused, color, size }) => {
  //       let iconName;
  //       if (route.name === 'TabA') {
  //         iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
  //       } else if (route.name === 'TabB') {
  //         iconName = focused ? 'ios-list-box' : 'ios-list';
  //       }
  //       return <Ionicons name={iconName} size={size} color={color}     />;
  //       },
  //     })}
  //     tabBarOptions={{
  //     activeTintColor: 'tomato',
  //     inactiveTintColor: 'gray',
  //     }}
  //   >
  //       <Tab.Screen name="TabA" component={TabAScreen} />
  //       <Tab.Screen name="TabB" component={TabBScreen} />
  //   </Tab.Navigator>
  // );

  navigation.setOptions({
    headerTitle: 'ALLOCATE!',
    headerTitleAlign: 'center',
    headerLeft: ({ focused }) => <Ionicons name="md-menu" size={30} style={{marginStart:10}} backgroundColor="#000000" onPress={() => navigation.openDrawer()} />,
    headerTitleStyle: { fontWeight: 'bold' },
  });
  const INITIAL_ROUTE_NAME = 'Home';

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="home"
        component={TabAScreen} // component={HabitsTodayScreen}
        options={{
          title: 'Summary',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-today" />,
        }}
      />
      <BottomTab.Screen
        name="settings"
        component={TabBScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-settings" />,
        }}
      />
    </BottomTab.Navigator>
  );
}