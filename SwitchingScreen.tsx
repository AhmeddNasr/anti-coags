import { Select, CheckIcon, Button, ScrollView } from "native-base";
import { View, StyleSheet, Text } from "react-native";
import { useState, useEffect } from "react";
import drugs from "./drugs";
import theme from "./theme";
import capitalizeFirstLetter from "./Utils/capitalizeFirstLetter";
export default function SwitchingScreen() {
  const [firstDrug, setFirstDrug] = useState(-1);
  const [secondDrug, setSecondDrug] = useState(-1);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={[styles.label, { marginTop: 0 }]}>Switch From</Text>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Select
            minWidth="200"
            accessibilityLabel="First drug"
            placeholder="From"
            w={"75%"}
            onValueChange={(value) => {
              if (value === secondDrug) {
                setSecondDrug(-1);
              }
              setFirstDrug(value);
            }}
            fontSize={theme.FONT_SIZE_MEDIUM}
            p={3}
            borderRadius={15}
            bgColor={theme.LIGHT_GREY}
            color={theme.MID_RED}
          >
            {drugs.map((drug, key) => {
              return (
                <Select.Item
                  label={capitalizeFirstLetter(drug.name)}
                  key={`Switch1-${key}`}
                  value={drug.id}
                />
              );
            })}
          </Select>
        </View>
        <Text style={styles.label}>Switch To</Text>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Select
            minWidth="200"
            accessibilityLabel="Second drug"
            placeholder="To"
            fontSize={theme.FONT_SIZE_MEDIUM}
            p={3}
            // _selectedItem={{
            //   bg: "teal.600",
            //   endIcon: <CheckIcon size={2} />,
            // }}
            w={"75%"}
            // mt={10}
            isDisabled={firstDrug === undefined || firstDrug === null}
            onValueChange={(value) => setSecondDrug(value)}
            borderRadius={15}
            bgColor={theme.LIGHT_GREY}
            color={theme.MID_RED}
          >
            {drugs.map((drug, key) => {
              if (drug.id === firstDrug) {
                return null;
              }
              return (
                <Select.Item
                  label={capitalizeFirstLetter(drug.name)}
                  key={key}
                  value={drug.id}
                />
              );
            })}
          </Select>
        </View>
        {/* <Text style={{ marginTop: 30 }}>first drug: {firstDrug}</Text>
      <Text style={{ marginTop: 0 }}>second drug: {secondDrug}</Text> */}
        <Results firstDrug={firstDrug} secondDrug={secondDrug} />
      </ScrollView>
    </View>
  );
}

function Results(props) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (props.firstDrug < 0 || props.secondDrug < 0) {
      return;
    }
    let firstDrug = drugs[props.firstDrug];
    let secondDrug = drugs[props.secondDrug];

    if (firstDrug.switching[secondDrug.name]) {
      setResults(firstDrug.switching[secondDrug.name]);
    } else if (firstDrug.switching[secondDrug.route]) {
      setResults(firstDrug.switching[secondDrug.route]);
    } else {
      setResults(firstDrug.switching["default"]);
    }
  }, [props.firstDrug, props.secondDrug]);

  if (props.firstDrug < 0 || props.secondDrug < 0) {
    // console.log("oops");
    return null;
  }

  // console.log(results);

  if (results.length !== 0) {
    return (
      <View>
        <Text style={[styles.label]}>Result</Text>
        {results.map((val, index) => {
          return (
            <Text style={styles.resultText} key={index}>
              {results.length > 1 ? index + 1 + ". " : null}
              {val}
            </Text>
          );
        })}
      </View>
    );
  } else {
    return <Text>ERROR {":("}</Text>;
  }
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    // alignItems: "center",
    margin: 20,
    marginTop: 0,
    paddingTop: 20,
  },
  label: {
    color: theme.MID_RED,
    fontSize: theme.FONT_SIZE_LARGE + 2,
    marginBottom: 20,
    marginTop: 20,
    fontWeight: "600",
    fontFamily: "Proxima-Nova",
  },
  resultText: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    marginBottom: 12,
    fontFamily: "Proxima-Nova",
  },
});
