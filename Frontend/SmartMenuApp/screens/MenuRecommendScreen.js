import React from "react";
import { Image, StyleSheet, View } from "react-native";

function MenuRecommendScreen() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: "https://smart-menu-with-ai.s3.ap-southeast-1.amazonaws.com/menus/XZ5Z4070018266DFF",
        }}
      />
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
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
