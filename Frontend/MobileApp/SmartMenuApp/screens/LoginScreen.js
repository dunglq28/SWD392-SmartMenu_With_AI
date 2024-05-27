import { View, StyleSheet } from "react-native";
import Button from "../components/UI/Button";

function LoginScreen({ navigation }) {

  function pressHandle() {
    navigation.navigate("HomeOverview");
  }

  return (
    <View style={styles.container}>
      <Button style={styles.button} onPress={pressHandle}>
        Login
      </Button>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
  },
});
