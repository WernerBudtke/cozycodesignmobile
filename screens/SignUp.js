import React, {useState} from 'react'
import { StyleSheet, Text, View, Dimensions, ImageBackground, TextInput, TouchableOpacity, Button, Pressable } from 'react-native'
import userActions from '../redux/actions/userActions'
import { connect } from 'react-redux'

const SignUp = ({signUp, navigation}) => {
    const [user, setUser] = useState({firstName: '', lastName: '', eMail: '', password: '', photo: 'c.png', admin: false, google: false, native: true})
    const [renderError, setRenderError] = useState({})
    const errorsInput = { firstName: null, lastName: null, eMail: null, password: null, emptyFields: null }

    const signup = async () => {
        if (Object.values(user).some((value) => value === "")) {
            setRenderError({ emptyFields: "There cannot be empty fields" })
          } else {
            const response = await signUp(user)
            if (response.success) {
              navigation.navigate("Home")
            } else {
                console.log(response)
              response.response.forEach((error) => {
                errorsInput[error.context.label] = error.message
              })
              setRenderError(errorsInput)
            }
          }
    }
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.image} source={{uri: 'https://i.imgur.com/jmu7dkR.jpg'}} >
                <View style={styles.content}>
                    <Text style={styles.text}>Sign Up</Text>
                    <View style={styles.form}>
                        <View style={{height: 17, marginBottom: 5}}>{renderError.firstName && (<Text style={styles.inputError}>{renderError.firstName}</Text>)}</View>
                        <TextInput placeholder="Firstname" style={styles.input} value={user.firstName} onChangeText={(value)=>setUser({...user, firstName: value})}/>
                        <View style={{height: 17, marginBottom: 5}}>{renderError.lastName && (<Text style={styles.inputError}>{renderError.lastName}</Text>)}</View>
                        <TextInput placeholder="Lastname" style={styles.input} value={user.lastName} onChangeText={(value)=>setUser({...user, lastName: value})}/>
                        <View style={{height: 17, marginBottom: 5}}>{renderError.eMail && (<Text style={styles.inputError}>{renderError.eMail}</Text>)}</View>
                        <TextInput placeholder="Email" style={styles.input} value={user.eMail} onChangeText={(value)=>setUser({...user, eMail: value})}/>
                        <View style={{height: 17, marginBottom: 5}}>{renderError.password && (<Text style={styles.inputError}>{renderError.password}</Text>)}</View>
                        <TextInput placeholder="Password" secureTextEntry value={user.password} style={styles.input} onChangeText={(value)=>setUser({...user, password: value})}/>
                    </View>
                    <View style={{height: 25}}>{<Text style={{color: 'red', fontWeight: 'bold', fontSize: 20}}>{renderError.emptyFields}</Text>}</View>
                    <TouchableOpacity style={styles.button} >
                        <Button color="#ad9993" title="Sign Up" onPress={signup}></Button>
                    </TouchableOpacity>
                    <Pressable style={styles.button} >
                        <Button color="#ad9993" title="Already have an account? Log In!" onPress={()=> navigation.navigate('LogIn')} ></Button>
                    </Pressable>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -70
    },
    text:{
        color: '#ecebe9',
        fontSize: 28,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    input: {
        width: 330,
        height: 45,
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        borderWidth: 3,
        borderColor: '#ad9993'
    },
    button: {
        marginTop: 10
    },
    title: {
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold'
    },
    inputError: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 15
    }
})

const mapDispatchToProps = {
    signUp: userActions.signUp
}

export default connect(null, mapDispatchToProps)(SignUp)