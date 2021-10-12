import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import ProductInCart from '../components/ProductInCart'

const Cart = ({products, loginUser}) => {
    const [view, setView] = useState(false)
    const totalPrice = products.map((obj) =>
        obj.product.discount === 0
        ? obj.product.price * obj.quantity
        : ((100 - obj.product.discount) / 100) * obj.product.price * obj.quantity
    )

      const redirectPayment = () => {
        navigation.navigate()
      }

      const redirectHandler = () => {
        loginUser ? redirectPayment() : setView(true)
      }
      console.log(products)
      products.map((product) => console.log(product.product.name))
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>SHOPPING CART</Text>
            <FlatList 
            data={products}
            keyExtractor={(item) => item.product._id}
            renderItem={({item}) => (
                <ProductInCart cartItem={item} />
            )}
            />    
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
        display: 'flex'
    },
    title: {
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 20,
        fontWeight: 'bold'
    },
    productImage: {
        height: 360,
        width: Dimensions.get('window').width,
    }
})
