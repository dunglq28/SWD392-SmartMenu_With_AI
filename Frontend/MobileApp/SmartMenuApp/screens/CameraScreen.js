import { StyleSheet, Text, View } from "react-native";

function CameraScreen() {
  return (
    <View style={styles.container}>
      <Text>Camera Screen</Text>
    </View>
  );
}

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
