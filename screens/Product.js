import React from "react"
import { Text, View, StyleSheet, Image, Pressable, Keyboard, Dimensions, FlatList} from "react-native"
import { connect } from "react-redux"
import { useEffect, useState } from "react"
import cartActions from "../redux/actions/cartActions"
import productsActions from "../redux/actions/productsActions"
import ProductCard from "../components/ProductCard"
import { FontAwesome5, Foundation,  MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'

const Product = ({
  product,
  route,
  match,
  products,
  getProducts,
  findAProduct,
  addCartProduct,
  productsCategory,
  getProductByCategory,
  navigation
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
    setShowCartCard(newState)
  }

  const addToCartHandler = () => {
    setShowCartCard(true)
    let newProducts = {
      product: product,
      quantity: quantity,
    }
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
    : `http://cozydeco.herokuapp.com/${product.photo}`


  return (
    <View style={styles.productSection}>
      {productAlert ? (
        <ProductCard
          productAlert={productAlert}
          showCartCard={showCartCard}
          editShowCartCard={editShowCartCard}
        />
      ): (null) }
      <View style={styles.mainContainer}>
        <View style={styles.productImage}>
        <Image source={{ uri: photo}} style={styles.productImage} resizeMode="cover"/>
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
          <View style={styles.rowPrice}>
             <View style={styles.rowPrice}>
            {product.discount !== 0 ? (
              <Text style={product.discount !== 0 ? styles.sale : null}>
                ${product.price}
              </Text>
            ): (null) }
            <Text style={styles.productPrice}>${finalPrice}</Text>
          </View>
          <View style={styles.rowPrice}>
          <FontAwesome5 name="credit-card" size={24} color="black"  style={styles.icon} />
            <Text style={styles.interestCard}>
              3 payments of ${((1.1 * finalPrice) / 3).toFixed(2)}
            </Text>
          </View>
          </View>
         
          <View style={styles.addToCart}>
            <View style={styles.rowPrice}>
             
            <FontAwesome5 name="minus" size={24} color="black"  style={styles.icon}          
                onPress={quantity > 1 ? () => setQuantity(quantity - 1) : (null)}
              />
              <Text style={styles.quantity}>{quantity}</Text>
              <FontAwesome5 name="plus" size={24} color="black"  style={styles.icon} 
                onPress={() => {
                  product.stock === quantity
                    ? alert("no hay stock")
                    : setQuantity(quantity + 1)
                }}
              />
            </View>
            <Pressable onPress={addToCartHandler}><Text style={styles.buttonAdd}>Add to Cart</Text></Pressable>
          </View>
          <View style={styles.shippingInfo}>
          <FontAwesome5 name="truck" size={24} color="black"  style={styles.icon} />
            <Text style={styles.productShipping}>Free shipping on purchases from 200 dollars or more.</Text>
          </View>
          <Pressable
           onPress={() => {
            navigation.navigate("Cart")
          }}
              >
               <Text style={styles.buttonOpen}>Open Cart</Text>
            </Pressable>
        </View>
      </View>
    </View>
  )
}
const mapStateToProps = (state) => {
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
export default connect(mapStateToProps, mapDispatchToProps)(Product)

const width = Dimensions.get("window").width - 40;

const styles = StyleSheet.create({ 
  productSection :{
    backgroundColor: "#f8f6f4",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 15,
    width: width,
    height: width*2,
    borderRadius: 20,

  },
  mainContainer :{
    alignSelf: "center",
    width: width-10,
    height: width*2-10,
    marginTop: 5,
    borderRadius: 20,
    overflow: "hidden",
    padding:10,
  },
  productImage :{
    width: 330,
    height: 330,
    alignSelf: "center",
    borderRadius:16,
    shadowColor: "black",
		shadowOffset: {
		width: 5,
		height: 35,
		},
		shadowOpacity: 1,
		shadowRadius: 15,
		elevation: 5,
  },
  productInfo :{
    justifyContent: "space-around",
    padding: 1,
    color: "rgb(75, 69, 69)",
  },
  productName:{
    fontSize: 25,
    fontWeight: "bold",
    textAlign:"center",
    marginTop:10,
  },
  productDescription:{
    fontSize:16,
    color:"grey",
    textAlign: "center",
    marginTop:10,
  },
  rowPrice:{
    flexDirection: "row",
    alignSelf: "center",
    padding:3,
    textAlignVertical:"center",
    marginTop:5,
    height:45,
  },
  sale:{
    textDecorationLine: 'line-through', 
    textDecorationStyle: 'solid',
    color: "#dd3e2c",
    fontSize:18,
    padding:3,
  },
  productPrice:{
    fontSize:24,
    padding:3,
    textAlignVertical: "center",
    alignItems: "center",
  },
  interestCard:{
    color: "rgb(114, 107, 107)",
    textAlignVertical: "center",
    alignItems: "center",

  },
  addToCart:{
    flexDirection: "row",
    alignItems: "center",
    marginTop:10,
    textAlignVertical:"center",
    justifyContent:"space-evenly",
    width:width,

  },
  counter:{
    flexDirection: "row",
    width: "30%",
    textAlign: "center",
  },
  shippingInfo:{
    flexDirection: "row",
    padding:2,
    marginVertical:10,
    marginHorizontal:-15,
    backgroundColor: "#ead8ca",
    width:width,
    borderRadius:5,
    justifyContent: "space-evenly"
  },
  productShipping:{
    color:"black",
    fontSize:12,
    width:width-100,
    marginLeft:5,
  },
  calculateSend:{
    fontSize:16,
    alignSelf: "center",
  },
  icon:{
    padding:6,
  },
  quantity:{
    fontSize:22,
    textAlignVertical:"center",
    marginHorizontal:13, 
  },
  buttonAdd:{
    backgroundColor: "#bf988f",
    color: "#fff",
    borderRadius:10,
    fontWeight:"bold",
    fontSize:16,
    margin:"auto",
    textAlignVertical:"center",
    width:150,
    textAlign:"center",
    alignSelf: "center",
    padding:5,
  },

  buttonOpen:{
    backgroundColor: "#bf988f",
    color: "#fff",
    borderRadius:10,
    fontWeight:"bold",
    fontSize:22,
    margin:3,
    padding:8,
    width:200,
    textAlign:"center",
    alignSelf: "center",
  },
})
