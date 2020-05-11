import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import TouchableScale from 'react-native-touchable-scale';
import { Overlay, Button, Input, ButtonGroup, Card, Text, Icon, ListItem } from 'react-native-elements';

import HABIT_CONSTANTS from './constants';

const types = HABIT_CONSTANTS.TYPES
const frequencies = HABIT_CONSTANTS.FREQUENCIES
const weekDays = HABIT_CONSTANTS.WEEK_DAYS
const monthDays = HABIT_CONSTANTS.MONTH_DAYS

export default function AddScreen(props) {
  const dispatch = useDispatch();
  const habitStore = useSelector(state => state.habits);
  const { isEdit, habitId } = props.route.params;

  console.log(`Rendering EditScreen for HabitId: ${habitId} and Edit: ${isEdit}`);
  let habit = null;
  if (isEdit) {
    habit = habitStore.habits.find(habit => habit.id === habitId)
  }

  const [visible, setVisible] = useState(false);

  const [name, setName] = useState(isEdit ? habit.name : '');
  const [units, setUnits] = useState(isEdit ? habit.units :null); 
  const [type, setType] = useState(isEdit ? (habit.type === types[0] ? 0 : 1 ): 0);
  const [frequency, setFrequency] = useState(isEdit ? (habit.frequency === frequencies[0] ? 0 : 1) : 0);
  const [start, setStart] = useState(1);


  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const constructFrequency = (frequency, start) => {
    if (frequency === 0) {
      return '';
    } else if (frequency === 1) {
      return 'on ' + weekDays[start];
    } else if (frequency === 2) {
      return 'on ' + monthDays(start); 
    } else {
      return '';
    }
  }

  return (
    <View style={{ flex: 1 }}>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <Input
          placeholder='Eg: Read a book.'
          label='Name'
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
          label='Units'
          leftIcon={{ name: 'av-timer' }}
          value={units.toString()}
          onChangeText={value => setUnits(isNaN(parseInt(value)) ? 0 : parseInt(value))} // TODO: Only numeric numbers
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

        { (frequency === 1) &&
          <ButtonGroup
            onPress={(value) => setStart(value)}
            selectedIndex={start}
            buttons={weekDays}
            containerStyle={{ height: 20 }}
          />
        }
        {(frequency === 2) &&
          <View style={{ flexDirection: "row", flexWrap: 'wrap' }}>
            <Button
              title="-"
              buttonStyle={{height: 20}}
              disabled={start <= 1}
              onPress={() => setStart(start - 1)}
            />
            <Text>{start}</Text>
            <Button
              title="+"
              buttonStyle={{height: 20}}
              disabled={start >= 31}
              onPress={() => setStart(start + 1)}
            />
          </View>
        }

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
          subtitle={`${(units || '0')} ${(types[type || 0])} | ` +
            `${(frequencies[frequency || 0])} ${constructFrequency(frequency, start)}`}
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
          onPress={() => dispatch({
            type: HABIT_CONSTANTS.SAVE_HABIT,
            payload: {
              isEdit,
              habit: { ...habit, name, units,
                type: type === 0 ? types[0] : types[1],
                frequency: frequency === 0 ? frequencies[0] : frequencies[1], // TODO HERE?
                start: frequency !== 0 ? start : null,
              }
      }
    })
    }
  />

        {isEdit &&
        <Button
          icon={{
            name: "delete",
            size: 20,
            color: "white"
          }}
          title="Delete Habit"
          onPress={() => dispatch({ type: HABIT_CONSTANTS.DELETE_HABIT, payload: { habitId: habit.id } })
          }
        />}

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
