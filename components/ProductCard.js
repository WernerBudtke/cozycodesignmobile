import React from "react" 
import { Text, View, StyleSheet, Image } from "react-native"
import { connect } from "react-redux"
import { useEffect, useState } from "react"
import cartActions from "../redux/actions/cartActions"

const ProductCard = ({
    product,
    editShowCartCard,
    setProductAlert,
    addCartProduct,
    user,
  }) => {

    const [admin, setAdmin] = useState(null)
    useEffect(() => {
        if (user) {
        setAdmin(user.admin)
        }
    }, [])

    const addToCartHandler = () => {
        let newProducts = {
          product: product,
          quantity: 1,
        }
        editShowCartCard(true)
        setProductAlert(newProducts)
        addCartProduct(newProducts)
    }

    // const photo = product.photo?.includes("http")
    //     ? product.photo
    //     : `http://localhost:4000/${product.photo}`
    //     https://cozydeco.herokuapp.com/

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <Image source={{ uri: `https://i.postimg.cc/0jbZdZKt/formbackground.jpg`}} style={styles.top}/>
                <View style={styles.bottom}>
          <View style={styles.nameAndPrice}>
            <Text>
                {/* {product.name} */}
            </Text>
            <View>
              <Text style={styles.sale}>
                $
                {/* {product.price} */}
              </Text>
              {/* {product.discount !== 0 && ( */}
                <Text>
                  $
                  {/* {(((100 - product.discount) / 100) * product.price).toFixed(
                    2
                  )} */}
                </Text>
            {/* //   )} */}
            </View>
          </View>
          <View style={styles.cardButtons}>
            {/* {!admin && (
              <>
                <i
                  style="fas fa-cart-plus fa-lg"
                  onClick={addToCartHandler}
                ></i>
                <Link to={`/product/${product._id}`}>
                  <i style="fas fa-eye fa-lg"></i>
                </Link>
              </>
            )}
            {admin && (
              <Link to={`/productform/${product._id}`}>
                <i style="fas fa-pen fa-lg"></i>
              </Link>
            )} */}
          </View>
        </View>
                <View >
                </View>
            </View>
        </View>
    )
}

const mapStateToProps = (states) => {
    return {
      user: states.users.user,
    }
  }
  
  const mapDispatchToProps = {
    addCartProduct: cartActions.addCartProduct,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)

const styles = StyleSheet.create ({
    container: {
        backgroundColor: "#ead8ca"
    },

    wrapper: {
        width: "85%",
        height: 250,
        marginVertical: 4,
        marginHorizontal: 0.5,
        backgroundColor: "white", 
        position: "relative",
        overflow: "hidden",
        borderRadius: 20,
        // boxShadow: 0 0 3 .5 "#cac5c5",
    },

    container: {
        flexDirection: "column",
        width: "100%",
        height: "100%",
    },

    top: {
        height: "100%",
        width: "100%",
        overflow: "hidden",
    },

    bottom: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#ead8ca",
        height: "100%",
        width: "100%",
    },

    nameAndPrice: {
        height: "100%",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
    },

    sale: {
        // textDecoration: "line-through",
        color: "#dd3e2c",
        fontSize: 5,
    },

    cardButtons: {
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-evenly",
        paddingRight: 10,
    },

    fas: {
        color: "rgb(56, 54, 54)",
    }
})