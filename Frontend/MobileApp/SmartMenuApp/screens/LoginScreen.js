import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { GlobalStyle } from "../constants/styles";
import Icon from "react-native-vector-icons/Ionicons";
// import SvgUri from 'react-native-svg-uri';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function LoginScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  // Function to handle login button press
  const handleLogin = () => {
    // Navigate to Home or Dashboard screen after login
    navigation.navigate("HomeOverview");
  };

  const handleShowClick = () => setShowPassword(!showPassword);

  const loginHandler = () => {
    navigation.navigate("HomeOverview");
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.leftContainer}>
        <Image source={require("../assets/wave.png")} style={styles.wave} />
        {/* <SvgUri uri={require("../assets/bg.svg")} style={styles.bg} /> */}
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.formContainer}>
          <View style={styles.headerContainer}>
            <Image
              source={require("../assets/avatar.svg")}
              style={styles.avatar}
            />
            <Text style={styles.welcomeText}>CHÀO MỪNG</Text>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputGroup}>
              <Icon name="person" size={20} color="gray" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Tên đăng nhập"
                // value={credentials.username}
                // onChangeText={(text) => handleChange("username", text)}
                // onKeyPress={handleKeyPress}
              />
            </View>
            <View style={styles.inputGroup}>
              <Icon
                name="lock-closed"
                size={20}
                color="gray"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                secureTextEntry={!showPassword}
                // value={credentials.password}
                // onChangeText={(text) => handleChange("password", text)}
                // onKeyPress={handleKeyPress}
              />
              <TouchableOpacity
                onPress={handleShowClick}
                style={styles.showPasswordButton}
              >
                <Text>{showPassword ? "Ẩn" : "Hiện"}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={loginHandler}>
            <Text style={styles.loginButtonText}>ĐĂNG NHẬP</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  leftContainer: {
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  wave: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  bg: {
    height: "100%",
    width: "100%",
    zIndex: 0,
    marginLeft: "30%",
  },
  rightContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "80%",
    alignItems: "center",
  },
  headerContainer: {
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 20,
  },
  inputContainer: {
    width: "100%",
    marginTop: 30,
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 20,
  },
  icon: {
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    padding: 10,
  },
  showPasswordButton: {
    padding: 10,
  },
  loginButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#b9d7d5",
    alignItems: "center",
    borderRadius: 5,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
