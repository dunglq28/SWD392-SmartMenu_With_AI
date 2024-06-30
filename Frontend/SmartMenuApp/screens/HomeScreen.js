import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { GlobalStyle } from "../constants/styles";
import { drinks } from "../Data/drinks";
import AsyncStorage from "@react-native-async-storage/async-storage";
 

const categories = [
  { id: 1, name: "Cà phê" },
  { id: 2, name: "Sinh tố" },
  { id: 3, name: "Nước ép" },

];

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id); // Ban đầu chọn danh mục đầu tiên làm active

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

  // Xử lý khi chọn một danh mục
  const handleCategoryPress = (categoryId) => {
    setActiveCategory(categoryId); // Cập nhật danh mục được chọn
  };

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <ScrollView
        style={styles.sidebar}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <ImageBackground
          source={require("../assets/bgTitle.png")}
          style={styles.categoryTitle}
        >
          <Text style={styles.categoryTitleText}>Loại đồ uống</Text>
        </ImageBackground>
        <View style={styles.categoryList}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryItem,
                category.id === activeCategory
                  ? styles.activeCategoryItem
                  : null,
              ]}
              onPress={() => handleCategoryPress(category.id)}
            >
              <Text
                style={[
                  styles.categoryName,
                  category.id === activeCategory
                    ? styles.activeCategoryText
                    : null,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Cart */}
      <View style={styles.cartContainer}>
        <View style={styles.cartHeader}>
          <ImageBackground
            source={require("../assets/bgTitle2.png")}
            style={styles.cartTitle}
          >
            <Text style={styles.cartTitleText}>Món nước</Text>
          </ImageBackground>
          <Image
            source={require("../assets/phuclong.png")}
            style={styles.brandImage}
          />
        </View>
        <FlatList
          style={styles.cart}
          data={drinks.filter(
            (item) =>
              item.category ===
              categories.find((cat) => cat.id === activeCategory).name
          )}
          numColumns={3}
          renderItem={renderDrinkItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        />
      </View>
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
    paddingTop: 58,
    paddingHorizontal: 5,
    maxWidth: "20%",
  },
  categoryTitle: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 50,
  },
  categoryTitleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: GlobalStyle.colors.titleColor,
  },
  categoryList: {
    flex: 1,
    justifyContent: "flex-start",
    borderRadius: 8,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  categoryItem: {
    alignItems: "center",
    paddingVertical: 15,
    marginBottom: 14,
    marginRight: 10,
    borderRadius: 8,
  },
  activeCategoryItem: {
    backgroundColor: GlobalStyle.colors.darken50,
  },
  activeCategoryText: {
    color: "#fff",
  },
  categoryName: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
    color: GlobalStyle.colors.textColor,
  },
  cartContainer: {
    flex: 4,
    backgroundColor: GlobalStyle.colors.homeBackground,
  },
  cartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 38,
    marginBottom: 4,
    paddingHorizontal: 20,
    zIndex: 999,
  },
  cartTitle: {
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    height: 50,
  },
  cartTitleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: GlobalStyle.colors.titleColor,
  },
  brandImage: {
    width: 80,
    height: 80,
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
