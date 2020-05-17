import * as React from 'react';
import { useSelector } from "react-redux";
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TouchableScale from 'react-native-touchable-scale';
import { ListItem } from 'react-native-elements';
import TodoManager from './manager'

export default function HabitsProgressScreen(props) {


  const todoStore = useSelector(state => state.todo);
  const todayTodos = TodoManager.constructTodayProgress(todoStore.todos, [])

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

      <View style={{ backgroundColor: '#ECEFF1', paddingVertical: 8 }}>
        {todayTodos.map((l, i) => (
          <ListItem
            component={TouchableScale}
            friction={90}
            tension={100}
            activeScale={0.95}
            checkBox={{checked: l.completed, checkedColor:"white", uncheckedColor: "white"}}
            leftAvatar={{ rounded: true, icon: { name:  "book", reverse: true } }}
            // rightAvatar={{ rounded: true, icon: { name: l.completedIcon, reverse: true } }}
            key={i}
            title={l.name}
            titleStyle={{ color: 'white', fontWeight: 'bold' }}
            subtitleStyle={{ color: 'white' }}
            subtitle={l.topic}
            // chevronColor="white"
            // chevron
            containerStyle={{
              marginHorizontal: 16,
              marginVertical: 8,
              borderRadius: 8,
              backgroundColor: l.color
            }}
            // onPress={() => props.navigation.navigate('trackHabit', { habitId: l.id })}
          />
        ))}
      </View>  

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECEFF1'
  },
  contentContainer: {
    paddingTop: 15,
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
    width: '50%',
  },
});
