import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from 'react-native-gesture-handler';
import { Overlay, Button, Input, CheckBox, Card, Text, Icon, ListItem, Image } from 'react-native-elements';

import HabitManager from './manager'
import HABIT_CONSTANTS from './constants';

const types = HABIT_CONSTANTS.TYPES
const getProgressColour = HABIT_CONSTANTS.PROGRESS_COLOUR

const SCREEN_WIDTH = Dimensions.get('window').width;
const IMAGE_SIZE = SCREEN_WIDTH - 80;

export default function AddScreen(props) {
  const dispatch = useDispatch();

  const habitStore = useSelector(state => state.habits);
  const todayHabits = HabitManager.constructTodayProgress(habitStore.habits, habitStore.habitsHistory);
  console.log(todayHabits)
  const { habitId } = props.route.params;
  const habit = todayHabits.find(h => h.id === habitId)

  console.log(habit)

  const [completeness, setCompleteness] = useState(habit.completeness || 0.0);

  return (
    <View style={{ flex: 1 }}>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        {/*
        <Image
          source={{
            uri:
              'https://static.pexels.com/photos/428336/pexels-photo-428336.jpeg',
          }}
          style={{
            width: IMAGE_SIZE,
            height: IMAGE_SIZE,
            borderRadius: 10,
          }}
        />
        */}

        <Text h5="true" style={{ textAlign: 'center' }}>{`completeness ${completeness}`}</Text>

        <Text h5="true" style={{ textAlign: 'center' }}>{`Goal`}</Text>

        <Text h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>{habit.name}</Text>

        <Text h4 style={{ textAlign: 'center' }}>{`${habit.units} ${habit.type}`}</Text>


          {
            habit.type === types[0] &&
            <TimerView
              habit={habit}
              setCompleteness={setCompleteness}
            />
          }

          { 
            habit.type === types[1] &&
            <CheckBoxView
              habit={habit}
              setCompleteness={setCompleteness}
            />
          }



    </ScrollView>
      <View>
        {/* <Text style={{ textAlign: 'center', fontWeight: 'bold', marginVertical: 5 }}>
          Submit Progress!
        </Text> */}
        <Button
          icon={{
            name: "save",
            size: 20,
            color: "white",
            solid: true,
            brand: false,
          }}
          title="Save Progress"
          onPress={() => dispatch({
            type: HABIT_CONSTANTS.SAVE_HABIT_PROGRESS,
            payload: { completeness, habit: habit }
          })
          }
        />

      </View>

    </View>
  );
}


function CheckBoxView({ habit, setCompleteness }) {

  const chunkcedCheckboxes = () => {
    const goalUnits = habit.units;
    const completedUnits = habit.completedUnits;

    const initialArray = Array(goalUnits).fill(false)
    for (let i =0; i < completedUnits; i++) initialArray[i] = true

    const myArray = [];
    const size = 2;

    for (var i = 0; i < initialArray.length; i += size) {
      myArray.push(initialArray.slice(i, i + size));
    }
    return myArray;
  }

  const [checkboxes, setCheckboxes] = useState(chunkcedCheckboxes() || []);
  const [percentage, setPercentage] = useState(
    (habit.completedUnits && habit.units) ? habit.completedUnits/habit.units : 0.0);

  const clickCheckbox = ({ checked, x, y }) => {
    
    const updatedCheckboxes = [...checkboxes]
    updatedCheckboxes[x][y] = checked
    setCheckboxes(updatedCheckboxes)

    // const updatedUnits = checked ? completedUnits + 1 : completedUnits - 1;
    const updatedCompletedUnits = updatedCheckboxes.reduce((sum, row) =>{
      return sum + row.reduce((sum2, val) => sum2 + (val ? 1 : 0))
    }, 0)

    const goalUnits = habit.units;
    setPercentage(updatedCompletedUnits/goalUnits)

    setCompleteness(updatedCompletedUnits / goalUnits)
  }

  const progressValue = parseFloat(percentage * 100).toFixed(2)

  return (
    <Card
      title={`Completed: ${progressValue}%`}
      containerStyle={{ backgroundColor: getProgressColour(progressValue)}}
    >
      {
      checkboxes.map((chunk, chunkIndex) => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 10,
          }}
          key={chunkIndex}
        >
          {chunk.map((l, i) => (
            <CheckBox
              title={`1 out of ${habit.units}`}
              checked={l}
              onPress={() => clickCheckbox({ checked: !l, x: chunkIndex, y: i })}
            />
          ))}
        </View>
      ))
      }
    </Card>
  );
}

function TimerView({ habit, setCompleteness }) {

  return (
    <View>
      <Text h1
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          // width: IMAGE_SIZE,
          // height: IMAGE_SIZE,
          borderRadius: 10,
        }}
      >
        0h 20m 30s
            </Text>

      <Button
        icon={{
          name: "pause",
          size: 20,
          color: "white"
        }}
        title="Pause / Start"
        onPress={() => dispatch({
          type: HABIT_CONSTANTS.SAVE_HABIT,
          payload: {
            habit: {
              ...habit
            }
          }
        })
        }
      />
    </View>
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
