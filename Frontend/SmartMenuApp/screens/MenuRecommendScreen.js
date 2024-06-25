import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FullMenu from "../assets/fullMenu.svg";

function MenuRecommendScreen() {
  return (
    <View style={styles.container}>
      <FullMenu width="100%" height="100%" />

      <View style={styles.subContainer}>
        <Text>Full Menu</Text>
        <Text>Full Menu</Text>
        <Text>Full Menu</Text>
        <Text>Full Menu</Text>
        <Text>Full Menu</Text>
        <Text>Full Menu</Text>
        <Text>Full Menu</Text>
        <Text>Full Menu</Text>
        <Text>Full Menu</Text>
        <Text>Full Menu</Text>
        <Text>Full Menu</Text>
        <Text>Full Menu</Text>
      </View>
    </View>
  );
}

export default MenuRecommendScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B8D7D5",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  subContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
    // backgroundColor: "#ccc",
  },
});
