import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  Pressable,
} from "react-native"
import { FlatList } from "react-native-gesture-handler"
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
    navigation.navigate("Payment", { totalPrice: totalPrice })
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
      <Button
        title="FINALIZE PURCHASE"
        onPress={loginUser ? redirectPayment : redirectHandler}
      ></Button>
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
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          hideAlert()
        }}
        onConfirmPressed={() => {
          setShowAlert(false)
          navigation.navigate("LogIn")
        }}
      />
    </View>
  ) : (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20, marginVertical: 50 }}>
        <Icon size={25} name="warning-outline" />
        You don't have any items in your cart.
      </Text>
      <Pressable style={styles.button}>
        <Button
          onPress={() => navigation.navigate("Gallery")}
          title="START SHOPPING"
        ></Button>
      </Pressable>
      {!loginUser && (
        <Button
          onPress={() => navigation.navigate("LogIn")}
          title="SIGN IN"
        ></Button>
      )}
    </View>
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
    fontWeight: "bold",
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
    marginVertical: 10,
    width: Dimensions.get("window").width,
  },
})
