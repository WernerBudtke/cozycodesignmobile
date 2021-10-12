import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { connect } from "react-redux"
import { useEffect, useState } from "react"
import cartActions from "../redux/actions/cartActions"
import productsActions from "../redux/actions/productsActions"
import ProductCard from "../components/ProductCard"

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

  useEffect(() => {
    if (!products.length) {
      getProducts().then((res) => {
        if (res.success) {
          findAProduct(route.params.id)
          getProductByCategory(product.category)
          setLoading(false)
        }
      })
    } else {
      getProductByCategory(product.category)
      findAProduct(route.params.id)
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh])

  const editShowCartCard = (newState) => {
    console.log("se ejecuta editshow")
    setShowCartCard(newState)
  }

  const addToCartHandler = () => {
    setShowCartCard(true)
    let newProducts = {
      product: product,
      quantity: quantity,
    }
    setProductAlert(newProducts)
    addCartProduct(newProducts)
  }

  if (loading) {
    return <Text>LOADING...</Text>
  }

  if (productAlert) {
    setTimeout(() => {
      setProductAlert(null)
    }, 2500)
  }

  const finalPrice =
    product.discount === 0
      ? product.price
      : (((100 - product.discount) / 100) * product.price).toFixed(2)

  const photo = product.photo.includes("http")
    ? product.photo
    : `http://localhost:4000/${product.photo}`

  return (
    <View style={styles.productSection}>
      {productAlert && (
        <ProductCard
          productAlert={productAlert}
          showCartCard={showCartCard}
          editShowCartCard={editShowCartCard}
        />
      )}

      <View style={styles.mainContainer}>
        <View
          style={styles.productImage}
          style={{ backgroundImage: `url("${photo}")` }}
        ></View>
        <View style={styles.productInfo}>
          <Text>{product.name}</Text>
          <Text>{product.description}</Text>
          <View>
            {product.discount !== 0 && (
              <Text style={product.discount !== 0 ? styles.sale : null}>
                ${product.price}
              </Text>
            )}
            <Text>${finalPrice}</Text>
          </View>
          <View>
            {/* <i style="far fa-credit-card fa-lg"></i> */}
            <Text style={styles.interestCard}>
              3 payments of ${((1.1 * finalPrice) / 3).toFixed(2)}
            </Text>
          </View>
          <View>
            <View style={styles.counter}>
              <i
                style="fas fa-minus"
                onPress={quantity > 1 ? () => setQuantity(quantity - 1) : null}
              ></i>
              <Text>{quantity}</Text>
              <i
                style="fas fa-plus"
                onPress={() => {
                  product.stock === quantity
                    ? alert("no hay stock")
                    : setQuantity(quantity + 1)
                }}
              ></i>
            </View>
            <Pressable onPress={addToCartHandler}><Text>Add to Cart</Text></Pressable>
          </View>
          <View style={styles.shippingInfo}>
            {/* <i style="fas fa-truck fa-lg"></i> */}
            <Text>Free shipping on purchases from 200 dollars or more.</Text>
          </View>
          <Text style={styles.calculateSend}>Calculo de envio - CP</Text>
          <Pressable
           onPress={() => {
            props.navigation.navigate("/cart", {
              onClickHandler:onClick
            });
          }}
              >
                Open Cart
            </Pressable>
        </View>
      </View>
      {/* <View style={styles.suggestionContainer}>
        <Text>Related Products</Text>
        <View style={styles.suggestion}>
          {productsCategory.map((obj) => {
            if (obj._id !== route.params.id) {
              return (
                <View
                  onPress={() => setRefresh(!refresh)}
                  style={styles.productCardContainer}
                >
                  <ProductCard
                    setProductAlert={setProductAlert}
                    product={obj}
                    newClass={"newClass"}
                    editShowCartCard={editShowCartCard}
                  />
                </View>
              )
            }
          })}
        </View>
      </View> */}
    </View>
  )
}
const mapStateTopProps = (state) => {
  return {
    product: state.products.product,
    products: state.products.products,
    productsCategory: state.products.productsCategory,
  }
}

const mapDispatchToProps = {
  findAProduct: productsActions.findAProduct,
  addCartProduct: cartActions.addCartProduct,
  getProductByCategory: productsActions.getProductByCategory,
  getProducts: productsActions.getProducts,
}
export default connect(mapStateTopProps, mapDispatchToProps)(Product)

const styles = StyleSheet.create({ 
  productSection :{
    backgroundColor: "#f8f6f4",
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer :{
    alignSelf: "center",
    width: 80,
    minHeight: 65,
    margin: 5,
    borderRadius: 20,
    overflow: "hidden",
  },
  productImage :{
    minWidth: 20,
    height: 20,
    alignSelf: "center",
  },
  productInfo :{
    justifyContent: "space-around",
    padding: 1,
    color: "rgb(75, 69, 69)",
  },
  
  
})
