import Icon from 'react-native-vector-icons/Ionicons'
import React from 'react'

const LogoMenu = ({navigation}) => {
    return (
        <Icon style={{marginRight: 10}} name="menu" color={'black'} size={24} onPress={() => navigation.toggleDrawer()}/>
    )
}

export const ArrowBack = ({navigation, to}) => {
    return (
        <Icon style={{marginRight: 10}} name="arrow-back-circle-outline" color={'black'} size={24} onPress={() => navigation.navigate(`${to}`)}/>
    )
}

export default LogoMenu