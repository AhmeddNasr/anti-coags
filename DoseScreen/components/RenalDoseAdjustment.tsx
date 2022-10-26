import { View, StyleSheet, Text } from "react-native";
import { FormControl, Input, Select, CheckIcon, Button } from "native-base";
import { useEffect, useState } from "react";
import theme from "../../theme";
import calculateDose from "../../Utils/calculateDose";

export default function RenalDoseAdjustment(props) {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(0);
  const [scr, setScr] = useState(0);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [calculatedGFR, setCalculatedGFR] = useState(0);

  const updateState = (val, setter) => {
    setter(val);
  };

  const calculateGFR = () => {
    const factor = gender === "m" ? 1 : 0.85;
    const GFR = ((140 - age) * weight * factor) / (scr * 72);
    return GFR;
  };

  const calculateBMI = () => {
    return weight / Math.pow(height / 100, 2);
  };

  useEffect(() => {
    if (weight > 0 && height > 0 && gender.length === 1 && age > 0 && scr > 0) {
      setIsFormFilled(true);
    } else {
      setIsFormFilled(false);
    }
  }, [weight, height, gender, age, scr]);

  return (
    <>
      <FormControl isRequired>
        <View style={styles.inputGroup}>
          <Text>Weight: </Text>
          <Input
            w={"75%"}
            keyboardType="number-pad"
            InputRightElement={<Text style={styles.inputTextElement}>kg</Text>}
            onChangeText={(val) => updateState(val, setWeight)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text>Height: </Text>
          <Input
            w={"75%"}
            keyboardType="number-pad"
            InputRightElement={<Text style={styles.inputTextElement}>cm</Text>}
            onChangeText={(val) => updateState(val, setHeight)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text>Gender: </Text>
          <Select
            minWidth="200"
            accessibilityLabel="Choose gender"
            placeholder="Gender"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size={2} />,
            }}
            w={"75%"}
            onValueChange={(val) => updateState(val, setGender)}
          >
            <Select.Item label="Male" value="m" />
            <Select.Item label="Female" value="f" />
          </Select>
        </View>
        <View style={styles.inputGroup}>
          <Text>Age: </Text>
          <Input
            w={"75%"}
            keyboardType="number-pad"
            onChangeText={(val) => updateState(val, setAge)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text>S. Cr: </Text>
          <Input
            w={"75%"}
            keyboardType="number-pad"
            InputRightElement={
              <Text style={styles.inputTextElement}>mg/dL</Text>
            }
            onChangeText={(val) => updateState(val, setScr)}
          />
        </View>
        <Button
          colorScheme="red"
          isDisabled={!isFormFilled}
          onPress={() => {
            let info = {
              gfr: calculateGFR(),
              weight: weight,
              age: age,
              bmi: calculateBMI(),
            };
            console.log(info);
            setCalculatedGFR(calculateDose(props.drug.dose[0], info));
          }}
        >
          Calculate Dose
        </Button>
      </FormControl>
      {calculatedGFR ? <Text>{calculatedGFR}</Text> : null}
    </>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  inputTextElement: {
    marginRight: 20,
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: theme.PRIMARY_COLOR,
  },
});
