import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import cartActions from '../redux/actions/cartActions'

const ProductInCart = ({cartItem}) => {
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
        <View>
            <Image style={styles.productImage} source={{uri: photo}}/>
            <View>
                <Icon name="add" onClick={obj.quantity > 1 && enableCounter ? () => updateCartProductHandler("-") : null} />
            </View>
        </View>
    )
}

const mapDispatchToProps =  {
    deleteACartProduct: cartActions.deleteACartProduct,
    updateCartProduct: cartActions.updateCartProduct,
}

export default connect(null, mapDispatchToProps)(ProductInCart)

const styles = StyleSheet.create({})
// onPress={() => props.navigation.navigate("City", { city: item })}