import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { connect } from "react-redux"
import { useEffect, useState } from "react"
// import ReactCircleModal from "react-circle-modal"
// import Cart from "../components/Cart"
// import CartCard from "../components/CartCard"
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
            <i style="far fa-credit-card fa-lg"></i>
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
            <i style="fas fa-truck fa-lg"></i>
            <Text>Free shipping on purchases from 200 dollars or more.</Text>
          </View>
          <Text style={styles.calculateSend}>Calculo de envio - CP</Text>
          <Pressable
           onPress={() => {
            props.navigation.navigate("/cart", {
              onClickHandler={onClick}
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer :{
    display: "flex",
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    padding: 1,
    color: "rgb(75, 69, 69)",
  },
  
  // productInfo div :{
  //   display: "flex",
  //   justifyContent: "flex-start",
  //   alignItems: "center",
  //   gap: 20,
  //   fontWeight: "bold",
  //   color: "rgb(75, 69, 69)",
  // },
  // productInfo > p:nth-child(2) :{
  //   font-size: 4vmin,
  // },
  // productInfo > p:nth-child(3) :{
  //   font-size: 3vmin,
  // },
  // productInfo > div:nth-child(3) :{
  //   justify-content: center,
  //   font-size: 4vmin,
  // },
  
  // productInfo h2 :{
  //   font-size: 4vmin,
  //   color: #c58b7b,
  // },
  
  // productInfo button :{
  //   background: #d4c5bf,
  //   border: 0,
  //   color: #7e6661,
  //   padding: 1vh,
  //   font-size: 1.5vmin,
  //   font-weight: 300,
  //   width: 50%,
  //   display: block,
  //   cursor: pointer,
  //   -webkit-transition: all 0.4s,
  //   transition: all 0.4s,
  //   border-radius: 2px,
  // },
  
  // productInfo button:active :{
  //   background: #d4c5bf,
  //   color: #263238,
  // },
  
  // productInfo button:hover :{
  //   background: #bf988f,
  //   color: #fff,
  //   -webkit-transition: all 0.4s,
  //   transition: all 0.4s,
  // },
  
  // .shippingInfo p :{
  //   padding-left: 1vw,
  // }
  
  // div.suggestionContainer :{
  //   background-color: #d4c5bf,
  //   padding-left: 0.5rem,
  //   padding-top: 0.5rem,
  // }
  
  // div.suggestionContainer h3 :{
  //   color: rgba(0, 0, 0, 0.781),
  //   letter-spacing: 0.1vw,
  //   margin-bottom: 2vh,
  //   margin-left: 0.5rem,
  // }
  
  // div.suggestion :{
  //   width: 98vw,
  //   min-height: 65vh,
  //   background-color: #d4c5bf,
  //   display: flex,
  //   overflow-y: scroll,
  // }
  
  // div.suggestion::-webkit-scrollbar :{
  //   height: 0.5rem !important,
  // }
  
  // div.suggestion::-webkit-scrollbar-thumb :{
  //   background-color: #ad9993,
  //   border-radius: 10px,
  // }
  
  // div.productCardContainer :{
  //   padding: 0.5rem,
  //   height: 50vh,
  // },
  
  // div.productCardContainer > div :{
  //   width: 20rem,
  // },
  
  // counter :{
  //   display: flex,
  //   width: 50%,
  //   text-align: center,
  // },
  
  // counter p :{
  //   width: 30%,
  //   align-items: center,
  // },
  
  // sc-bdfBQB,
  // efwhzj :{
  //   padding: 0 !important,
  // },
  // interestCard :{
  //   color: rgb(114, 107, 107),
  //   margin: 1vh 0,
  // },
  // calculateSend :{
  //   font-size: 3vmin,
  // },
  // sale :{
  //   text-decoration: line-through,
  //   color: #dd3e2c !important,
  //   font-size: 5vmin !important,
  // },
  
  // fa-plus,
  // fa-minus,
  // fa-trash-alt :{
  //   cursor: pointer,
  // },
  
  
})
