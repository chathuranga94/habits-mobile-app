import AsyncStorage from '@react-native-community/async-storage';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist';
import { Platform } from 'react-native';
// import { createLogger } from 'redux-logger';

import todoReducer from './todo/reducer'
import habitsReducer from './habits/reducer';

console.log(`(Platform.OS === "web")  ${(Platform.OS === "web")}`)
// Middleware: Redux Persist Config
const persistConfig = {
    key: 'root', // Root
    storage: (Platform.OS === "web") ? storage : AsyncStorage, // Storage Method (React Native)
    // whitelist: [ 'authReducer', ], // Whitelist (Save Specific Reducers)
    // blacklist: [ 'counterReducer', ], // Blacklist (Don't Save Specific Reducers)
  };

const appReducer = combineReducers({
    todo: todoReducer,
    habits: habitsReducer,
});


const rootReducer = (state, action) => {
    console.log(action)
    if (action.type === 'CLEAR_STORE') {
      state = undefined;
      // _persist: state._persist
      // Clear HABITS only -> https://github.com/rt2zz/redux-persist/issues/748
    }
  
    return appReducer(state, action);
  };

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    applyMiddleware(
        ReduxThunk
        // createLogger(),
    ),
    // autoRehydrate
);

let persistor = persistStore(store);

/*
You can use the functions persistor.flush() to enforce writing the latest redux data to local storage,
or persistor.purge() to clear the local storage (note that it leaves the redux data intact).
https://github.com/rt2zz/redux-persist/issues/667

import { PURGE, REHYDRATE } from 'redux-persist';
reducer -> REHYDRATE: return state      PURGE: return {}
dispatch({ ype: PURGE, key: "myStorageKey",
https://github.com/rt2zz/redux-persist/issues/579

import { purgeStoredState } from 'redux-persist'
import { persistStore } from 'redux-persist';
persistStore(this.props).purge();
*/

export {
    store,
    persistor,
};
