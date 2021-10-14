import React from "react"
import { Text, View, StyleSheet, Keyboard, FlatList} from "react-native"
import ProductCard from "../components/ProductCard"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
// import CartCard from "../components/CartCard"
import productsActions from "../redux/actions/productsActions"
import { FontAwesome5, Foundation, MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import SelectDropdown from 'react-native-select-dropdown'

const ProductsGallery = ({ products, getProducts, match, categoryHome, productsCategory, route, getProductByCategory, navigation}, props) => {
    const [showCartCard, setShowCartCard] = useState(false)
    const [productAlert, setProductAlert] = useState(null)
    const [order, setOrder] = useState(null)
    const [view, setView] = useState({category: null, subcategory: null})
    const [category, setCategory] = useState(null)

    
console.log(route)
console.log(props)

    useEffect(() => {
        if (!products.length) {
          getProducts()
        } else {
          getProductByCategory(route.params.id)
        }
        if (route.params?.category) {
          setView({category: route.params?.category, subcategory: null})
        } else {
          setView({category: null, subcategory: null})
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category])

    if (!order) {
    productsCategory.sort((a,b) => a.stock - b.stock)
    }
    const editShowCartCard = (newState) => {
    setShowCartCard(newState)
    }

    const sorting = ["Most relevant", "Lower to higher", "Higher to lower"]


    const sortProducts = (e) => {
        console.log(e)
    if (e !== "Most relevant") {
        productsCategory.sort((a, b) => e === "Lower to higher" ? a.price - b.price : b.price - a.price)
    } else {
        productsCategory.sort((a,b) => a.stock - b.stock)
    }
    setOrder(e)
    }

    let productsSubcategory = !view.subcategory ? productsCategory : productsCategory.filter((obj) => obj.subcategory === view.subcategory )
    
    // const viewHandler = (e) => {
    // setView({...view, subcategory: e.target.value})
    // }

    return (
        <View style={styles.main}>
            <View style={styles.filters}>
                <View style={styles.icons}>
                    <FontAwesome5 onPress={() => setCategory("Bathroom")} name="toilet" size={24} color="black"  style={styles.icon}/>
                    <FontAwesome5 onPress={() => setCategory("Kitchenware")} name="utensils" size={24} color="black" style={styles.icon}/>
                    <MaterialCommunityIcons onPress={() => setCategory("Decor")} name="lamp" size={26} color="black" style={styles.icon} />
                    <MaterialIcons onPress={() => setCategory("GitfCard")} name="card-giftcard" size={26} color="black" style={styles.icon} />
                    <Foundation onPress={() => setCategory("sale")} name="burst-sale" size={30} color="black" style={styles.icon}/>
                </View>
            <View style={styles.subcategory}>
                <View>
                    <Text>subcategories</Text>
                </View>
            </View>
            </View>
            <View style={styles.generalFilters}>
                <Text onPress={() => setCategory(null)} style={styles.all}>Show all</Text>
                <SelectDropdown
                    data={sorting}
                    onSelect={(selectedItem, index) => {
                        sortProducts(selectedItem, "order")
                    }}
                    defaultButtonText={"Most relevant"}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        return item
                    }}
                    buttonStyle={styles.select}
                    buttonTextStyle={styles.dropdownTxtStyle}
                    renderDropdownIcon={() => {
                      return (
                        <FontAwesome name="sort-down" size={24} color="black" />
                      )
                    }}
                    dropdownIconPosition={"right"}
                    dropdownStyle={styles.dropdownStyle}
                    rowStyle={styles.rowStyle}
                    rowTextStyle={styles.rowTxtStyle}
                />
            </View>
            <FlatList
                data={productsSubcategory}
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

    filters: {
        height: 100, 
        justifyContent: "space-around",
        paddingTop: 10,
        backgroundColor: "#ead8ca", 
        width: "100%",
        shadowColor: "black",
		shadowOffset: {
		width: 5,
		height: 35,
		},
		shadowOpacity: 1,
		shadowRadius: 15,
		elevation: 5,
    },

    icons: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingTop: 10,
        backgroundColor: "#ead8ca", 
        width: "100%",
    },

    subcategory: {
        width: "100%",
        height: 60,
        backgroundColor: "#ead8ca",
        alignItems: "center",
        justifyContent: "center",
    },

    list: {
        width: "90%",
    },

    icon: {
        padding: 10,
    }, 

    generalFilters: {
        flexDirection: "row",
        marginVertical: 15,
        width: "100%",
        alignItems: "center",
        justifyContent: "space-around"
    },

    all: {
        fontSize: 18,
        borderColor: "#d16b5f",
        borderWidth: 1,
        padding: 10,
        borderRadius: 5
    },

    select: {
        width: "40%",
        height: 50,
        backgroundColor: "transparent",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#d16b5f",
    },

    dropdownTxtStyle: {
        color: "black", 
        textAlign: "left",
    },

    dropdownStyle: { 
        backgroundColor: "#EFEFEF" 
    },

    rowStyle: {
        backgroundColor: "#EFEFEF",
        borderBottomColor: "#C5C5C5",
    },

    rowTxtStyle: { 
        color: "#444", 
        textAlign: "left",
        paddingLeft: 3,
    }
})