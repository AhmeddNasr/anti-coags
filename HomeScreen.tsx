import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Dose");
        }}
        style={styles.Button}
      >
        <Text>Dose Modification</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Switching");
        }}
        style={styles.Button}
      >
        <Text>Switching</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Choosing");
        }}
        style={styles.Button}
      >
        <Text>Choosing a Suitable Anti-coagulant</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Warning");
        }}
        style={{ ...styles.Button, borderBottomWidth: 1 }}
      >
        <Text>Special Warnings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  Button: {
    borderColor: "gray",
    borderTopWidth: 1,
    // borderBottomWidth: 1,
    marginBottom: 10,
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
