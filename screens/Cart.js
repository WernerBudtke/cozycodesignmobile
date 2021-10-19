import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  Pressable,
  ImageBackground
} from "react-native"
import { FlatList, TouchableOpacity } from "react-native-gesture-handler"
import { connect } from "react-redux"
import ProductInCart from "../components/ProductInCart"
import Icon from "react-native-vector-icons/Ionicons"
import AwesomeAlert from "react-native-awesome-alerts"

const Cart = ({ products, loginUser, navigation }) => {
  const [showAlert, setShowAlert] = useState(false)
  const totalPrice = products.map((obj) =>
    obj.product.discount === 0
      ? obj.product.price * obj.quantity
      : ((100 - obj.product.discount) / 100) * obj.product.price * obj.quantity
  )

  const redirectPayment = () => {
    navigation.navigate("Payment", { total: 'total' })
  }

  const redirectHandler = () => {
    setShowAlert(true)
  }

  const hideAlert = () => {
    setShowAlert(false)
  }

  return products.length ? (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>SHOPPING CART</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.product._id}
        renderItem={({ item }) => <ProductInCart cartItem={item} />}
      />
      <Text style={styles.total}>
        Total: $ {totalPrice.reduce((a, b) => a + b).toFixed(2)}
      </Text>
      <Text style={styles.buttonFinalize} onPress={loginUser ? redirectPayment : redirectHandler}>FINALIZE PURCHASE</Text>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Hey!"
        message="You must be logged in to make a purchase"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Close"
        confirmText="Sign In"
        confirmButtonColor="#b7cbd3"
        onCancelPressed={() => {
          hideAlert()
        }}
        onConfirmPressed={() => {
          setShowAlert(false)
          navigation.navigate("LogIn")
        }}
        messageStyle={{ fontFamily: "Roboto_500Medium"}}
        contentContainerStyle={{
          backgroundColor: "#f8f6f4"
        }}
        confirmButtonStyle={{width: 100, textAlign: 'center'}}
        confirmButtonTextStyle={{textAlign: 'center', color: 'black'}}
        cancelButtonStyle={{width: 100, textAlign: 'center'}}
        cancelButtonTextStyle={{color: 'black', textAlign: 'center'}}
      />
    </View>
  ) : (
    <ImageBackground style={styles.image} source={{uri: 'https://tiendaramo.com/vistas/imagenes/empty-cart.png'}}>
      <View style={{ flex: 1, justifyContent: "space-around", flexDirection: 'row' }}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Gallery")}>
        <Text style={{fontFamily: 'Roboto_500Medium'}}>START SHOPPING</Text>
      </TouchableOpacity>
      {!loginUser && (
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("LogIn")}>
          <Text>SIGN IN</Text>
        </TouchableOpacity>
      )}
    </View>
    </ImageBackground>
  )
}

const mapStateTopProps = (state) => {
  return {
    products: state.cart.products,
    loginUser: state.users.user,
  }
}

export default connect(mapStateTopProps)(Cart)

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flex: 1,
  },
  title: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 20,
    fontFamily: 'Cormorant_700Bold',
    letterSpacing: 3,
    fontSize: 25
  },
  productImage: {
    height: 360,
    width: Dimensions.get("window").width,
  },
  total: {
    textAlign: "center",
    marginVertical: 15,
    fontWeight: "bold",
    fontSize: 20,
  },
  button: {
    width: 150,
    alignItems: "center",
    backgroundColor: "#ad9993",
    padding: 10,
    borderRadius: 20,
    marginTop: 25,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  buttonFinalize: {
    width: Dimensions.get("window").width,
    backgroundColor: '#ad9993',
    paddingVertical: 10,
    textAlign: 'center',
    fontFamily: 'Cormorant_700Bold',
    letterSpacing: 3,
    fontSize: 20
  }
})
