import { Select, CheckIcon, Button } from "native-base";
import { View, StyleSheet, Text } from "react-native";
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
        onValueChange={(value) => {
          if (value === secondDrug) {
            setSecondDrug("");
          }
          setFirstDrug(value);
        }}
      >
        {drugs.map((drug, key) => {
          return (
            <Select.Item
              label={drug.name}
              key={`Switch1-${key}`}
              value={drug.name}
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
        isDisabled={firstDrug === ""}
        onValueChange={(value) => setSecondDrug(value)}
      >
        {drugs.map((drug, key) => {
          if (drug.name === firstDrug) {
            return null;
          }
          return <Select.Item label={drug.name} key={key} value={drug.name} />;
        })}
      </Select>
      <Text style={{ marginTop: 30 }}>first drug: {firstDrug}</Text>
      <Text style={{ marginTop: 0 }}>second drug: {secondDrug}</Text>

      {firstDrug !== "" && secondDrug !== "" && (
        <Results firstDrug={firstDrug} secondDrug={secondDrug} />
      )}
    </View>
  );
}

function Results(props) {
  const [drug1Switching, setDrug1Switching] = useState({});
  const [drug2Name, setDrug2Name] = useState("");
  const [results, setResults] = useState([]);
  for (let i = 0; i < drugs.length; i++) {
    if (props.firstDrug === drugs[i].name) {
      setDrug1Switching(drugs[i].switching);
    } else if (props.secondDrug === drugs[i].name) {
      setDrug2Name(drugs[i].name);
    }
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    alignItems: "center",
  },
});
