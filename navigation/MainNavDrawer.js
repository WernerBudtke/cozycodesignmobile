import React, { useEffect } from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import {
  NavigatorHome,
  NavigatorSignIn,
  NavigatorSignUp,
  NavigatorProductGallery,
  NavigatorCart,
  NavigatorPayment,
} from "./MainNavStack"
import DrawerStyle from "../components/DrawerStyle"
import { connect } from "react-redux"
import userActions from "../redux/actions/userActions"
import cartActions from "../redux/actions/cartActions"
import AsyncStorage from "@react-native-async-storage/async-storage"

const Drawer = createDrawerNavigator()

const Navigator = ({ logFromSession, addCartLS, loginUser }) => {
  useEffect(() => {
    !loginUser && logFromSession()
    const addCart = async () => {
      addCartLS(JSON.parse(await AsyncStorage.getItem("cart")))
    }
    let getItemFromLS = null
    const getFromLS = async () => {
      getItemFromLS = await AsyncStorage.getItem("cart")
      getItemFromLS && addCart()
    }
    getFromLS()
  }, [])
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerStyle {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: "#e3cebc",
        },
        headerTitleStyle: {
          color: "black",
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        options={{ title: "COZY", headerTitleStyle: {fontFamily: 'Cormorant_700Bold', fontSize: 30}}}
        component={NavigatorHome}
      />
      <Drawer.Screen
        name="Gallery"
        component={NavigatorProductGallery}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Cart"
        component={NavigatorCart}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="LogIn"
        component={NavigatorSignIn}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="SignUp"
        component={NavigatorSignUp}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Payment"
        component={NavigatorPayment}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  )
}

const mapStateToProps = (state) => {
  return {
    loginUser: state.users.user,
  }
}

const mapDispatchToProps = {
  logFromSession: userActions.logFromSession,
  addCartLS: cartActions.addCartLS,
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigator)
