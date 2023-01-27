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
import Icon from "react-native-vector-icons/MaterialIcons";

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
    // <Checkbox
    //   disabled={false}
    //   colorScheme="red"
    //   value={props.value}
    //   onValueChange={(val) => {
    //     props.setter(val);
    //   }}
    // >
    //   {props.title}
    // </Checkbox>
    <Pressable
      onPress={() => {
        props.setter(!props.value);
      }}
      {...props}
      // style={{
      //   flexDirection: "row",
      //   alignItems: "center",
      //   paddingTop: 7.5,
      //   paddingBottom: 7.5,
      // }}
      style={({ pressed }) => [
        {
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 7.5,
          paddingBottom: 7.5,
          opacity: pressed ? 0.65 : 1,
        },
      ]}
    >
      <Icon
        size={30}
        color={props.value ? theme.SECONDARY_COLOR : theme.TEXT_COLOR_GRAY}
        name={props.value ? "check-box" : "check-box-outline-blank"}
        style={{ marginRight: 8 }}
      />
      <Text
        style={{
          fontSize: theme.FONT_SIZE_MEDIUM,
          color: theme.PRIMARY_COLOR,
          fontWeight: "600",
        }}
      >
        {props.title}
      </Text>
    </Pressable>
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
      style={({ pressed }) => ({
        backgroundColor: theme.SECONDARY_COLOR,
        padding: 20,
        // width: 150,
        borderRadius: 15,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
        opacity: pressed ? 0.75 : 1,
      })}
    >
      <Text
        style={{
          color: theme.TEXT_COLOR_WHITE,
          fontSize: theme.FONT_SIZE_MEDIUM,
          fontWeight: "700",
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

function Label(props) {
  return <Text style={styles.label}>{props.title}</Text>;
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

function HepaticRadioGroup(props) {
  return (
    <View>
      <Label title={props.title} />
      <RadioButton
        title={props.one}
        value={1}
        selected={props.value}
        setter={props.setter}
      />
      <RadioButton
        title={props.two}
        value={2}
        selected={props.value}
        setter={props.setter}
      />
      <RadioButton
        title={props.three}
        value={3}
        selected={props.value}
        setter={props.setter}
      />
    </View>
  );
}

function HepaticAdjustment(props) {
  const [billirubin, setBillirubin] = useState(-1);
  const [albumin, setAlbumin] = useState(-1);
  const [inr, setInr] = useState(-1);
  const [ascites, setAscites] = useState(-1);
  const [encephalopathy, setEncephalopathy] = useState(-1);

  useEffect(() => {
    let score = billirubin + albumin + inr + ascites + encephalopathy;
    if (score >= 5) {
      props.setter(score);
    }
  }, [billirubin, albumin, inr, ascites, encephalopathy]);
  return (
    <View style={{ marginBottom: 20 }}>
      <Text
        style={{
          fontSize: theme.FONT_SIZE_EXTRA_LARGE,
          marginBottom: 15,
          color: theme.PRIMARY_COLOR,
          fontWeight: "600",
        }}
      >
        Child-Pugh Score:
      </Text>
      <HepaticRadioGroup
        title="Bilirubin (Total)"
        one="<2 mg/dL"
        two="2-3 mg/dL"
        three=">3 mg/dL"
        value={billirubin}
        setter={setBillirubin}
      />
      <HepaticRadioGroup
        title="Albumin"
        one="<3.5 g/dL"
        two="2.8-3.5 g/dL"
        three="<2.8 g/dL"
        value={albumin}
        setter={setAlbumin}
      />
      <HepaticRadioGroup
        title="INR"
        one="<1.7"
        two="1.7-2.2"
        three=">2.2"
        value={inr}
        setter={setInr}
      />
      <HepaticRadioGroup
        title="Ascites"
        one="Absent"
        two="Slight"
        three="Moderate"
        value={ascites}
        setter={setAscites}
      />
      <HepaticRadioGroup
        title="Encephalopathy"
        one="No Encephalopathy"
        two="Grade 1-2"
        three="Grade 3-4"
        value={encephalopathy}
        setter={setEncephalopathy}
      />
    </View>
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
  Label,
  CheckboxInput,
  HepaticAdjustment,
};
