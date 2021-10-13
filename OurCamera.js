import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios  from 'axios';
import { connect } from 'react-redux';
import userActions from './redux/actions/userActions';

function OurCamera() {
  const [image, setImage] = useState(null);
  const [user, setUser] = useState({firstName: 'PRUEBA NATIVE', lastName: 'NATIVe', eMail: 'reactnative@gmail.com', password: 'pija', photo: 'xxxxxxxxx', admin: false, google: false, native: false})
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
 
  const sendImgToBackEnd = async () =>{
    const fd = new FormData()
    fd.append("firstName", user.firstName)
    fd.append("lastName", user.lastName)
    fd.append("password", user.password)
    fd.append("eMail", user.eMail)
    fd.append("photo", {
        name: new Date() + "_profile",
        uri: result,
        type: "image/jpg"
    })
    fd.append("admin", user.admin)
    fd.append("google", user.google)
    const response = await signUp(fd)
      if (response.success) {
        console.log("exito")
      } else {
        console.log("error")
    }
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Save" onPress={sendImgToBackEnd}/>
    </View>
  );
}
const mapDispatchToProps = {
    signUp: userActions.signUp
}
export default connect(null, mapDispatchToProps)(OurCamera)
