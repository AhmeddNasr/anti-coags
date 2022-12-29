import { View, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import { FormControl, Input, Select, CheckIcon, Button } from "native-base";
import { Checkbox } from "native-base";

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

function CheckboxInput(props) {
  return (
    <Checkbox
      disabled={false}
      colorScheme="red"
      value={props.value}
      onValueChange={(val) => {
        props.setter(val);
      }}
    >
      {props.title}
    </Checkbox>
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

function HeightInput(props) {
  return (
    <TextInputBlock
      title="Height"
      keyboardType="numeric"
      unit="cm"
      setter={props.setter}
      key="height"
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

function ConcamitantPgpInput(props) {
  return (
    <CheckboxInput
      title="Concomitant use of potent P-gp inhibitors"
      value={props.value}
      setter={props.setter}
    />
  );
}

function BleedingHistoryInput(props) {
  return (
    <CheckboxInput
      title="History of GI bleeding"
      value={props.value}
      setter={props.setter}
    />
  );
}

function NsaidUseInput(props) {
  return (
    <CheckboxInput
      title="Continuous Use of NSAIDs"
      value={props.value}
      setter={props.setter}
    />
  );
}

function AntiplateletUseInput(props) {
  return (
    <CheckboxInput
      title="Concurrent Use of Antiplatelet"
      value={props.value}
      setter={props.setter}
    />
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

export {
  AgeInput,
  GenderInput,
  WeightInput,
  ScrInput,
  ConcamitantPgpInput,
  SubmitButton,
  BleedingHistoryInput,
  AntiplateletUseInput,
  NsaidUseInput,
  HeightInput,
};
