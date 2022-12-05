import { View, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import { FormControl, Input, Select, CheckIcon, Button } from "native-base";
import theme from "../../theme";

function TextInputBlock(props) {
  return (
    <View style={styles.inputGroup}>
      <Text>{props.title}: </Text>
      <Input
        w={"75%"}
        keyboardType={props.keyboardType}
        InputRightElement={
          <Text style={styles.inputTextElement}>{props.unit}</Text>
        }
        onChangeText={(val) => props.setter(val)}
      />
    </View>
  );
}

function WeightInput(props) {
  return (
    <TextInputBlock
      title="Weight"
      keyboardType="numeric"
      unit="Kg"
      setter={props.setter}
      key="weight"
    />
  );
}

function AgeInput(props) {
  return (
    <TextInputBlock
      title="age"
      keyboardType="numeric"
      unit="years"
      setter={props.setter}
      key="age"
    />
  );
}

function ScrInput(props) {
  return (
    <TextInputBlock
      title="S.Cr"
      keyboardType="numeric"
      unit="mg/dL"
      setter={props.setter}
      key="scr"
    />
  );
}

function SubmitButton(props) {
  return (
    <Button onPress={() => props.calculate()} colorScheme="red" my={8}>
      Calculate Dose
    </Button>
  );
}

function GenderInput(props) {
  return (
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
        onValueChange={(val) => props.setter(val)}
      >
        <Select.Item label="Male" value="m" />
        <Select.Item label="Female" value="f" />
      </Select>
    </View>
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

export { AgeInput, GenderInput, WeightInput, ScrInput, SubmitButton };
