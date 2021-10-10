import React from "react";
import {createDrawerNavigator} from '@react-navigation/drawer'
import {  NavigatorHome, NavigatorSignIn, NavigatorSignUp, NavigatorProductGallery } from './MainNavStack'
import DrawerStyle from '../components/DrawerStyle'

const Drawer = createDrawerNavigator()

const Navigator = (props) => {
    return (
        <Drawer.Navigator drawerContent={props =><DrawerStyle {...props} />} screenOptions={{headerStyle: {
            backgroundColor: '#e3cebc'
        }, headerTitleStyle: {
            color: 'black'
        }, }}>
            <Drawer.Screen name='Home' component={NavigatorHome} />
            <Drawer.Screen name='Gallery' component={NavigatorProductGallery} options={{headerShown: false}} />
            <Drawer.Screen name='Cart' component={NavigatorProductGallery} options={{headerShown: false}} />
            <Drawer.Screen name='LogIn' component={NavigatorSignIn} options={{headerShown: false}} />
            <Drawer.Screen name='SignUp' component={NavigatorSignUp} options={{headerShown: false}} />
        </Drawer.Navigator>
    )
}

export default Navigator