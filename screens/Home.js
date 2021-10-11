import * as React from "react";
import {
  Animated,
  Dimensions,
  Image,
  FlatList,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useState } from "react";



const Home = () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const scrollX = React.useRef(new Animated.Value(0)).current;


  const { width, height } = Dimensions.get("screen");
  const ITEM_WIDTH = width * 0.76;
  const ITEM_HEIGHT = ITEM_WIDTH * 1.47;
  const imageW = width/2;

  const images = [
    {
      img: "https://i.postimg.cc/28fhfXP2/home1.png",
      link: ">Check out our latest trends",
    },
    { img: "https://i.postimg.cc/cCsFRrC2/home2.png", link: "Categories" },
    {
      img: "https://i.postimg.cc/nrKszp6T/home3.png",
      link: "There is no place like home",
    },
    { img: "https://i.postimg.cc/HskSjcf7/home4.png", link: "" },
    { img: "https://i.postimg.cc/Wb6rpwVj/home5.png", link: "" },
  ];
  const data = images.map((image, index) => ({
    key: String(index),
    photo: image.img,
    link: image.link,
  }));

  const categories = [
    { src: "https://i.postimg.cc/tR8xRKn9/bat.jpg", category: "Bathroom" },
    { src: "https://i.postimg.cc/nzm4F3LR/home8.jpg", category: "Kitchenware" },
    { src: "https://i.postimg.cc/J4Q2C5tc/deco.jpg", category: "Decor" },
    {
      src: "https://i.postimg.cc/3wdn2zCV/gitfcard-Home.png",
      category: "GiftCard",
    },
    { src: "https://i.postimg.cc/R0mhJ9vz/sale.jpg", category: "sale" },
  ];

  //   const items = categories.map((obj, index) => (
  //     <div key={index} style={{ backgroundImage: `url('${obj.src}')` }}>
  //       <Link to={`/products/${obj.category}`}>
  //         <button className={styles.textButton}>{obj.category}</button>
  //       </Link>
  //     </div>
  //   ))

  const info = [
    { src: "./assets/6.png" },
    { src: "./assets/7.png" },
    { src: "./assets/8.png" },
    { src: "./assets/9.png" },
  ];

  const infoItems = info.map((obj, index) => (
    <div
      key={index}
      className={styles.infoItem}
      style={{ backgroundImage: `url('${obj.src}')` }}
    ></div>
  ));

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.FlatList
        LisHeaderComponent={
          <>
            <Text>Podría ir el nombre de la section</Text>
          </>
        }
        data={data}
        keyExtractor={(item) => item.key}
        showsHorizontalScrollIndicator={false}
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
          ];
          const translateY = scrollY.interpolate({
            inputRange,
            outputRange: [-height * 0.7, 0, height * 0.7],
          });

          return (
              <View>
                  {item.link == "Categories" && (
        <View>
          <FlatList
            data={categories}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    width:100,
                    height:500,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                    <Text style={styles.textCard}>
                      {item.category}
                    </Text>
                    <Image
                      source={{ uri: item.src }}
                      style={{
                        width: 100,
                        height: 400,
                        resizeMode: "cover",
                        borderRadius: 16,
                        shadowColor: "#000",
                        shadowOpacity: 0.5,
                        shadowOffset: {
                          width: 0,
                          height: 0,
                        },
                        shadowRadius: 20,
                      }}
                    />
                </View>
              );
            }}
          />
          <Text>Acá van mapeadas las categorías</Text>
        </View>
      )}
            <View
              style={{ width, justifyContent: "center", alignItems: "center" }}
            >
              <View>
                <View
                  style={{
                    width: width,
                    height: height,
                    overflow: "hidden",
                    alignItems: "center",
                  }}
                >
                  <Animated.Image
                    source={{ uri: item.photo }}
                    style={{
                      width: width,
                      height: height * 1.4,
                      resizeMode: "cover",
                      transform: [
                        {
                          translateY,
                        },
                      ],
                    }}
                  />
                </View>
                
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate("/", {
                        id: item._id,
                        title: item.link,
                      });
                    }}
                  >
                    <Text style={styles.textCard}>{item.link} </Text>
                  </TouchableOpacity>

              </View>
            </View>
            </View>
          );
        }}
        ListFooterComponent={<Text>algo más</Text>}
      />
    </View>
  );
};
export default Home;

const width = Dimensions.get("window").width - 40;

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
  textCard: {
    color: "#060B34",
    fontSize: 12,
    fontWeight: "normal",
    backgroundColor: "#fff",
  },
});
