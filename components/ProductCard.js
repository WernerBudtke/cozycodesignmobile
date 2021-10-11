import React from "react" 
import { Text, View, StyleSheet, Image, Pressable, TouchableOpacity, Button} from "react-native"
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
        console.log("agregué al carrito")
        editShowCartCard(true)
        setProductAlert(newProducts)
        addCartProduct(newProducts)
    }

    const apreteElBoton = () => {
      console.log("LA CONCHA DE TU MADRE ALL BOYS")
    }


    const photo = product.photo?.includes("http")
        ? product.photo
        : `https://cozydeco.herokuapp.com/${product.photo}`
        

    return (
      <View style={styles.wrapper} > 
      {/* width: Dimensions.get('window').width, */}
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
            <View style={styles.bottom}>
              <View style={styles.nameAndPrice}>
                <Text style={styles.productName}>
                    {product.name}
                </Text>
                <View style={styles.priceContainer}>
                  {product.discount !== 0 && (
                    <Text style={styles.price}>
                      {(((100 - product.discount) / 100) * product.price).toFixed(2)}
                    </Text>
                  )} 
                  <Text style={product.discount !== 0 ? styles.sale : null} >
                    ${product.price}
                  </Text>
                </View>
              </View>
              <View style={styles.cardButtons}>
              {/* <Pressable icon={({ color, size }) => ( <Icon name="cart-outline" color={color} size={size} /> )} label="Cart"/> */}
              {!admin && (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={() => apreteElBoton()}>
                    <Text style={styles.button}>CART</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                  onPress={() => navigation.navigate("Product")}>
                    <Text style={styles.button}>VIEW</Text>
                  </TouchableOpacity>
                </View>
              )}
              </View>
            </View>
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
    height: 420,
    marginVertical: "5%",
    marginHorizontal: 0.5,
    backgroundColor: "#ead8ca", 
    position: "relative",
    overflow: "hidden",
    borderRadius: 20,
    // boxShadow: 0 0 3 .5 "#cac5c5",
  },
  
  container: {
      backgroundColor: "#ead8ca",
      height: 300,
      flexDirection: "column",
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
    fontSize: 15,
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
    width: 150,
    height: 150,
    position: "absolute",
    top: -60,
    right: -60,
    overflow: "hidden",
    borderBottomLeftRadius: 200,
    zIndex: 1,
  }, 

  icon: {
    color: "white",
    fontSize: 38,
  },

  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    zIndex: 5,
  }, 

  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  }
})