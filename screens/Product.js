import React from 'react'
import { Image, StyleSheet, Text, View, Pressable } from 'react-native'
import { connect } from "react-redux"
import { useEffect, useState } from "react"
import cartActions from "../redux/actions/cartActions"
import productsActions from "../redux/actions/productsActions"

const Product = ({
    product,
    match,
    products,
    getProducts,
    findAProduct,
    addCartProduct,
    productsCategory,
    getProductByCategory,
  }) => {
    const [quantity, setQuantity] = useState(1)
    const [loading, setLoading] = useState(true)
    const [productAlert, setProductAlert] = useState(null)
    const [showCartCard, setShowCartCard] = useState(false) 
    const [refresh, setRefresh] = useState(false)

// useEffect(() => {
//     if (!products.length) {
//     getProducts()
//     .then((res) => {
//         if (res.success){
//         findAProduct(match.params.id)
//         getProductByCategory(product.category)
//         setLoading(false)
//         }
//     })
//     } else {
//     getProductByCategory(product.category)
//     findAProduct(match.params.id)
//     setLoading(false)
//     }
// }, [refresh])


// const editShowCartCard = (newState) => {
//     console.log("se ejecuta editshow")
//     setShowCartCard(newState)
// }

// const addToCartHandler = () => {
//     setShowCartCard(true)
//     let newProducts = {
//     product: product,
//     quantity: quantity,
//     }
//     setProductAlert(newProducts)
//     addCartProduct(newProducts)
// }

// if (loading) {
//     return <Text>LOADING...</Text>
// }

// if(productAlert){
//     setTimeout(() => {
//     setProductAlert(null)
//     },2500)
// }

// const finalPrice =
//     product.discount === 0
//     ? product.price
//     : (((100 - product.discount) / 100) * product.price).toFixed(2)

// const photo = product.photo.includes("http")
//     ? product.photo
//     : `https://cozydeco.herokuapp.com/${product.photo}`

    return (
        <View style={styles.productSection}>
            {/* <View style={styles.productSection}>
                {productAlert && (
                    <CartCard
                    productAlert={productAlert}
                    showCartCard={showCartCard}
                    editShowCartCard={editShowCartCard}
                    />
                )}

                <View style={styles.mainContainer}>
                    <ImageBackground style={styles.productImage} source={{uri: '${photo}'}}></ImageBackground>
                    <View style={styles.productInfo}>
                        <Text style={styles.name}>{product.name}</Text>
                        <Text style={styles.description}>{product.description}</Text>
                        <View style={styles.prince}>
                            {product.discount !== 0 && (
                            <Text style={product.discount !== 0 ? styles.sale : null}>
                                ${product.price}
                            </Text>
                            )}
                            <Text style={styles.finalPrice}>${finalPrice}</Text>
                        </View>
                        <View>
                            <i style="far fa-credit-card fa-lg"></i>
                            <Text style={styles.interestCard}>3 payments of ${((1.1 * finalPrice) / 3).toFixed(2)}</Text>
                        </View>
                        <View>
                            <View style={styles.counter}>
                                <i style="fas fa-minus"
                                    onClick={quantity > 1 ? () => setQuantity(quantity - 1) : null}>
                                </i>
                                <Text>{quantity}</Text>
                                <i style="fas fa-plus"
                                    onClick={() => {
                                    product.stock === quantity
                                        ? alert("no hay stock")
                                        : setQuantity(quantity + 1)
                                    }}>
                                </i>
                            </View>
                            <Pressable style={styles.button}>
                                <Button onPress={addToCartHandler} style={styles.button}>Add to Cart</Button>
                            </Pressable>
                        </View>
                        <View style={styles.shippingInfo}>
                            <i style="fas fa-truck fa-lg"></i>
                            <Text>Free shipping on purchases from 200 dollars or more.</Text>
                        </View>
                        <Text style={styles.calculateSend}>Calculo de envio - CP</Text>
                        {/* <ReactCircleModal
                            style={{
                            padding: "0",
                            }}
                            backgroundColor="#61605e8a"
                            toogleComponent={(onClick) => (
                            <button
                                style={{
                                alignSelf: "center",
                                }}
                                onClick={onClick}
                            >
                                Open Cart
                            </button>
                            )}
                            offsetX={0}
                            offsetY={0}
                            >
                            {(onClick) => <Cart onClickHandler={onClick} />}
                        </ReactCircleModal> */}
                    {/* </View>
                </View>
            </View> */}
        </View>
    )
}



const styles = StyleSheet.create({ 
    productSection: {
        flex: 1,
        width: "100%",
        backgroundColor: "#f8f6f4",
        alignItems: "center",
    },
    mainContainer: {
        width: "80%",
        borderRadius: 20,   
        alignItems: "center",
        padding: 10,
    },
    productImage: {
        alignItems: "center",
        width: 300,
        height: 300,
    },
    productInfo: {
        justifyContent: "space-around",
        color: "rgb(75, 69, 69)",
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
        color: "#c58b7b",
    },
    description: {
        fontSize: 18,
    },
    prince:{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    discount:{
        fontSize: 14,
        color: "#dd3e2c",
    },
    finalPrice:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: "#d4c5bf",
        color: "#7e6661",
        width: "50%",
        height: 20,
        borderRadius: 10,  
    },
    suggestion: {
        backgroundColor: "#d4c5bf",
    },
    counter: {
        width: "50%",
    },
    interestCard:{
        color: "rgb(114, 107, 107)",
    },
})
const mapStateTopProps = (state) => {
    return {
        product: state.products.product,
        products: state.products.products,    
        productsCategory: state.products.productsCategory
    }
}
  
const mapDispatchToProps = {
    findAProduct: productsActions.findAProduct,
    addCartProduct: cartActions.addCartProduct,
    getProductByCategory: productsActions.getProductByCategory,
    getProducts: productsActions.getProducts
} 

export default connect(mapStateTopProps, mapDispatchToProps)(Product)