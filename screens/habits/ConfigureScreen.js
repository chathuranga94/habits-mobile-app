import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import TouchableScale from 'react-native-touchable-scale';
import { ListItem, Slider, Icon, Button } from 'react-native-elements';

// const LinearGradient = undefined;
const list2 = [
  {
    name: 'Read',
    subtitle: '20min',
    icon: 'home',
    type: 'daily'
  },
  {
    name: 'Spanish',
    subtitle: '15min',
    icon: 'language',
    type: 'daily'
  },
  {
    name: 'Read',
    subtitle: '20min',
    icon: 'home',
    type: 'daily'
  },
  {
    name: 'Spanish',
    subtitle: '15min',
    icon: 'language',
    type: 'daily'
  },
  {
    name: 'Spanish Review',
    subtitle: '30min',
    icon: 'language',
    type: 'weekly'
  },
  {
    name: 'HIIT Exercise',
    subtitle: '2 times',
    icon: 'directions-run',
    type: 'daily'
  },
  {
    name: 'DEV Articles',
    subtitle: '30 min',
    icon: 'laptop',
    type: 'daily'
  },
];


export default function AddScreen(props) {
  console.log(props)

  return (
    <View style={{ flex: 1 }}>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      
      {/*
      <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
        <Slider
          value={0.8}
          // onValueChange={(value) => console.log(value)}
        />
        <Text>Value: 0.8</Text>
      </View>
      */}


      <View style={{ backgroundColor: '#ECEFF1', paddingVertical: 8 }}>
        {list2.map((l, i) => (
          <ListItem
            component={TouchableScale}
            friction={90}
            tension={100}
            activeScale={0.95}
            leftAvatar={{ rounded: true, icon: { name: l.icon, reverse: true } }}
            rightAvatar={{ rounded: true, icon: { name: 'settings', reverse: true } }}
            key={i}
            title={l.name}
            titleStyle={{ color: 'white', fontWeight: 'bold' }}
            subtitleStyle={{ color: 'white' }}
            subtitle={l.subtitle + ' | ' + l.type.toUpperCase() }
            // chevronColor="white"
            // chevron
            containerStyle={{
              marginHorizontal: 16,
              marginVertical: 8,
              borderRadius: 8,
              backgroundColor: '#58D6D0'
            }}
            // style={{ backgroundColor: '#555555'}}
          />
        ))}
      </View>



    </ScrollView>

      <View>
        <Button
          icon={{
            name: "add-box",
            size: 20,
            color: "white"
          }}
          title="Add Habit"
        />

      </View> 

      {/* https://stackoverflow.com/questions/29447715/react-native-fixed-footer */}
    </View>
  );
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fafafa',
    backgroundColor: '#ECEFF1'
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
  buttonStyle: {
    // backgroundColor: 'green',
    width: '50%',
    // height: 40
  },
});
