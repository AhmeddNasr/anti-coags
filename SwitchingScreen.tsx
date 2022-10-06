import { Select, CheckIcon, Button } from "native-base";
import { View, StyleSheet } from "react-native";
import { useState } from "react";
import drugs from "./drugs";

export default function SwitchingScreen() {
  const [firstDrug, setFirstDrug] = useState("");
  const [secondDrug, setSecondDrug] = useState("");

  return (
    <View style={styles.container}>
      <Select
        minWidth="200"
        accessibilityLabel="First drug"
        placeholder="From"
        _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size={2} />,
        }}
        w={"75%"}
        mt={10}
      >
        {drugs.map((drug, key) => {
          return (
            <Select.Item
              label={drug.name}
              key={key}
              value={drug.id.toString()}
            />
          );
        })}
      </Select>

      <Select
        minWidth="200"
        accessibilityLabel="Second drug"
        placeholder="To"
        _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size={2} />,
        }}
        w={"75%"}
        mt={10}
      >
        {drugs.map((drug, key) => {
          return (
            <Select.Item
              label={drug.name}
              key={key}
              value={drug.id.toString()}
            />
          );
        })}
      </Select>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    alignItems: "center",
  },
});
