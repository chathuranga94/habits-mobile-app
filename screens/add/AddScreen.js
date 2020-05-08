import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

import CountdownTimer from '../../components/CountdownTimer'

export default function AddScreen(props) {
  console.log(props)

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>


      <View style={styles.optionTextContainer}>
        {/* <Text style={styles.optionText}>{props.num}</Text> */}
        <Text style={{ fontWeight: 'bold', fontSize: 40 }}>
          Num =
          <Text style={{ color: 'red' }}> {props.num}</Text>
        </Text>
      </View>



      <View style={{ flexDirection: "row" }}>
        <View style={styles.buttonStyle}>
          <Button
            onPress={() => props.decrement()}
            title="-"
            color="red"
          />
        </View>
        <View style={styles.buttonStyle}>
          <Button
            onPress={() => props.increment()}
            title="+"
            color="green"
          />
        </View>
      </View>

      <View style={styles.optionTextContainer}>
        <Button
          onPress={() => props.reset()}
          title="Reset!"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>



      {/* <CountdownTimer /> */}


      

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
    backgroundColor: '#fafafa',
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
