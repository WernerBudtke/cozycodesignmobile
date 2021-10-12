import React from "react" 
import { Text, View, StyleSheet, Image, Pressable, Button} from "react-native"
import { connect } from "react-redux"
import { useEffect, useState } from "react"
import Icon from 'react-native-vector-icons/Ionicons'
import cartActions from "../redux/actions/cartActions"

const ProductCard = ({
    user,
    product,
    navigation,
    editShowCartCard,
    setProductAlert,
    addCartProduct,
  }) => {

    const [admin, setAdmin] = useState(null)
    useEffect(() => {
        if (user) {
        setAdmin(user.admin)
        }
    }, [])

    const addToCartHandler = () => {
        let newProducts = {
          product: product,
          quantity: 1,
        }
        addCartProduct(newProducts)
    }

    const photo = product.photo?.includes("http")
        ? product.photo
        : `https://cozydeco.herokuapp.com/${product.photo}`
        
    return (
      <View style={styles.wrapper} >
      {product.discount !== 0 && (
        <View style={styles.inside}>
          <Text style={styles.icon}>
            {product.discount}% OFF
          </Text>
        </View>
      )}
        <View style={styles.container}>
          <Pressable 
          onPress={() => navigation.navigate("Product")}>
            <Image source={{ uri: photo}} style={styles.top} resizeMode="cover"/>
          </Pressable>
        </View>
              <View style={styles.nameAndPrice}>
                <Text style={styles.productName}>
                    {product.name}
                </Text>
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
              </View>
        <View style={styles.buttonContainer}>
          <Pressable
          onPress={() => navigation.navigate("Product")}>
            <Text style={styles.button}>VIEW</Text>
          </Pressable>
        <Pressable onPress={addToCartHandler}>
          <Text style={styles.button}>CART</Text>
        </Pressable>
        </View>
      </View>
    )
}

const mapStateToProps = (states) => {
    return {
      user: states.users.user,
    }
  }
  
const mapDispatchToProps = {
    addCartProduct: cartActions.addCartProduct,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)

const styles = StyleSheet.create ({
  
  wrapper: {
    minWidth: "85%",
    height: 450,
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
    height: "20%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  productName: {
    fontSize: 20,
  },

  priceContainer: {
    flexDirection: "row", 
    alignItems: "center",
  },

  price: {
    color: "black",
    fontSize: 17,
  },

  sale: {
    color: "#dd3e2c",
    textDecorationLine: 'line-through', 
    textDecorationStyle: 'solid',
    fontSize: 12,
    marginRight: 15,
  },

  cardButtons: {
    backgroundColor: "#ead8ca",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: "5%"
  },

  inside: {
    backgroundColor: "#d16b5f",
    alignItems: "center", 
  }, 

  icon: {
    color: "white",
    fontSize: 15,
  },

  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  }, 

  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  }
})