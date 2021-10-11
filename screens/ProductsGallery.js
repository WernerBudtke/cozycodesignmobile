import React from "react"
import { Text, View, StyleSheet, Keyboard, FlatList} from "react-native"
import ProductCard from "../components/ProductCard"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
// import CartCard from "../components/CartCard"
import productsActions from "../redux/actions/productsActions"

const ProductsGallery = ({ products, getProducts, productsCategory, match, getProductByCategory}) => {
    const [showCartCard, setShowCartCard] = useState(false)
    const [productAlert, setProductAlert] = useState(null)
    const [order, setOrder] = useState(null)
    const [view, setView] = useState({category: null, subcategory: null})

    useEffect(() => {
        // document.title = "COZY | STORE"
        // if (!products.length) {
        //   getProducts()
        // } else {
        //   getProductByCategory(match.params.category)
        // }
        // if (match.params.category) {
        //   setView({category: match.params.category, subcategory: null})
        // } else {
        //   setView({category: null, subcategory: null})
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    //en el array tiene que ir match.params
    if (!order) {
    productsCategory.sort((a,b) => a.stock - b.stock)
    }
    // const editShowCartCard = (newState) => {
    // setShowCartCard(newState)
    // }

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

    // let productsSubcategory = !view.subcategory ? productsCategory : productsCategory.filter((obj) => obj.subcategory === view.subcategory )
    
    // const viewHandler = (e) => {
    // setView({...view, subcategory: e.target.value})
    // }

    return (
        <View style={styles.main}>
            <Text style={styles.category}>ACA VAN LOS FILTROS?</Text>
            <ProductCard/>
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
        height: "100%",
        paddingTop: 40,
        alignItems: "center",
    },

    category: {
        height: 100, 
        backgroundColor: "#ecebe9", 
        width: "100%",
    }
})