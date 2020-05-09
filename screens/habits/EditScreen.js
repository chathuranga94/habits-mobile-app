import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import TouchableScale from 'react-native-touchable-scale';
import { Overlay, Button, Input, ButtonGroup, Card, Text, Icon, ListItem } from 'react-native-elements';

const types = ['Minutes', 'Times']
const frequencies = ['Daily', 'Weekly', 'Monthly']


export default function AddScreen(props) {
  const [visible, setVisible] = useState(false);

  const [name, setName] = useState(''); // HANDLE EDIT FLOW!
  const [units, setUnits] = useState(null); 
  const [type, setType] = useState(0);
  const [frequency, setFrequency] = useState(0);

  const dispatch = useDispatch();
  const counter = useSelector(state => state);



  const toggleOverlay = () => {
    setVisible(!visible);
  };

  console.log(`name : ${name}`)
  console.log(counter)



  return (
    <View style={{ flex: 1 }}>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <Input
          placeholder='Eg: Read a book.'
          label='Habit Name'
          leftIcon={{ name: 'text-format' }}
          value={name}
          onChangeText={value => setName(value)}

          // leftIcon={{ type: 'font-awesome', name: 'stopwatch' }}

          // leftIcon={
          //   <Icon name='user' size={24} color='black' />
          // }
        />

        <Input
          placeholder='Eg: 20 (minutes, daily)' // TODO: Placeholder by default not number 0
          label='Habit Units'
          leftIcon={{ name: 'av-timer' }}
          value={units}
          onChangeText={value => setUnits(value)} // TODO: Only numeric numbers
        />

        <ButtonGroup
          onPress={(value) => setType(value)}
          selectedIndex={type}
          buttons={types}
          containerStyle={{ height: 40 }}
        />

        <ButtonGroup
          onPress={(value) => setFrequency(value)}
          selectedIndex={frequency}
          buttons={frequencies}
          containerStyle={{ height: 40 }}
        />

        {/*
        <Input
          disabled
          placeholder='Remainder'
          leftIcon={{ name: 'av-timer' }}
        />
        */}

        {/* <Button title="Select Icon" onPress={toggleOverlay} /> */}

    </ScrollView>

      <View>
        {/*
        <Card title='Review Habit!'>
          <Text style={{ marginBottom: 10 }}>
            The idea with React Native.
          </Text>
          <Button
            icon={{
              name: "save",
              size: 20,
              color: "white"
            }}
            title="Save Habit"
          />
        </Card>
        */}



        <Text style={{ textAlign: 'center', fontWeight: 'bold', marginVertical: 5 }}>
          Review Habit!
        </Text>
        <ListItem
          component={TouchableScale}
          friction={90}
          tension={100}
          activeScale={0.95}
          key={0}
          title={name || 'Name Undefined'}
          titleStyle={{ color: 'white', fontWeight: 'bold' }}
          subtitleStyle={{ color: 'white' }}
          subtitle={
            (units || '0') + ' ' + (types[type || 0])
            + ' | ' +
            (frequencies[frequency || 0])}
          leftAvatar={{ rounded: true, icon: { name: 'home', reverse: true } }}
          containerStyle={{
            marginHorizontal: 16,
            marginVertical: 8,
            borderRadius: 8,
            backgroundColor: '#2089dc'
          }}
        />
        <Button
          icon={{
            name: "save",
            size: 20,
            color: "white"
          }}
          title="Save Habit"
          onPress={() => dispatch({ type: "SAVE_HABIT" })
          }
        />

      </View>


      {/*
      <View>
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <Text>Hello from Overlay!</Text>
        </Overlay>
      </View>
      */}

    </View>
  );
}

function EditFooter({ icon, label, onPress, isLastOption }) {
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
    backgroundColor: '#ECEFF1',
    // paddingVertical: 8
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
