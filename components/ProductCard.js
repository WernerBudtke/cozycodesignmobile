import React from "react" 
import { Text, View, StyleSheet, Image, Pressable, TouchableOpacity } from "react-native"
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
        editShowCartCard(true)
        setProductAlert(newProducts)
        addCartProduct(newProducts)
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
        <Pressable 
        // onPress={() => navigation.navigate('Product')}
        >
          <View style={styles.container}>
            <Image source={{ uri: photo}} style={styles.top} resizeMode="cover"/>
            <View style={styles.bottom}>
              <View style={styles.nameAndPrice}>
                <Text style={styles.productName}>
                    {product.name}
                </Text>
                <View style={styles.priceContainer}>
                  {product.discount !== 0 && (
                    <Text style={styles.sale}>
                      {(((100 - product.discount) / 100) * product.price).toFixed(2)}
                    </Text>
                  )} 
                  <Text style={styles.price} >
                    ${product.price}
                  </Text>
                </View>
              </View>
              <View style={styles.cardButtons}>
              {/* <Pressable icon={({ color, size }) => ( <Icon name="cart-outline" color={color} size={size} /> )} label="Cart"/> */}
              <Text>CART</Text>
              <Text>VIEW</Text>
              </View>
            </View>
          </View>
        </Pressable>
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
    width: "85%",
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
    width: 140,
    height: 140,
    position: "absolute",
    top: -70,
    right: -70,
    overflow: "hidden",
    borderBottomLeftRadius: 200,
  }
})