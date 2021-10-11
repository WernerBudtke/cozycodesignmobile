import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
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
        <View>
            
            <Text>Hola</Text>
            
            {/* <View className={styles.productSection}>
                {productAlert && (
                    <CartCard
                    productAlert={productAlert}
                    showCartCard={showCartCard}
                    editShowCartCard={editShowCartCard}
                    />
                )}

                <View className={styles.mainContainer}>
                    <View
                        className={styles.productImage}
                        style={{ backgroundImage: `url("${photo}")` }}>
                    </View>
                    <View className={styles.productInfo}>
                        <Text>{product.name}</Text>
                        <Text>{product.description}</Text>
                        <View>
                            {product.discount !== 0 && (
                            <Text className={product.discount !== 0 ? styles.sale : null}>
                                ${product.price}
                            </Text>
                            )}
                            <Text>${finalPrice}</Text>
                        </View>
                        <View>
                            <i className="far fa-credit-card fa-lg"></i>
                            <Text className={styles.interestCard}>3 payments of ${((1.1 * finalPrice) / 3).toFixed(2)}</Text>
                        </View>
                        <View>
                            <View className={styles.counter}>
                                <i className="fas fa-minus"
                                    onClick={quantity > 1 ? () => setQuantity(quantity - 1) : null}>
                                </i>
                                <Text>{quantity}</Text>
                                <i className="fas fa-plus"
                                    onClick={() => {
                                    product.stock === quantity
                                        ? alert("no hay stock")
                                        : setQuantity(quantity + 1)
                                    }}>
                                </i>
                            </View>
                            <button onClick={addToCartHandler}>Add to Cart</button>
                        </View>
                        <View className={styles.shippingInfo}>
                            <i className="fas fa-truck fa-lg"></i>
                            <Text>Free shipping on purchases from 200 dollars or more.</Text>
                        </View>
                        <Text className={styles.calculateSend}>Calculo de envio - CP</Text>
                        <ReactCircleModal
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
                        </ReactCircleModal>
                    </View>
                </View>
            </View> */}
        </View>
    )
}



const styles = StyleSheet.create({ })
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