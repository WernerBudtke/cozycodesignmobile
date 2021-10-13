import React, {useState} from 'react'
import { StyleSheet, Text, View, Dimensions, ImageBackground, TextInput, TouchableOpacity, Button, Pressable, Image } from 'react-native'
import userActions from '../redux/actions/userActions'
import { connect } from 'react-redux'

const SignUp = ({signUp, navigation}) => {

    const [user, setUser] = useState({firstName: '', lastName: '', eMail: '', password: '', photo: 'xxxxxxxxx', admin: false, google: false, native: true})
    const [error, setError] = useState([])

    const signup=async()=>{
        const response = await signUp(user)
        console.log(response)
        if (response.success) {
          setUser('')
          navigation.navigate('Home')
        }
    //     if (response.data.error === 'Username already in use, try another.') {
    //       setError(response.data.error)
    //     }
    //     if (!response.data.success) {
    //     response.data.errors.map((error) => {
    //       return setError(error.message)
    //     })
    //   }
    }

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.image} source={{uri: 'https://i.imgur.com/Tc1vKCs.jpg'}} >
                {error.length > 0 && <Text style={{color: 'red', fontSize: 23, textAlign: 'center'}}>{error}</Text>}
                <View style={styles.content}>
                    <Text style={styles.text}>Sign Up</Text>
                    <View style={styles.form}>
                        <TextInput placeholder="Firstname" style={styles.input} value={user.firstName} onChangeText={(value)=>setUser({...user, firstName: value})}/>
                        <TextInput placeholder="Lastname" style={styles.input} value={user.lastName} onChangeText={(value)=>setUser({...user, lastName: value})}/>
                        <TextInput placeholder="Email" style={styles.input} value={user.eMail} onChangeText={(value)=>setUser({...user, eMail: value})}/>
                        <TextInput placeholder="Password" secureTextEntry value={user.password} style={styles.input} onChangeText={(value)=>setUser({...user, password: value})}/>
                    </View>
                    <Text style={styles.title}>Choose profile picture</Text>
                    <View style={styles.imagesContainer}>
                        <TouchableOpacity onPress={() => setUser({...user, photo: 'https://i.imgur.com/SrCMGbp.jpeg'})}>
                            <Image style={styles.chooseImage} source={{ uri: 'https://i.imgur.com/SrCMGbp.jpeg' }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setUser({...user, photo: 'https://i.imgur.com/Z0BrctE.jpeg'})}>
                            <Image style={styles.chooseImage} source={{ uri: 'https://i.imgur.com/Z0BrctE.jpeg' }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setUser({...user, photo: 'https://i.imgur.com/gaxfLhe.jpeg'})}>
                            <Image style={styles.chooseImage} source={{ uri: 'https://i.imgur.com/gaxfLhe.jpeg' }} />
                        </TouchableOpacity>
                    </View>
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
    container: {
        flex: 1,
    },
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
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 20,
        padding: 5
    },
    form: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
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
    imagesContainer: {
        height: 150,
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    chooseImage: {
        width: 100,
        height: 100,
        marginVertical: 10,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'black'
    },
    title: {
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold'
    }
})

const mapDispatchToProps = {
    signUp: userActions.signUp
}

export default connect(null, mapDispatchToProps)(SignUp)