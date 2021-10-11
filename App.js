import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import Navigator from './navigation/MainNavDrawer';
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import rootReducers from './redux/reducers/rootReducers'

const store = createStore(rootReducers, applyMiddleware(thunk))

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
      <Product/>
    </Provider>
  );
}


