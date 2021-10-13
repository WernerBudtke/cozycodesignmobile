import React from "react" 
import { Text, View, StyleSheet, Image, Pressable} from "react-native"
import { connect } from "react-redux"
import { useState } from "react"
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons"
import cartActions from "../redux/actions/cartActions"
import AwesomeAlert from "react-native-awesome-alerts"

const ProductCard = ({
    product,
    navigation,
    addCartProduct,
  }) => {

  const [showAlert, setShowAlert] = useState(false)

  const addToCartHandler = () => {
    let newProducts = {
      product: product,
      quantity: 1,
    }
    addCartProduct(newProducts)
    setShowAlert(true)
  }

  const photo = product.photo?.includes("http")
    ? product.photo
    : `https://cozydeco.herokuapp.com/${product.photo}`
        
  return (
    <View style={styles.wrapper} >
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        message="Item successfully added to cart!"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Ok"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => {
          setShowAlert(false)
        }}
      />
      {product.discount !== 0 && (
      <View style={styles.inside}>
        <Text style={styles.icon}>
          {product.discount}% OFF
        </Text>
      </View>
      )}
      <View style={styles.container}>
        <Pressable 
          onPress={() => navigation.navigate("Product", {
            id: product._id, product: product
          })
          }>
          <Image source={{ uri: photo}} style={styles.top} resizeMode="cover"/>
        </Pressable>
      </View>
      <View style={styles.nameAndPrice}>
        <Text style={styles.productName}>
            {product.name}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => navigation.navigate("Product")}>
          <MaterialCommunityIcons name="eye" size={27} color="black" />
        </Pressable>
        <View style={styles.priceContainer}>
          <Text style={product.discount !== 0 ? styles.sale : styles.price} >
            ${product.price}
          </Text>
            {product.discount !== 0 && (
              <Text style={styles.price}>
                ${(((100 - product.discount) / 100) * product.price).toFixed(2)}
              </Text>
            )} 
        </View>
        <Pressable onPress={addToCartHandler}>
          <Ionicons name="ios-cart" size={27} color="black" />
        </Pressable>
      </View>
    </View>
  )
}
  
const mapDispatchToProps = {
    addCartProduct: cartActions.addCartProduct,
}

export default connect(null, mapDispatchToProps)(ProductCard)

const styles = StyleSheet.create ({
  
  wrapper: {
    minWidth: "85%",
    height: 430,
    marginVertical: "5%",
    marginHorizontal: 0.5,
    backgroundColor: "#ead8ca", 
    overflow: "hidden",
    borderRadius: 20,
    shadowColor: "#000",
		shadowOffset: {
		width: 5,
		height: 5,
		},
		shadowOpacity: 1,
		shadowRadius: 20,
		elevation: 5,
		marginBottom: 15,
  },
  
  container: {
      backgroundColor: "#ead8ca",
      height: 300,
      width: "100%",
  },

  top: {
      height: "100%",
      width: "100%",
      overflow: "hidden",
  },

  bottom: {
    height: "100%",
    width: "100%",
  },

  nameAndPrice: {
    backgroundColor: "#ead8ca",
    height: "15%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  productName: {
    fontSize: 25,
    fontFamily: "Roboto_700Bold",
  },

  priceContainer: {
    flexDirection: "row", 
    alignItems: "center",
  },

  price: {
    color: "black",
    fontSize: 20,
    fontFamily:"Roboto_400Regular",
  },

  sale: {
    color: "#dd3e2c",
    textDecorationLine: 'line-through', 
    textDecorationStyle: 'solid',
    fontSize: 17,
    marginRight: 15,
    fontFamily:"Roboto_400Regular",
  },

  inside: {
    backgroundColor: "#d16b5f",
    alignItems: "center", 
  }, 

  icon: {
    color: "white",
    fontSize: 15,
    fontFamily:"Roboto_400Regular",
  },

  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  }
})