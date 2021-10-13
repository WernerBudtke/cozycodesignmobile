import React from 'react'
import { View, StyleSheet, ImageBackground, Image, Text } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'

function DrawerStyle({user, logOut, navigation, props}) {
  console.log(user)
    return(
      <View style={styles.mainView}>
        <ImageBackground source={{uri: 'https://i.imgur.com/ZFwIqq5.jpg'}} style={styles.drawerHeader}>
          <Text style={styles.title}>{!user ? 'Welcome to COZY.' : 'Welcome, ' + user.firstName + ' '}</Text>
        </ImageBackground>
        <DrawerContentScrollView {...props}>
          <View style={styles.drawerContent}>
            <View>
              <DrawerItem icon={({ color, size }) => ( <Icon name="home-outline" color={color} size={size} /> )} label="Home" onPress={() => {navigation.navigate('Home') }} />
              <DrawerItem icon={({ color, size }) => ( <Icon name="book-outline" color={color} size={size} /> )} label="Gallery" onPress={() => {navigation.navigate('Gallery') }} />
              <DrawerItem icon={({ color, size }) => ( <Icon name="cart-outline" color={color} size={size} /> )} label="Cart" onPress={() => {navigation.navigate('Cart') }} />
              {!user
                ? <>
                    <DrawerItem icon={({ color, size }) => ( <Icon name="log-in-outline" color={color} size={size} /> )} label="Sign In" onPress={() => { navigation.navigate('LogIn') }} />
                    <DrawerItem icon={({ color, size }) => ( <Icon name="person-add-outline" color={color} size={size} /> )} label="Sign Up" onPress={() => { navigation.navigate('SignUp') }} />
                  </>
                : <DrawerItem icon={({ color, size }) => (<Icon name="log-out-outline" color={color} size={size} />)} label="Log Out" onPress={() => logOut()} />
              }
            </View>
          </View>
        </DrawerContentScrollView>
        {user && 
          <View style={styles.userImageContainer}>
            {!user.native ? <Image style={styles.userImage} source={{ uri: `${user.photo}` }} /> :
             <ImageBackground style={{backgroundColor: user.photoNativeColor, width: 100, height: 100, borderRadius: 50, display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Text style={{color: 'white', fontSize: 40, fontFamily: 'Cormorant'}}>{user.firstName.charAt(0).toUpperCase()}</Text></ImageBackground>}
            <Text>Logged as, {user.firstName}</Text>
          </View>}
      </View>
  )
}

const styles = StyleSheet.create({
    mainView: {
      flex: 1,
      display: 'flex',
      justifyContent: 'space-between',
    },
    drawerContent: {
      display: 'flex',
      justifyContent: 'space-between',
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 20,
      color: 'white',
      marginBottom: 10,
      marginLeft: 10
    },
    userImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginVertical: 10
    },
    userImageContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginVertical: 10,
    },
    drawerHeader: {
      height: 230,
      width: 280,
      justifyContent: 'flex-end'
    }
})

const mapStateToProps = (state) => {
  return {
    user: state.users.user
  }
}

const mapDispatchToProps = {
  logOut: userActions.logOut
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerStyle)