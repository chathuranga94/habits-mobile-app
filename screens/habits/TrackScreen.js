import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
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
  const { habitId } = props.route.params;
  const habit = todayHabits.find(h => h.id === habitId)

  const [completedUnits, setCompletedUnits] = useState(habit.completedUnits || 0);

  const completedFraction = (completedUnits && habit.units) ? completedUnits / habit.units : 0.0;
  const progressValue = parseFloat(completedFraction * 100).toFixed(2)

  console.log(props.navigation.state)
  console.log(props.navigation.dangerouslyGetState().routes)

  return (
    <View style={{ flex: 1 }}>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <Text h5="true" style={{ textAlign: 'center' }}>{`Goal`}</Text>
        <Text h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>{habit.name}</Text>
        <Text h4 style={{ textAlign: 'center' }}>{`${habit.units} ${habit.type}`}</Text>

        <Card
          title={`Completed: ${progressValue}%`}
          containerStyle={{ backgroundColor: getProgressColour(progressValue), borderRadius: 10 }}
        >
          {
            habit.type === types[0] &&
            <TimerView
              habit={habit}
              setCompletedUnits={setCompletedUnits}
            />
          }

          {
            habit.type === types[1] &&
            <CheckBoxView
              habit={habit}
              setCompletedUnits={setCompletedUnits}
            />
          }

        </Card>

    </ScrollView>
      <View>
        <Button
          icon={{
            name: "save",
            size: 20,
            color: "white",
            solid: true,
            brand: false,
          }}
          title="Save Progress"
          onPress={() => {
            dispatch({
              type: HABIT_CONSTANTS.SAVE_HABIT_PROGRESS,
              payload: { completedUnits, habit: habit }
            })
            // props.navigation.navigate('Root', { isEdit: true })
            // TODO BIBI: PASS NOTIFICATION AS PARAMS TO HOME SCREEN
            props.navigation.goBack()
          }}
        />

      </View>

    </View>
  );
}

function CheckBoxView({ habit, setCompletedUnits }) {

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

  const [checkboxes, setCheckboxes] = useState(chunkcedCheckboxes());

  const clickCheckbox = ({ checked, x, y }) => {
    
    const updatedCheckboxes = [...checkboxes]
    updatedCheckboxes[x][y] = checked
    setCheckboxes(updatedCheckboxes)

    const updatedCompletedUnits = updatedCheckboxes.reduce((sum, row) =>{
      return sum + row.reduce((sum2, val) => sum2 + (val ? 1 : 0))
    }, 0)

    setCompletedUnits(updatedCompletedUnits)
  }

  return (
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
  );
}

function TimerView({ habit, setCompletedUnits }) {

  const { units, completedUnits } = habit;
  const remainingSeconds = (completedUnits ? units - completedUnits : units) * 60;

  const [seconds, setSeconds] = useState(remainingSeconds);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    // Reset to full minutes if its complete.
    const isHabitComplete = completedUnits === units;

    setCompletedUnits(isHabitComplete ? 0 : completedUnits)
    setSeconds(isHabitComplete ? units*60 : remainingSeconds);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => {

          const currentCompletedUnits = Math.floor(units - seconds / 60)
          if (currentCompletedUnits !== completedUnits) setCompletedUnits(currentCompletedUnits)

          return seconds - 1;
        });
      }, 1000);

      if (seconds === 0) {
        setCompletedUnits(units)
        clearInterval(interval)
      }
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const calculateTime = (sec) => {
    const hours = Math.floor(sec/3600)
    const remaining = sec%3600

    const mins = Math.floor(remaining/60)
    const seconds = remaining%60

    return `${hours}h ${mins}m ${seconds}s`
  }

  return (
    <View>
      <Text h1
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          borderRadius: 10,
        }}
      >
        {calculateTime(seconds)}
      </Text>

      <Button
        icon={{ name: isActive ? 'pause' : 'play-arrow', size: 20, color: "white" }}
        containerStyle={{ marginVertical: 10 }}
        title={isActive ? 'Pause' : 'Start'}
        onPress={() => toggle()}
      />
      <Button
        icon={{ name: "undo", size: 20, color: "white" }}
        containerStyle={{ marginVertical: 10 }}
        title="Reset"
        onPress={() => reset()}
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
