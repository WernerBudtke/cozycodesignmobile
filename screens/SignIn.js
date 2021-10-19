import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput, Dimensions, ImageBackground, Button, Pressable } from 'react-native'
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'

const SignIn = ({navigation, logIn}) => {
    const [error, setError] = useState('')
    const [user, setUser] = useState({eMail: '', password: ''})
    
    const submitHandler = async () => {
      if (Object.values(user).some((value) => !value)) {
        return setError('Fill the empty fields.')
      }
      const response = await logIn(user)
        if (response.success) {
          setUser(user)
          setError('')
          navigation.navigate('Home')
        } else {
          setError(response.response)
        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.image} source={{uri: 'https://i.imgur.com/53dtUry.jpg'}}>
                <View style={styles.content}>
                    <Text style={styles.text}>Sign In</Text>
                    <View>
                        <TextInput label='Username' placeholder="Email" value={user.eMail} style={styles.input} onChangeText={(value)=>setUser({...user, eMail: value})}/>
                        <TextInput secureTextEntry  placeholder="Password" label='Password' value={user.password} style={styles.input} onChangeText={(value)=>setUser({...user, password: value})}/>
                    </View>
                    {error !== '' && <Text style={{color: 'red', fontSize: 20, textAlign: 'center'}}>{error}</Text>}
                    <Pressable style={styles.button}>
                      <Button color="#ad9993" onPress={submitHandler} style={styles.button} title="Sign In" ></Button>
                    </Pressable>
                    <Pressable style={styles.button}>
                        <Button color="#ad9993" title="Create account now!" onPress={() => navigation.navigate('SignUp')}></Button>
                    </Pressable>
                </View>
            </ImageBackground>
        </View>
    )
}

const mapDispatchToProps = {
  logIn: userActions.logIn
}

export default connect(null, mapDispatchToProps)(SignIn)

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -70
  },
  text:{
    color: 'black',
    fontSize: 28,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
    marginTop: 13,
    width: 200,
  },
})