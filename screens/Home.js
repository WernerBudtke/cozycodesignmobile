import React, { useState } from "react"
import {
  Animated,
  Dimensions,
  Image,
  FlatList,
  Text,
  View,
  StyleSheet,
  Button,
  TextInput,
  ImageBackground,
  Pressable,
} from "react-native"
import { StatusBar } from "expo-status-bar"
import { TouchableOpacity } from "react-native-gesture-handler"

const Home = ({navigation}, props) => {
  const scrollY = React.useRef(new Animated.Value(0)).current
  const scrollX = React.useRef(new Animated.Value(0)).current

  const { width, height } = Dimensions.get("screen")
  const ITEM_WIDTH = width * 0.76
  const ITEM_HEIGHT = ITEM_WIDTH * 1.47
  const imageW = width / 2

  const images = [
    {
      img: "https://i.postimg.cc/28fhfXP2/home1.png",
      link: "Check out our latest trends",
    },
    {
      img: "https://i.postimg.cc/66G4VjPx/home3.png",
      link: "There is no place like home",
      description:
        "In Cozy we offer a wide variety of well-designed, functional home products. Whether your home decor leans towards minimalist or maximalist aesthetic, you'll find something to suit your style.",
    },
    // { img: "https://i.postimg.cc/fRkNXFHx/home4.png", link: "" },
    { img: "https://i.postimg.cc/cCsFRrC2/home2.png", link: "Categories" },
  ]
  const data = images.map((image, index) => ({
    key: String(index),
    photo: image.img,
    link: image.link,
    description: image.description,
  }))

  const categories = [
    { src: "https://i.postimg.cc/tR8xRKn9/bat.jpg", category: "Bathroom" },
    { src: "https://i.postimg.cc/nzm4F3LR/home8.jpg", category: "Kitchenware" },
    { src: "https://i.postimg.cc/J4Q2C5tc/deco.jpg", category: "Decor" },
    {
      src: "https://i.postimg.cc/3wdn2zCV/gitfcard-Home.png",
      category: "Giftcard",
    },
    { src: "https://i.postimg.cc/R0mhJ9vz/sale.jpg", category: "Sale" },
  ];

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.FlatList
        LisHeaderComponent={
          <>
            <Text>{data.categories}</Text>
          </>
        }
        data={data}
        keyExtractor={(item) => item.key}
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * height,
            index * height,
            (index + 1) * height,
          ]
          const translateY = scrollY.interpolate({
            inputRange,
            outputRange: [-height, 0, height],
          })
          return (
            <View>
              {item.link == "Categories" ? (
                <View style={styles.categoriesContainer}>
                  <Text style={styles.titleCategory}>CATEGORIES</Text>
                  <FlatList
                    data={categories}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => {
                      return (
                        <View
                          style={{
                            display: "flex",
                            width: width - 40,
                            height: width - 40,
                            marginTop: 15,
                            margin: "auto",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <View key={index}>
                            <TouchableOpacity
                              onPress={() => {
                                navigation.navigate("Gallery", {
                                  category: "bathroom"
                                })
                              }}
                            >
                              <Image
                                source={{ uri: item.src }}
                                style={{
                                  display: "flex",
                                  width: width - 40,
                                  height: width - 40,
                                  resizeMode: "cover",

                                  shadowColor: "#000",
                                  shadowOpacity: 0.5,
                                  borderRadius: 16,
                                  margin: "auto",
                                  shadowOffset: {
                                    width: 0,
                                    height: 0,
                                  },
                                  shadowRadius: 20,
                                }}
                              />
                              <Text style={styles.textCategory}>
                                {item.category}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )
                    }}
                  />
                </View>
              ):(
              <View
                style={{
                      overflow: "hidden",
                      alignItems: "center",
                }}>
                    <Animated.Image
                      source={{ uri: item.photo }}
                      style={{
                        width: width*1.04,
                        height: height*1,
                        resizeMode: "cover",
                        transform: [
                          {
                            translateY,
                          },
                        ],
                      }}
                    />
                    {item.link.includes("Check") &&(
                      <View  style={styles.boxCallToAction}>
                    <Text style={styles.textCallToAction}>{item.link} </Text>
                    </View>
                  )}
                  {item.link.includes("home") && (
                    <View style={styles.boxQuote}>
                      <Text style={styles.textQuote}>{item.link} </Text>
                      <Text style={styles.bodyQuote}>{item.description} </Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          )
        }}
        ListFooterComponent={
          <View
            style={{ backgroundColor: "#dabea8de", width: "100%", height: 25 }}
          >
            <Text
              style={{ marginStart: 150, fontSize: 12, fontWeight: "bold" }}
            >
              Mind-Hub 2021
            </Text>
          </View>
        }
      />
    </View>
  )
}
export default Home

const width = Dimensions.get("window").width - 40

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cards: {
    width: width / 2 - 10,
    height: width / 2 - 10,
    margin: 5,
    padding: 5,
  },
  boxCallToAction: {
    backgroundColor: "#dabea8de",
    width: 100,
    height: 140,
    position: "absolute",
    zIndex: 300,
    bottom:width+200,
    right:60,
    borderRadius:15,
    shadowColor: '#000',
    shadowOpacity:.5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 20,
  },
  textCallToAction: {
    color: "#060B34",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold", 
    marginBottom:width*1.5,
    padding:10,
  },
  categoriesContainer:{
      minHeight:"100%",
      flex:1,
      alignContent: "center",
      marginLeft:20,
  },
  titleCategory:{
    fontSize:30,
    fontWeight: "bold",
    alignSelf: "center",
    paddingTop: 10,
    color: "rgba(0, 0, 0, 0.638)",
    marginBottom: 15,
  },
  textCategory: {
    fontSize: 20,
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.638)",
    fontWeight: "bold",
    backgroundColor: "rgba(255, 255, 255, 0.69)",
    height: 40,
    width: width,
    position: "absolute",
    zIndex: 200,
    top: 35,
  },
  boxQuote: {
    color: "#060B34",
    fontSize: 10,
    backgroundColor: "rgba(255, 255, 255, 0.79)",
    width:220,
    height:270,
    position: "absolute",
    zIndex: 200,
    bottom:-60,
    left:-10,
    marginBottom:width,
    padding:15,
    borderRadius:15,
    shadowColor: '#000',
    shadowOpacity:.1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 5,
  },
  textQuote: {
    color: "#060B34",
    fontSize: 14,
    fontWeight: "bold", 
    paddingStart:10,
  },
  bodyQuote: {
    color: "#060B34",
    fontSize: 14,
    lineHeight: 20,
    paddingStart: 10,
    paddingTop: 10,
  },
  boxCallToAction: {
    backgroundColor: "#dabea8de",
    width: 100,
    height: 140,
    position: "absolute",
    zIndex: 200,
    bottom: width + 100,
    left: 40,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 20,
  },
  textCallToAction: {
    color: "#060B34",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: width * 1.5,
    padding: 10,
  },
})
