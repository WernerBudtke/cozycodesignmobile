import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, Dimensions, Button } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import ProductInCart from '../components/ProductInCart'
import Icon from 'react-native-vector-icons/Ionicons'

const Cart = ({products, loginUser, navigation}) => {
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
        products.length 
        ? <View style={styles.mainContainer}>
            <Text>Total: $ {totalPrice.reduce((a, b) => a + b).toFixed(2)}</Text>
            <Text style={styles.title}>SHOPPING CART</Text>
            <FlatList 
            data={products}
            keyExtractor={(item) => item.product._id}
            renderItem={({item}) => (
                <ProductInCart cartItem={item} />
                )}
                />    
        </View>
        : <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 20, marginVertical: 20}}><Icon size={25} name="warning-outline" />You don't have any items in your cart.</Text>
            <Button onPress={() => navigation.navigate("Gallery")} title="START SHOPPING"></Button>
            {!loginUser && (<Button onPress={() => navigation.navigate("LogIn")} title="SIGN IN"></Button>)}
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
