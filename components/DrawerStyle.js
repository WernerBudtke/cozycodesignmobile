import React from 'react'
import { View, StyleSheet, ImageBackground, Image, Text } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'

function DrawerStyle({user, logOut, navigation, props}) {
    return(
      <View style={styles.mainView}>
        <ImageBackground source={{uri: 'https://i.imgur.com/ZFwIqq5.jpg'}} style={styles.drawerHeader}>
          <Text style={styles.title}>{!user ? 'Welcome to COZY.' : 'Welcome, ' + user.firstName}</Text>
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
            {user && 
              <View style={styles.userImageContainer}>
                <Image style={styles.userImage} source={{ uri: `${user.photo}` }} />
                <Text>Logged as, {user.eMail}</Text>
              </View>}
          </View>
        </DrawerContentScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    mainView: {
      flex: 1
    },
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 10,
      marginLeft: 10
    },
    userImage: {
      width: 150,
      height: 150,
      borderRadius: 100,
      marginVertical: 10
    },
    userImageContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
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