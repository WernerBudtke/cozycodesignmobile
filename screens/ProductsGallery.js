import React from "react"
import { Text, View, StyleSheet, Keyboard, FlatList} from "react-native"
import ProductCard from "../components/ProductCard"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
// import CartCard from "../components/CartCard"
import productsActions from "../redux/actions/productsActions"

const ProductsGallery = ({ products, getProducts, productsCategory, route, getProductByCategory, navigation}) => {
    const [showCartCard, setShowCartCard] = useState(false)
    const [productAlert, setProductAlert] = useState(null)
    const [order, setOrder] = useState(null)
    const [view, setView] = useState({category: null, subcategory: null})

    useEffect(() => {
        if (!products.length) {
          getProducts()
        }
        // } else {
        //   getProductByCategory(route.params.category)
        // }
        // if (route.params.category) {
        //   setView({category: route.params.category, subcategory: null})
        // } else {
        //   setView({category: null, subcategory: null})
        // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    //en el array tendria que ir match.params (que creo que ahora serie routes)
    if (!order) {
    productsCategory.sort((a,b) => a.stock - b.stock)
    }
    const editShowCartCard = (newState) => {
    setShowCartCard(newState)
    }

    // if(productAlert){
    //     setTimeout(() => {
    //     setProductAlert(null)
    //     },2500)
    // }

    // const sortProducts = (e) => {
    // if (e.target.value !== "relevant") {
    //     productsCategory.sort((a, b) => e.target.value === "minor" ? a.price - b.price : b.price - a.price)
    // } else {
    //     productsCategory.sort((a,b) => a.stock - b.stock)
    // }
    // setOrder(e.target.value)
    // }

    let productsSubcategory = !view.subcategory ? productsCategory : productsCategory.filter((obj) => obj.subcategory === view.subcategory )
    
    // const viewHandler = (e) => {
    // setView({...view, subcategory: e.target.value})
    // }

    return (
        <View style={styles.main}>
            <Text style={styles.category}>ACA VAN LOS FILTROS</Text>
            <FlatList
                data={products}
                style={styles.list}
                contentContainerStyle={{alignItems: "center"}}
                keyExtractor={(product) => product._id}
                renderItem={({ item }) => {
                    return (
                        <ProductCard
                        product={item}
                        editShowCartCard={editShowCartCard}
                        navigation={navigation}
                        setProductAlert={setProductAlert}
                        />
                    )
                }}
            />
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
      products: state.products.products,
      productsCategory: state.products.productsCategory
    }
}
  
const mapDispatchToProps = {
    getProducts: productsActions.getProducts,
    getProductByCategory: productsActions.getProductByCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsGallery)

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#f8f6f4",
        alignItems: "center",
        height: "100%",
        width: "100%"
    },

    category: {
        height: 100, 
        backgroundColor: "#ead8ca", 
        width: "100%",
    },

    list: {
        width: "90%",
    }
})