import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import cartActions from '../redux/actions/cartActions'
import Icon from 'react-native-vector-icons/Ionicons'

const ProductInCart = ({cartItem, updateCartProduct, deleteACartProduct}) => {
    const [enableCounter, setEnableCounter] = useState(true)

    const updateCartProductHandler = (operation) => {
        console.log('entra')
        setEnableCounter(false)
        let updatedCartItem = {
          product: cartItem.product,
          quantity:
            operation === "+" ? cartItem.quantity + 1 : cartItem.quantity - 1,
        }
        updateCartProduct(updatedCartItem)
        setEnableCounter(true)
      }

    const photo = cartItem.product.photo.includes("http")
    ? cartItem.product.photo
    : `https://cozydeco.herokuapp.com/${cartItem.product.photo}`

    return (
        <ScrollView style={styles.wrapper} > 
        <View style={styles.container}>
            <Image source={{ uri: photo}} style={styles.top} resizeMode="cover"/>
            <View style={styles.bottom}>
              <View style={styles.nameAndPrice}>
                <Text style={styles.productName}>
                    {cartItem.product.name}
                </Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>${cartItem.product.price}</Text>
                </View>
              </View>
              <View style={styles.cardButtons}>
              </View>
            </View>
          </View>
                <View style={styles.counter}>
                    <Icon onPress={cartItem.quantity > 1 && enableCounter
                  ? () => updateCartProductHandler("-")
                  : null} name="remove-outline" size={45} />
                    <Text>{cartItem.quantity}</Text>
                    <Icon onPress={cartItem.product.stock > cartItem.quantity && enableCounter
                  ? () => updateCartProductHandler("+")
                  : null} name="add" size={45} name="add" size={45} />
                  <Icon name="trash" size={45} onPress={() => deleteACartProduct(cartItem.product._id)} />
                </View>
                <Text>
                $
                {(
                  (cartItem.product.discount === 0
                    ? cartItem.product.price
                    : ((100 - cartItem.product.discount) / 100) *
                      cartItem.product.price) * cartItem.quantity
                ).toFixed(2)}
                </Text>
      </ScrollView>
    )
}

const mapDispatchToProps =  {
    deleteACartProduct: cartActions.deleteACartProduct,
    updateCartProduct: cartActions.updateCartProduct,
}

export default connect(null, mapDispatchToProps)(ProductInCart)

const styles = StyleSheet.create({
    productImage: {
        width: 300,
        height: 300
    },
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
        fontSize: 20,
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
    
      counter: {
        flexDirection: "row",
        width: "100%",
      }
})