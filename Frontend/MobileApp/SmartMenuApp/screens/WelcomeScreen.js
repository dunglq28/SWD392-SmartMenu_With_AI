import { View, StyleSheet } from "react-native";
import Button from "../components/UI/Button";

function WelcomeScreen({ navigation }) {
  
  function pressHandle() {
    navigation.navigate("Login");
  }

  return (
    <View style={styles.container}>
      <Button style={styles.button} onPress={pressHandle}>
        Start
      </Button>
    </View>
  );
}

export default WelcomeScreen;

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
