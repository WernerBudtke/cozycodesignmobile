import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'
import Home from '../screens/Home'
import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'
import LogoMenu, { ArrowBack } from '../components/LogoMenu'
import ProductsGallery from '../screens/ProductsGallery'
import Product from '../screens/Product'
import Cart from '../screens/Cart'

const Stack = createNativeStackNavigator()

export const NavigatorHome = (props) => {
    return (
        <Stack.Navigator>
            <Stack.Screen navigation={props.navigation} name='Home' component={Home} options={{title: 'COZY', headerShown: false}} />
        </Stack.Navigator>
    )
}

export const NavigatorProductGallery = (props) => {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: "#e3cebc",
            },
            headerTintColor: "black",
            headerTitleStyle: {
               fontSize: 24,
               color: 'black'
            },
            headerRight: () => <LogoMenu navigation={props.navigation} />
         }}>
            <Stack.Screen name='Gallery' component={ProductsGallery} options={{title: 'Gallery', headerLeft: () => <ArrowBack navigation={props.navigation} to={'Home'}/>}} />
            <Stack.Screen name='Product' component={Product} options={{title: 'Product', headerLeft: () => <ArrowBack navigation={props.navigation} to={'Gallery'}/>}} />
            {/* Aca irían las screens que te llevan al componente dinamico de cada producto */}
        </Stack.Navigator>
    )
}

export const NavigatorSignIn = (props) => {
    return (
        <Stack.Navigator navigation={props.navigation} screenOptions={{
            headerStyle: {
                backgroundColor: "#e3cebc",
            },
            headerTintColor: "black",
            headerTitleStyle: {
               fontSize: 24,
               color: 'black'
            },
            headerRight: () => <LogoMenu navigation={props.navigation} />
        }}>
            <Stack.Screen name='LogIn' component={SignIn} options={{title: 'Sign In', headerLeft: () => <ArrowBack navigation={props.navigation} to={'Home'}/>}} />
        </Stack.Navigator>
    )
}

export const NavigatorSignUp = (props) => {
    return (
        <Stack.Navigator navigation={props.navigation} screenOptions={{
            headerStyle: {
                backgroundColor: "#e3cebc",
            },
            headerTintColor: "black",
            headerTitleStyle: {
               fontSize: 24,
               color: 'black'
            },
            headerRight: () => <LogoMenu navigation={props.navigation} />
         }}>
            <Stack.Screen name='SignUp' component={SignUp} options={{title: 'Sign Up', headerLeft: () => <ArrowBack navigation={props.navigation} to={'Home'}/>}} />
        </Stack.Navigator>
    )
}

export const NavigatorCart = (props) => {
    return (
        <Stack.Navigator navigation={props.navigation} screenOptions={{
            headerStyle: {
                backgroundColor: "#e3cebc",
            },
            headerTintColor: "black",
            headerTitleStyle: {
               fontSize: 24,
               color: 'black'
            },
            headerRight: () => <LogoMenu navigation={props.navigation} />
         }}>
            <Stack.Screen name='Cart' component={Cart} options={{title: 'Cart', headerLeft: () => <ArrowBack navigation={props.navigation} to={'Home'}/>}} />
        </Stack.Navigator>
    )
}