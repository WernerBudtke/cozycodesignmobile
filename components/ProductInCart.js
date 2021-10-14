import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import cartActions from '../redux/actions/cartActions'
import Icon from 'react-native-vector-icons/Ionicons'

const ProductInCart = ({cartItem, updateCartProduct, deleteACartProduct}) => {
    const [enableCounter, setEnableCounter] = useState(true)

    const updateCartProductHandler = (operation) => {
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
            <View>
              <View style={styles.cardButtons}>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%'}}>
                  <Icon name="remove-outline" size={25} onPress={cartItem.quantity > 1 
                    && enableCounter
                      ? () => updateCartProductHandler("-")
                      : null
                    } 
                  />
                  <Text>{cartItem.quantity}</Text>
                  <Icon  name="add" size={25} onPress={cartItem.product.stock > cartItem.quantity 
                    && enableCounter
                      ? () => updateCartProductHandler("+")
                      : null
                    }
                  />
                  <Icon name="trash" size={25} onPress={() => deleteACartProduct(cartItem.product._id)} />
                  <Text>
                    ${((cartItem.product.discount === 0 ? cartItem.product.price : ((100 - cartItem.product.discount) / 100) * cartItem.product.price) * cartItem.quantity).toFixed(2)}
                  </Text>
                </View>
                <View>
                    <Text style={styles.price}>${cartItem.product.discount === 0 
                      ? cartItem.product.price 
                      : (((100 - cartItem.product.discount) / 100) * cartItem.product.price).toFixed(2)}
                    </Text>
                    <Text style={styles.price}>{cartItem.product.name}</Text>
                </View>
              </View>
            </View>
          </View>
      </ScrollView>
    )
}

const mapDispatchToProps =  {
    deleteACartProduct: cartActions.deleteACartProduct,
    updateCartProduct: cartActions.updateCartProduct,
}

export default connect(null, mapDispatchToProps)(ProductInCart)

const styles = StyleSheet.create({
  wrapper: {
    minWidth: "85%",
    marginVertical: "2%",
    marginHorizontal: 0.5,
    backgroundColor: "#ead8ca", 
    position: "relative",
    overflow: "hidden",
    marginHorizontal: 7
  },
  container: {
    backgroundColor: "#ead8ca",
    height: 100,
    flexDirection: "row",
    width: "100%"
  },
  top: {
    height: '100%',
    width: 100,
    overflow: "hidden",
  },
  price: {
    color: "black",
    fontSize: 15,
    marginLeft: 5
  },
  cardButtons: {
    backgroundColor: "#ead8ca",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-around",
    width: 300
  }
})