import React from "react"
import { Text, View, StyleSheet, FlatList, Modal, Pressable, Image} from "react-native"
import ProductCard from "../components/ProductCard"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import productsActions from "../redux/actions/productsActions"
import { FontAwesome } from '@expo/vector-icons'
import SelectDropdown from 'react-native-select-dropdown'

<<<<<<< HEAD
const ProductsGallery = ({ products, getProducts, productsCategory, getProductByCategory, navigation}, props) => {
=======
const ProductsGallery = ({ products, getProducts, productsCategory, route, getProductByCategory, navigation }) => {
>>>>>>> 08b4b70ded8b8efbbec3a9d0adc9aac6cd56f7f1
    const [showCartCard, setShowCartCard] = useState(false)
    const [productAlert, setProductAlert] = useState(null)
    const [order, setOrder] = useState(null)
    const [view, setView] = useState({category: null, subcategory: null})
    const [category, setCategory] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        if (!products.length) {
          getProducts()
          setLoading(false)
        } else {
            console.log(props.route.params.category)
          getProductByCategory(category)
          setLoading(false)
        }
        if (route.params?.category) {
          setView({category: route.params?.category, subcategory: null})
          setLoading(false)
        } else {
          setView({category: null, subcategory: null})
          setLoading(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const categories = ["bathroom", "kitchenware", "decor", "giftcard", "sale"]
    let subcategories = []
    if (category === "bathroom") {
        subcategories = ["accesories", "mirrors"]
    } else if (category === "kitchenware") {
        subcategories = ["accesories", "glassware", "tableware"]
    } else if (category === "Decor") {
        subcategories = ["accesories", "home", "lighting"]
    } else if (category === "giftcard") {
        subcategories = ["giftcard"]
    }
    const sorting = ["Most relevant", "Lower to higher", "Higher to lower"]

    if (!order) {
    productsCategory.sort((a,b) => a.stock - b.stock)
    }

    const editShowCartCard = (newState) => {
    setShowCartCard(newState)
    }


    const sortProducts = (e) => {
    if (e !== "Most relevant") {
        productsCategory.sort((a, b) => e === "Lower to higher" ? a.price - b.price : b.price - a.price)
    } else {
        productsCategory.sort((a,b) => a.stock - b.stock)
    }
    setOrder(e)
    }

    let productsSubcategory = !view.subcategory ? productsCategory : productsCategory.filter((obj) => obj.subcategory === view.subcategory )
    
    const viewHandler = (e) => {
    setView({...view, subcategory: e})
    }

    if (loading) {
        return (
          <View style={styles.preloader}>
            <Image style={styles.logoImage} source={{ uri: `https://cozydeco.herokuapp.com/c.png`}} />
            <Text style={styles.loading}>LOADING...</Text>
          </View>
        )
      }

    return (
        <View style={styles.main}>
            <View style={styles.filterContainer}>
                <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Filter by</Text>
                    <View style={styles.filters}> 
                    <Text onPress={() => setCategory(null)} style={styles.all}>Show all</Text>
                    <SelectDropdown
                        data={categories}
                        onSelect={(selectedItem, index) => {
                            setCategory(selectedItem)
                        }}
                        defaultButtonText={!category ? 'Category' : category}
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
                    <SelectDropdown
                            data={subcategories}
                            onSelect={(selectedItem, index) => {
                                viewHandler(selectedItem)
                            }}
                            defaultButtonText={"Subcategory"}
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
                            disabled={!category ? true : false}
                    />
                    <SelectDropdown
                        data={sorting}
                        onSelect={(selectedItem, index) => {
                            sortProducts(selectedItem, "order")
                        }}
                        defaultButtonText={"Sort by"}
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
                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Hide Filters</Text>
                </Pressable>
                </View>
                </View>
                </Modal>
                <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}>
                    <Text style={styles.textStyle}>Show Filters</Text>
                </Pressable>
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

    filterContainer: {
        height: 60, 
        paddingTop: 10,
        backgroundColor: "#ead8ca", 
        width: "100%"

    },

    filters: {
        height: 250, 
        justifyContent: "space-around",
        paddingTop: 10,
        backgroundColor: "#ead8ca", 
        width: "190%",
        marginBottom: 10,
    },

    icons: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingTop: 10,
        backgroundColor: "#ead8ca", 
        width: "100%",
    },

    list: {
        width: "90%",
    },

    icon: {
        padding: 10,
    }, 
    
    all: {
        fontSize: 18,
        borderColor: "#d16b5f",
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        paddingLeft: 18,
        fontFamily:"Roboto_400Regular",
    },

    select: {
        width: "50%",
        height: 50,
        backgroundColor: "transparent",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#d16b5f",
        fontFamily:"Roboto_400Regular",
    },

    dropdownTxtStyle: {
        color: "black", 
        textAlign: "left",
        fontFamily:"Roboto_400Regular",
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
        paddingLeft: 10,
        fontFamily:"Roboto_400Regular",
        textTransform: 'capitalize'
    },

    centeredView: {
        flex: 1,
        justifyContent: "flex-start",
        position: "absolute",
        top: 58,
        width: "100%",
        alignItems: "center",
    },

    modalView: {
        backgroundColor: "#ead8ca",
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },

    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 150,
        alignSelf: "center"
    },
    
    buttonOpen: {
    backgroundColor: "#d16b5f",

    },
    
    buttonClose: {
        backgroundColor: "#d16b5f",
    },

    textStyle: {
        color: "black",
        fontFamily:"Roboto_500Medium",
        textAlign: "center", 
    },

    modalTitle: {
        marginBottom: 5,
        textAlign: "center", 
        fontFamily: "Roboto_700Bold", 
        fontSize: 20
    },

    logoImage: {
        width: 200,
        height: 200,
      }, 
    
      preloader: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      },
    
      loading: {
        fontFamily:"Roboto_400Regular",
      }
})