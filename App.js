import * as React from 'react';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import AppReducer from './screens/reducer'
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';


import TabBarIcon from './components/TabBarIcon';

// import React from 'react';
import { Button, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import { createStackNavigator} from '@react-navigation/stack';
// import { Ionicons } from '@expo/vector-icons';



import { HabitsEditScreen, HabitsTrackScreen, HabitsProgressScreen, HabitsConfigureScreen, HabitsHistoryScreen } from './screens'
const icon = ({ name }) => <Ionicons name={name} size={30} style={{marginStart:10}} backgroundColor="#000000" onPress={() => navigation.openDrawer()} />

const Stack = createStackNavigator();
const store = createStore(AppReducer, applyMiddleware(ReduxThunk))

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);



// BottomTab.Navigator.
const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'TabA') {
          iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
        } else if (route.name === 'TabB') {
          iconName = focused ? 'ios-list-box' : 'ios-list';
        }
        return <Ionicons name={iconName} size={size} color={color}     />;
        },
      })}
      tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      }}
    >
        <Tab.Screen name="TabA" component={TabAScreen} />
        <Tab.Screen name="TabB" component={TabBScreen} />
    </Tab.Navigator>
  );
  // <Stack.Navigator>
  //   <Stack.Screen name="Root" component={BottomTabNavigator} />
  //   <Stack.Screen name="editHabit" component={HabitsEditScreen} options={{ title: 'Habit Edit' }} />
  //   <Stack.Screen name="trackHabit" component={HabitsTrackScreen} options={{ title: '' }}/>
  // </Stack.Navigator>
}

const BottomTab = createBottomTabNavigator();

function HabitsScreen({ navigation, route }) {
  // navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  navigation.setOptions({ headerTitle: 'ss' });
  const INITIAL_ROUTE_NAME = 'Home';

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HabitTodayScreen}
        options={{
          title: 'Home',
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
        component={HabitsHistoryScreen}
        options={{
          title: 'History',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-analytics" />,
        }}
      />
    </BottomTab.Navigator>
  );
}





const HabitsToday = createStackNavigator();

function HabitTodayScreen({ navigation }) {
  return (
    <HabitsToday.Navigator>
      <HabitsToday.Screen
        name="now"
        component={HabitsProgressScreen}
        options={{
          headerTitle: 'Habits',
          // headerTitle: (props) => <Text>HELLO</Text>,
          // headerRight: () => <Ionicons name="md-repeat" size={30} style={{marginRight:30}} backgroundColor="#000000" />,
          headerTitleAlign: 'center',
          headerLeft: ({ focused }) => <Ionicons name="md-menu" size={30} style={{marginStart:10}} backgroundColor="#000000" onPress={() => navigation.openDrawer()} />,
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <HabitsToday.Screen name="trackHabit" component={HabitsTrackScreen} options={{ title: '' }} />
    </HabitsToday.Navigator>
  );
}






function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>No New Notifications!</Text>
      <Button 
      onPress={() => navigation.goBack()}
      title="Go back home"
      />
    </View>
  );
}
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
const Drawer = createDrawerNavigator();



  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <Provider store={store}>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
        
        
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen
              name="Home"
              component={HomeScreen}
              options={{
                  drawerIcon: ({ color, size, focused }) => icon({ name: "md-home" }),
              }}
            />
            <Drawer.Screen
              name="Habits"
              component={HabitsScreen}
              options={{
                drawerIcon: ({ color, size, focused }) => icon({ name: "md-repeat" }),
              }}
            />
            <Drawer.Screen
              name="To-Do"
              component={HomeScreen}
              options={{
                drawerIcon: ({ color, size, focused }) => icon({ name: "ios-checkbox-outline" }),
            }}
            />

            <Drawer.Screen name="Notifications" component={NotificationsScreen} />
          </Drawer.Navigator>


          
          {/*
          <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} />
            <Stack.Screen name="editHabit" component={HabitsEditScreen} options={{ title: 'Habit Edit' }} />
            <Stack.Screen
              name="trackHabit"
              component={HabitsTrackScreen}
              options={{ title: '', headerStyle: {backgroundColor: '#f4511e'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold'}  }}
            />
          </Stack.Navigator>
          */}
         
        </NavigationContainer>
      </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
