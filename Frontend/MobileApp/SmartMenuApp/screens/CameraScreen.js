import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome icon
import { GlobalStyle } from "../constants/styles";

function CameraScreen() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Xin lỗi, chúng tôi cần quyền truy cập camera để thực hiện chức năng này!"
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      cameraType: ImagePicker.CameraType.front,
    });

    if (!result.cancelled) {
      setSelectedImage(result.assets[0].uri);
      console.log(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/phuclong.png")}
            style={styles.logo}
          />
        </View>
      </View>
      <Text style={styles.title}>Ứng dụng Menu Thông Minh</Text>
      <Image
        source={require("../assets/face-id.png")}
        style={styles.faceIcon}
      />
      <Text style={styles.instructions}>
        Đưa camera về phía mặt của bạn để quét
      </Text>
      <TouchableOpacity style={styles.button} onPress={openCamera}>
        <FontAwesome name="camera" size={40} color="white" />
        <Text style={styles.buttonText}>Quét Khuôn Mặt</Text>
      </TouchableOpacity>
      {/* {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      )} */}
    </ScrollView>
  );
}

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyle.colors.primary,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 30,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  faceIcon: {
    width: 350,
    height: 350,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  instructions: {
    fontSize: 16,
    color: "black",
    marginBottom: 20,
  },
  button: {
    backgroundColor: GlobalStyle.colors.darken50,
    paddingTop: 20,
    paddingRight: 30,
    paddingBottom: 20,
    paddingLeft: 30,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    marginLeft: 10,
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
    borderWidth: 2,
    borderColor: "white",
  },
});
