import React from "react" 
import { Text, View, StyleSheet, Image } from "react-native"

const ProductCard = () => {
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
              {/* )} */}
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

export default ProductCard

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
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
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