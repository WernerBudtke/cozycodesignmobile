import { NavigationContainer } from '@react-navigation/native';
import React  from 'react';
import { LogBox } from 'react-native';
import Navigator from './navigation/MainNavDrawer';
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import rootReducers from './redux/reducers/rootReducers'

LogBox.ignoreAllLogs(true)
const store = createStore(rootReducers, applyMiddleware(thunk))

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </Provider>
  )
}

export default App
