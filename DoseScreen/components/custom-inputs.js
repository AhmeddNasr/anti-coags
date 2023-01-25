import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import { FormControl, Select, CheckIcon } from "native-base";
import { Checkbox } from "native-base";

import theme from "../../theme";

function TextInputBlock(props) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{props.title}</Text>
      <TextInput
        // w={"75%"}
        // value="hi"
        cursorColor={theme.PRIMARY_COLOR}
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 15,
          padding: 10,
          paddingLeft: 20,
          borderWidth: 1,
          borderColor: "#EBEDF5",
        }}
        keyboardType={props.keyboardType}
        // InputRightElement={
        //   <Text style={styles.inputTextElement}>{props.unit}</Text>
        // }
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
      title="Weight (Kilograms)"
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
      title="Height (Centimeters)"
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
      title="Age (years)"
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
      title="S.Cr (mg/dL)"
      keyboardType="numeric"
      unit="mg/dL"
      setter={props.setter}
      key="scr"
    />
  );
}

function SubmitButton(props) {
  return (
    <Pressable
      onPress={() => props.calculate()}
      color={theme.SECONDARY_COLOR}
      my={8}
      title="Calculate Dose"
      style={{
        backgroundColor: theme.SECONDARY_COLOR,
        padding: 20,
        // width: 150,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: theme.TEXT_COLOR_WHITE,
          fontSize: theme.FONT_SIZE_MEDIUM,
        }}
      >
        Calculate Dose
      </Text>
    </Pressable>
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
      <Text style={styles.label}>Gender</Text>
      <GenderRadioGroup value={props.value} setter={props.setter} />
    </View>
  );
}

function GenderRadioGroup(props) {
  return (
    <View style={{ flexDirection: "row" }}>
      <RadioButton
        title="Male"
        value="m"
        selected={props.value}
        setter={props.setter}
      />
      <RadioButton
        title="Female"
        value="f"
        selected={props.value}
        setter={props.setter}
      />
    </View>
  );
}

function RadioButton(props) {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          flexDirection: "row",
          alignItems: "center",
          padding: 15,
          paddingLeft: 0,
          paddingRight: 30,
          opacity: pressed ? 0.6 : 1,
          // backgroundColor: "cyan",
        },
      ]}
      onPress={() => props.setter(props.value)}
    >
      <View
        style={[
          {
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: props.selected === props.value ? 7 : 1,
            borderColor:
              props.selected === props.value
                ? theme.SECONDARY_COLOR
                : theme.TEXT_COLOR_GRAY,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 20,
          },
          props.style,
        ]}
      />
      <Text
        style={{
          color: theme.PRIMARY_COLOR,
          fontWeight: "600",
          fontSize: theme.FONT_SIZE_MEDIUM,
        }}
      >
        {props.title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    // flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  inputTextElement: {
    marginRight: 20,
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: theme.PRIMARY_COLOR,
  },
  label: {
    color: theme.TEXT_COLOR_GRAY,
    fontSize: theme.FONT_SIZE_MEDIUM,
    marginBottom: 10,
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
  RadioButton,
};
