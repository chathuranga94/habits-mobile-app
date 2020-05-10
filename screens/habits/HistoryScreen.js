import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from "react-redux";
import { ScrollView } from 'react-native-gesture-handler';
import { ButtonGroup, Text, ListItem } from 'react-native-elements';
import HabitManager from './manager'
import HABIT_CONSTANTS from './constants';

export default function AddScreen(props) {
  const habitStore = useSelector(state => state.habits);

  const timeConstraints = HabitManager.getTimeConstraints();
  const weekHabits = HabitManager.constructWeekProgress(habitStore.habits, habitStore.habitsHistory, timeConstraints);


  const week = timeConstraints.week;
  const weekOrder = week.map(day => day.split(' ')[0])

  const constructProgressTiles = (habit) => habit.weeklyCompletedUnits.map(completedUnits => {
    const completedPercentage = parseFloat(completedUnits * 100 / habit.units).toFixed(2)
    const color = HABIT_CONSTANTS.PROGRESS_COLOUR(completedPercentage)

    const component2 = () => <ListItem containerStyle={{ backgroundColor: color }}></ListItem>
    return { element: component2  }
  });

  const constructGuideTiles = () => [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(val => {
    const title = [0, 50, 100].includes(val) ? val : ''

    const component = () =>
      <ListItem title={title} containerStyle={{ backgroundColor: HABIT_CONSTANTS.PROGRESS_COLOUR(val) }}></ListItem>
    return { element: component }
  });

  return (
    <View style={{ flex: 1 }}>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <Text style={{ textAlign: 'center', fontWeight: 'bold', marginVertical: 5 }}>
          Habits Streak{"\n"}{week[0]} - {week[6]}
        </Text>

        <ButtonGroup
          buttons={weekOrder}
          disabled
          containerStyle={{ height: 40 }}
        />
        {weekHabits.map((habit, i) => (
          <View key={i}>
            <Text style={{ textAlign: 'left', fontWeight: 'bold', marginLeft: 10, marginVertical: 5 }}>
              {habit.name} ({habit.frequency} {habit.units} {habit.type })
            </Text>
            <ButtonGroup
              onPress={(value) => { }}
              selectedIndex={-1}
              underlayColor="transparent"
              containerStyle={{ backgroundColor: 'inherit' }}
              buttons={constructProgressTiles(habit)}
              disabled
              containerStyle={{ height: 40 }}
            />
          </View>
        ))}

        <Text style={{ textAlign: 'center', fontWeight: 'bold', marginVertical: 5 }}>
          Progress Guide (%)
        </Text>
        <ButtonGroup
          onPress={(value) => { }}
          selectedIndex={-1}
          underlayColor="transparent"
          containerStyle={{ backgroundColor: 'inherit' }}
          buttons={constructGuideTiles()}
          disabled
          containerStyle={{ height: 30 }}
        />

        {/*
        <View style={{ flex: 1, marginTop: 30, backgroundColor: 'rgba(255, 255, 0, 0.5)' }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 20,
              marginHorizontal: 30,
            }}
          >
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.infoTypeLabel}>Age</Text>
                <Text style={styles.infoTypeLabel}>Height</Text>
                <Text style={styles.infoTypeLabel}>Ethnicity</Text>
                <Text style={styles.infoTypeLabel}>Sign</Text>
                <Text style={styles.infoTypeLabel}>Religion</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Button title="25.0%" style={styles.infoAnswerLabel}>26</Button>
                <Button title="25.0%" style={styles.infoAnswerLabel}>5'4"</Button>
                <Button title="25.0%" style={styles.infoAnswerLabel}>White</Button>
                <Button title="25.0%" style={styles.infoAnswerLabel}>Pisces</Button>
                <Button title="25.0%" style={styles.infoAnswerLabel}>Catholic</Button>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.infoTypeLabel}>Body Type</Text>
                <Text style={styles.infoTypeLabel}>Diet</Text>
                <Text style={styles.infoTypeLabel}>Smoke</Text>
                <Text style={styles.infoTypeLabel}>Drink</Text>
                <Text style={styles.infoTypeLabel}>Drugs</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 10, marginRight: -20 }}>
                <Text style={styles.infoAnswerLabel}>Fit</Text>
                <Text style={styles.infoAnswerLabel}>Vegan</Text>
                <Text style={styles.infoAnswerLabel}>No</Text>
                <Text style={styles.infoAnswerLabel}>No</Text>
                <Text style={styles.infoAnswerLabel}>Never</Text>
              </View>
            </View>
          </View>
        </View>
        */}

    </ScrollView>
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
    // fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
  buttonStyle: {
    // backgroundColor: 'green',
    width: '50%',
    // height: 40
  },
  infoTypeLabel: {
    // fontSize: 15,
    textAlign: 'right',
    color: 'rgba(126,123,138,1)',
    fontFamily: 'regular',
    paddingBottom: 10,
  },
  infoAnswerLabel: {
    // fontSize: 15,
    color: 'red',
    fontFamily: 'regular',
    paddingBottom: 10,
  },
});
