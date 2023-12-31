import React, { useState } from 'react';
import { StyleSheet, Platform, View } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from 'react-native-gesture-handler';
import TouchableScale from 'react-native-touchable-scale';
import { Overlay, Button, Input, ButtonGroup, Text, ListItem } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

import HABIT_CONSTANTS from './constants';
import { LineBreak } from '../../components'

const types = HABIT_CONSTANTS.TYPES
const frequencies = HABIT_CONSTANTS.FREQUENCIES
const weekDays = HABIT_CONSTANTS.WEEK_DAYS
const monthDays = HABIT_CONSTANTS.MONTH_DAYS
const icons = HABIT_CONSTANTS.ICONS

export default function HabitEditScreen(props) {
  const dispatch = useDispatch();
  const habitStore = useSelector(state => state.habits);
  const { isEdit, habitId } = props.route.params;
  console.log(`Rendering EditScreen for HabitId: ${habitId} and Edit: ${isEdit}`);

  let habit = null;
  if (isEdit) {
    habit = habitStore.habits.find(habit => habit.id === habitId)
  }

  const [name, setName] = useState(isEdit ? habit.name : '');
  const [units, setUnits] = useState(isEdit ? habit.units : null);
  const [type, setType] = useState(isEdit ? (habit.type === types[0] ? 0 : 1) : 0);
  const [frequency, setFrequency] = useState(isEdit ? (habit.frequency === frequencies[0] ? 0 : 1) : 0);
  const [start, setStart] = useState(1);
  const [icon, setIcon] = useState(isEdit ? habit.icon : icons[0]);
  

  const reminderConfigured = habit && habit.reminderTime && habit.reminderTime !== '';
  const currentTime = new Date()
  if (reminderConfigured) {
    currentTime.setHours(habit.reminderTime.split(':')[0])
    currentTime.setMinutes(habit.reminderTime.split(':')[1])
  }
  const [enableReminder, setEnableRemainder] = useState(reminderConfigured);
  const [reminderTime, setReminderTime] = useState(currentTime.getTime());

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <Input
          placeholder='Eg: Read a book.'
          label='Name'
          leftIcon={{ name: 'text-format' }}
          value={name}
          onChangeText={value => setName(value)}
        />

        <Input
          placeholder='Eg: 20 (minutes, daily)'
          label='Units'
          leftIcon={{ name: 'av-timer' }}
          value={units ? units.toString() : ''}
          onChangeText={value => setUnits(isNaN(parseInt(value)) ? 0 : parseInt(value))}
        />

        <ButtonGroup
          onPress={(value) => setType(value)}
          selectedIndex={type}
          buttons={types}
          containerStyle={{ height: 40 }}
        />

        <ButtonGroup
          onPress={(value) => { setFrequency(value); setStart(1); }}
          selectedIndex={frequency}
          buttons={frequencies}
          containerStyle={{ height: 40 }}
        />

        {(frequency === 1) &&
          <ButtonGroup
            onPress={(value) => setStart(value)}
            selectedIndex={start}
            buttons={weekDays}
            containerStyle={{ height: 30 }}
          />
        }

        {(frequency === 2) &&
          <ButtonGroup
            onPress={(value) => {
              if (value === 0 && start > 1) setStart(start - 1);
              if (value === 2 && start < 31) setStart(start + 1);
            }}
            disabled={[1]}
            buttons={["-" , start, "+"]}
            containerStyle={{ height: 30 }}
          />
        }

        <ReminderTime enableReminder={enableReminder} setEnableRemainder={setEnableRemainder}
          reminderTime={reminderTime} setReminderTime={setReminderTime} />

        <OverlayIcon icon={icon} setIcon={setIcon} />

      </ScrollView>

      <View>
        <Text style={{ textAlign: 'center', fontWeight: 'bold', marginVertical: 5 }}>
          Review Habit!
        </Text>
        <HabitReviewCard name={name} units={units} type={type} icon={icon} frequency={frequency} start={start} />

        {isEdit &&
          <DeleteHabitButton habit={habit} dispatch={dispatch} />
        }

        <SaveHabitButton habit={habit} name={name} units={units} type={type} icon={icon} isEdit={isEdit} dispatch={dispatch}
          frequency={frequency} start={start} enableReminder={enableReminder} reminderTime={reminderTime}  />

      </View>

    </View>
  );
}

function ReminderTime({ reminderTime, setReminderTime, enableReminder, setEnableRemainder }) {
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || reminderTime;
    setShow(Platform.OS === 'ios');
    setReminderTime(currentDate);
  };

  return(
    <View>
      <ListItem
        title="Reminder"
        leftIcon={{ name: 'access-alarm' }}
        switch={{ value: enableReminder, onValueChange: (value) => setEnableRemainder(value) }}
        bottomDivider
        containerStyle={{ marginHorizontal: 10 }}
      />
      {(enableReminder) && (
        (Platform.OS === "web") ?
          <ListItem
            title="implement alarm time in webview"
            chevron={{ color: 'pink' }}
            containerStyle={{ marginHorizontal: 10 }}
          /> :
          <Button
            onPress={() => setShow(true)}
            title={`Time: ${new Date(reminderTime).getHours()}: ${new Date(reminderTime).getMinutes()}`}
            containerStyle={{ marginHorizontal: 10 }}
          />
      )}

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={reminderTime}
          mode={'time'}
          is24Hour={false}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  )
}

function OverlayIcon({ icon, setIcon }) {
  const [visible, setVisible] = useState(false);

  const myArray = [];
  const size = 5;
  const iconsSet = [ ...icons ]

  const emptyTiles = size - iconsSet.length % size;
  for (let i = 0; i < emptyTiles; i++) iconsSet.push('-1')
  for (var i = 0; i < iconsSet.length; i += size) myArray.push(iconsSet.slice(i, i + size));

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const constructIconButtons = (arr, setIcon, setVisible) => arr.map(iconName => {
    const iconButton = () => <Button
      icon={{ name: iconName }} type="clear" transparent={true}
        onPress={() => { setIcon(iconName); setVisible(false) }}
    />

    const emptyText = () => <Text />

    return { element: iconName === '-1' ? emptyText : iconButton }
  });

  const constructIconButtonGroups = (setIcon, setVisible) => myArray.map((arr, index) =>
    <ButtonGroup
      buttons={constructIconButtons(arr, setIcon, setVisible)}
      key={index}
      containerStyle={{ height: 60, marginTop: 0, marginBottom: 0 }}
    />
  );

  // Overlay -> not implemented yet in react-native-web
  return (
    <View>
      <LineBreak />
      <Button type="solid" icon={{ name: icon, color: "white" }} iconRight={true}
        title="Icon:" onPress={toggleOverlay} containerStyle={{ marginHorizontal: 10 }} />

        {
          Platform.OS === "web" ? constructIconButtonGroups(setIcon, setVisible) :
          <Overlay overlayStyle={{ width: '80%' }} isVisible={visible} onBackdropPress={toggleOverlay}>
            <Text>Please select an icon!</Text>
            {constructIconButtonGroups(setIcon, setVisible)}
          </Overlay>
        }
      <LineBreak />
    </View>
  );
}

function DeleteHabitButton({ habit, dispatch }) {
  return (
    <Button
      icon={{
        name: "delete",
        size: 20,
        color: "white"
      }}
      buttonStyle={{ backgroundColor: 'rgba(255, 0, 0, 0.8)', marginBottom: 10 }}
      title="Delete Habit"
      onPress={() => dispatch({ type: HABIT_CONSTANTS.DELETE_HABIT, payload: { habitId: habit.id } })
      }
    />
  );
}

function SaveHabitButton({ habit, name, units, type, icon, frequency, start, isEdit, dispatch, enableReminder, reminderTime }) {
  return (
    <Button
      icon={{
        name: "save",
        size: 20,
        color: "white"
      }}
      buttonStyle={{ backgroundColor: 'rgba(0, 255, 0, 0.8)' }}
      title="Save Habit"
      onPress={() => dispatch({
        type: HABIT_CONSTANTS.SAVE_HABIT,
        payload: {
          isEdit,
          habit: {
            ...habit, name, units, icon,
            type: type === 0 ? types[0] : types[1],
            frequency: frequency === 0 ? frequencies[0] :
              frequency === 1 ? frequencies[1] : frequencies[2],
            start: frequency !== 0 ? start : null,
            reminderTime: enableReminder ? `${new Date(reminderTime).getHours()}:${new Date(reminderTime).getMinutes()}` : ''
          }
        }
      })}
    />
  );
}

function HabitReviewCard({ name, units, type, icon, frequency, start }) {
  const constructFrequency = (frequency, start) => {
    if (frequency === 0) {
      return '';
    } else if (frequency === 1) {
      return 'on every ' + weekDays[start];
    } else if (frequency === 2) {
      return 'on every ' + monthDays(start);
    } else {
      return '';
    }
  }

  return (
    <ListItem
      component={TouchableScale}
      friction={90}
      tension={100}
      activeScale={0.95}
      key={0}
      title={name || 'Please enter a name'}
      titleStyle={{ color: 'white', fontWeight: 'bold' }}
      subtitleStyle={{ color: 'white' }}
      subtitle={`${(units || '0')} ${(types[type || 0])} | ` +
        `${(frequencies[frequency || 0])} ${constructFrequency(frequency, start)}`}
      leftAvatar={{ rounded: true, icon: { name: icon, reverse: true } }}
      containerStyle={{
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 8,
        backgroundColor: '#58D6D0'
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECEFF1',
  },
  contentContainer: {
    paddingTop: 15,
  },
  buttonStyle: {
    width: '50%',
  },
});
