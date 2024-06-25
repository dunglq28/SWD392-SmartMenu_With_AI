import React from "react";
import { View, Text, ScrollView, StyleSheet, Image, FlatList, ImageBackground } from "react-native";
import { GlobalStyle } from "../constants/styles";

const categories = [
  { id: 1, name: "Cà phê" },
  { id: 2, name: "Sinh tố" },
  { id: 4, name: "Nước ép" },
  { id: 5, name: "Nước ép" },
  { id: 6, name: "Nước ép" },
  { id: 7, name: "Nước ép" },
  { id: 8, name: "Nước ép" },
  { id: 9, name: "Nước ép" },
  { id: 10, name: "Nước ép" },
];

const drinks = [
  {
    id: 1,
    name: "Espresso",
    category: "Cà phê",
    image: require("../assets/drinks.png"),
    price: 50000,
  },
  {
    id: 2,
    name: "Cà phê sữa đá",
    category: "Cà phê",
    image: require("../assets/drinks.png"),
    price: 45000,
  },
  {
    id: 3,
    name: "Sinh tố bơ",
    category: "Sinh tố",
    image: require("../assets/drinks.png"),
    price: 60000,
  },
  {
    id: 4,
    name: "Nước ép cam",
    category: "Nước ép",
    image: require("../assets/drinks.png"),
    price: 55000,
  },
  {
    id: 5,
    name: "Nước ép táo",
    category: "Nước ép",
    image: require("../assets/drinks.png"),
    price: 48000,
  },
  {
    id: 6,
    name: "Cacao",
    category: "Cà phê",
    image: require("../assets/drinks.png"),
    price: 52000,
  },
  {
    id: 7,
    name: "Sinh tố dưa hấu",
    category: "Sinh tố",
    image: require("../assets/drinks.png"),
    price: 58000,
  },
  {
    id: 8,
    name: "Nước dừa",
    category: "Nước ép",
    image: require("../assets/drinks.png"),
    price: 65000,
  },
];

const HomeScreen = () => {
  // Render item cho FlatList trong cart
  const renderDrinkItem = ({ item }) => (
    <View key={item.id} style={[styles.drinkItem, { backgroundColor: "#fff" }]}>
      <Image source={item.image} style={styles.drinkImage} />
      <Text style={styles.drinkName}>{item.name}</Text>
      <Text style={styles.drinkPrice}>
        {item.price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <ScrollView
        style={styles.sidebar}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Text style={styles.categoryTitle}>Loại đồ uống</Text>
        <View style={styles.categoryList}>
          {categories.map((category) => (
            <View key={category.id} style={styles.categoryItem}>
              <Text style={styles.categoryName}>{category.name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Cart */}
      <FlatList
        style={styles.cart}
        data={drinks}
        numColumns={3} // Số cột là 3
        renderItem={renderDrinkItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          // <ImageBackground
          //   source={require("../assets/backgroundTitle.png")} // Đường dẫn đến hình ảnh nền
          //   style={styles.cartHeaderBackground}
          // >
            <Text style={styles.cartTitle}>Món nước</Text>
          // </ImageBackground>
        }
        contentContainerStyle={{ padding: 20, paddingTop: 40 }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  sidebar: {
    flex: 1,
    backgroundColor: GlobalStyle.colors.sidebarColor,
    paddingTop: 40,
    paddingHorizontal: 5,
    maxWidth: "20%",
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    paddingHorizontal: 10,
    color: GlobalStyle.colors.titleColor,
  },
  categoryList: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 10,
  },
  categoryItem: {
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 10,
    marginRight: 10,
    backgroundColor: "#fff",
  },
  categoryName: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
    color: GlobalStyle.colors.textColor,
  },
  cart: {
    flex: 4,
    backgroundColor: GlobalStyle.colors.homeBackground,
  },
  cartHeaderBackground: {
    width: "100%",
    height: 150, // Chiều cao của hình ảnh nền
    justifyContent: "center",
    alignItems: "center",
  },
  cartTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: GlobalStyle.colors.titleColor,
  },
  drinkItem: {
    flex: 1,
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
  },
  drinkImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  drinkName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    color: GlobalStyle.colors.textColor,
  },
  drinkPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: GlobalStyle.colors.textColor,
  },
});
