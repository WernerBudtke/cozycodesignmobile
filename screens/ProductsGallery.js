import React from "react"
import { Text, View, StyleSheet, Keyboard, FlatList} from "react-native"
import ProductCard from "../components/ProductCard"

const ProductsGallery = () => {
    return (
        <View style={styles.main}>
            <Text style={styles.category}>ACA VAN LOS FILTROS?</Text>
            <ProductCard/>
        </View>
    )
}

export default ProductsGallery

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