import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { useState } from "react";

export default function DoseScreen() {
  const [activeSection, setActiveSection] = useState("");

  return (
    <View>
      <Text>{activeSection}</Text>
      <View style={styles.ButtonGroup}>
        <TouchableOpacity
          onPress={() => {
            setActiveSection("Renal");
          }}
          style={[
            styles.Button,
            activeSection === "Renal" ? styles.ButtonActive : null,
          ]}
        >
          <Text style={styles.ButtonText}>Renal Impairment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setActiveSection("Dialysis");
          }}
          style={[
            styles.Button,
            activeSection === "Dialysis" ? styles.ButtonActive : null,
          ]}
        >
          <Text style={styles.ButtonText}>Hemodialysis</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setActiveSection("Hepatic");
          }}
          style={[
            styles.Button,
            activeSection === "Hepatic" ? styles.ButtonActive : null,
          ]}
        >
          <Text style={styles.ButtonText}>Hepatic impairment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ButtonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  Button: {
    borderColor: "gray",
    marginTop: 20,
    padding: 30,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },
  ButtonActive: {
    backgroundColor: "orange",
  },
  ButtonText: {
    color: "white",
  },
});
