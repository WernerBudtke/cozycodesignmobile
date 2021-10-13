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
import { FontAwesome5, Foundation,  MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'


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
        img: "https://i.postimg.cc/W3kX8xqY/11.png",
        link: "Look out our latest trends2",
      },
    
      {
        img: "https://i.postimg.cc/d3cnxn8s/14.png",
        link: "Este es otro botón para ver que",
      },
     
      {
        img: "https://i.postimg.cc/j5b7V1kF/16.png",
        link: "Este es otro botón para ver que",
      },
      {
        img: "https://i.postimg.cc/BbhLKnZr/17.png",
        link: "Look out our latest trends2",
      },
    {
      img: "https://i.postimg.cc/66G4VjPx/home3.png",
      link: "There is no place like home",
      description:
        "In Cozy we offer a wide variety of well-designed, functional home products. Whether your home decor leans towards minimalist or maximalist aesthetic, you'll find something to suit your style.",
    },
    {
        img: "https://i.postimg.cc/sfTwB3d3/home2.png",
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
                                navigation.navigate("Gallery")
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
                        width: width,
                        height: height,
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
                   {item.link.includes("botón") &&(
                      <View  style={styles.boxCallToAction3}>
                    <Text style={styles.textCallToAction3}>{item.link} </Text>
                    </View>
                  )}
                  {item.link.includes("trends2") &&(
                      <View  style={styles.boxCallToAction2}>
                    <Text style={styles.textCallToAction2}>{item.link} </Text>
                    <FontAwesome5 name="wpexplorer" size={50} color="rgba(92, 92, 92, 0.713)"  style={styles.icon} />

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
    bottom:width+300,
    right:width/2-100,
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
    marginTop:15,
    padding:10,

  },
  boxCallToAction2: {
    backgroundColor: "rgba(0, 0, 0, 0.538)",
    backgroundColor: "#e3cebc",
    width: width+50,
    height: width+50,
    position: "absolute",
    zIndex: 300,
    paddingTop:250,
    top:-250,
    right:-4,
    borderRadius:250,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 20,
    color: "#060B34",
  },
  textCallToAction2: {
    color: "rgb(245, 245, 245)",
    textAlign: "center",
    fontSize: 23,
    padding:10,
    marginTop:15,
    width:"50%",
    alignSelf:"center",
    fontWeight:"bold",
    
    
  },
  boxCallToAction3: {
    backgroundColor: "rgb(41, 40, 40)",
    width: 200,
    height: 200,
    position: "absolute",
    zIndex: 300,
    paddingTop:10,
    top:width-200,
    right:width/2-90,
    borderRadius:100,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 20,
    color: "#060B34",
  },
  textCallToAction3: {
    color: "rgb(245, 245, 245)",
    textAlign: "center",
    fontSize: 20,
    padding:10,
    marginTop:35,
    width:"75%",
    alignSelf:"center",
    fontWeight:"bold",
    
    
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
  icon:{
      alignSelf: "center",
  }
})
