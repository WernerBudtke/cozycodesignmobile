import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { connect } from "react-redux"
import { useEffect, useState } from "react"
import ReactCircleModal from "react-circle-modal"
import Cart from "../components/Cart"
import CartCard from "../components/CartCard"
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
    window.scroll(0, 0)
    if (!products.length) {
      getProducts().then((res) => {
        if (res.success) {
          findAProduct(match.params.id)
          getProductByCategory(product.category)
          setLoading(false)
        }
      })
    } else {
      getProductByCategory(product.category)
      findAProduct(match.params.id)
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
        <CartCard
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
            <i style="far fa-credit-card fa-lg"></i>
            <Text style={styles.interestCard}>
              3 payments of ${((1.1 * finalPrice) / 3).toFixed(2)}
            </Text>
          </View>
          <View>
            <View style={styles.counter}>
              <i
                style="fas fa-minus"
                onClick={quantity > 1 ? () => setQuantity(quantity - 1) : null}
              ></i>
              <Text>{quantity}</Text>
              <i
                style="fas fa-plus"
                onClick={() => {
                  product.stock === quantity
                    ? alert("no hay stock")
                    : setQuantity(quantity + 1)
                }}
              ></i>
            </View>
            <Pressable onPress={addToCartHandler}><Text>Add to Cart</Text></Pressable>
          </View>
          <View style={styles.shippingInfo}>
            <i style="fas fa-truck fa-lg"></i>
            <Text>Free shipping on purchases from 200 dollars or more.</Text>
          </View>
          <Text style={styles.calculateSend}>Calculo de envio - CP</Text>
          <ReactCircleModal
            style={{
              padding: "0",
            }}
            backgroundColor="#61605e8a"
            toogleComponent={(onClick) => (
              <Pressable
                style={{
                  alignSelf: "center",
                }}
                onClick={onClick}
              >
                Open Cart
              </Pressable>
            )}
            offsetX={0}
            offsetY={0}
          >
            {(onClick) => <Cart onClickHandler={onClick} />}
          </ReactCircleModal>
        </View>
      </View>
      <View style={styles.suggestionContainer}>
        <Text>Related Products</Text>
        <View style={styles.suggestion}>
          {productsCategory.map((obj) => {
            if (obj._id !== match.params.id) {
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
      </View>
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

const styles = StyleSheet.create({ })
