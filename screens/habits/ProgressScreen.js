import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import TouchableScale from 'react-native-touchable-scale';
import { ListItem, Slider } from 'react-native-elements';

// const LinearGradient = undefined;
const list2 = [
  {
    name: 'Read',
    subtitle: '20min',
    icon: 'home',
    // avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    // linearGradientColors: ['#FF9800', '#F44336'],
    completed: 1,
    completedIcon: 'done'
  },
  {
    name: 'Spanish',
    subtitle: '15min',
    icon: 'language',
    completed: 0,
    completedIcon: 'play-arrow'
  },
  {
    name: 'HIIT Exercise',
    subtitle: '2 times',
    icon: 'directions-run',
    completed: 0.5,
    completedIcon: 'pause-circle-outline',
  },
  {
    name: 'DEV Articles',
    subtitle: '30 min',
    icon: 'laptop',
    completed: 1,
    completedIcon: 'done'
  },
];


export default function AddScreen(props) {
  console.log(props)

  return (
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
            rightAvatar={{ rounded: true, icon: { name: l.completedIcon, reverse: true } }}
            key={i}
            title={l.name}
            titleStyle={{ color: 'white', fontWeight: 'bold' }}
            subtitleStyle={{ color: 'white' }}
            subtitle={l.subtitle}
            chevronColor="white"
            chevron
            containerStyle={{
              marginHorizontal: 16,
              marginVertical: 8,
              borderRadius: 8,
              backgroundColor: l.completed === 1 ? '#58D68D' : (l.completed === 0) ? '#E74C3C' : '#F1C40F'
            }}
            // style={{ backgroundColor: '#555555'}}
          />
        ))}
      </View>  

    </ScrollView>
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
