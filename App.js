import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Product from './Product';
import { applyMiddleware, createStore } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import rootReducers from "./redux/reducers/rootReducers"

const masterStore = createStore(rootReducers, applyMiddleware(thunk))

export default function App() {
  return (
    <Provider store={masterStore}>
    <Product />
  </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
