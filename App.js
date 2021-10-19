import { NavigationContainer } from "@react-navigation/native"
import React from "react"
import { LogBox } from "react-native"
import Navigator from "./navigation/MainNavDrawer"
import { applyMiddleware, createStore } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import rootReducers from "./redux/reducers/rootReducers"
import { AppLoading } from "expo-app-loading"
import {
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto"
import { useFonts } from "expo-font"
import {
  Cormorant_400Regular,
  Cormorant_700Bold,
} from "@expo-google-fonts/cormorant"

LogBox.ignoreAllLogs(true)
const store = createStore(rootReducers, applyMiddleware(thunk))

const App = () => {
  let [fontsLoaded] = useFonts({
    Cormorant_400Regular,
    Cormorant_700Bold,
    Roboto_700Bold,
    Roboto_400Regular,
    Roboto_500Medium,
  })

  if (!fontsLoaded) {
    return null
  } 
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </Provider>
  )
}

export default App
