import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { Radio } from "native-base";
import theme from "../../theme";

const RadioGroup = (props) => {
  return (
    <View style={styles.radioGroup}>
      <Text
        style={{
          flex: 1,
          // backgroundColor: "green",
          fontSize: theme.FONT_SIZE_MEDIUM,
        }}
      >
        {props.title}
      </Text>
      <Radio.Group
        style={{ flex: 2 }}
        name={props.name}
        onChange={(nextValue) => {
          return;
        }}
      >
        <Radio value={"1"} colorScheme="red" my={2}>
          {props.one}
        </Radio>
        <Radio value={"2"} colorScheme="red" my={2}>
          {props.two}
        </Radio>
        <Radio value={"3"} colorScheme="red" my={2}>
          {props.three}
        </Radio>
      </Radio.Group>
    </View>
  );
};

export default function HepaticDoseAdjustment() {
  return (
    <View>
      <RadioGroup
        name="billirubin"
        title="Bilirubin (Total)"
        one="<2 mg/dL"
        two="2-3 mg/dL"
        three=">3 mg/dL"
      />
      <RadioGroup
        name="billirubin"
        title="Bilirubin (Total)"
        one="<2 mg/dL"
        two="2-3 mg/dL"
        three=">3 mg/dL"
      />
      <RadioGroup
        name="billirubin"
        title="Bilirubin (Total)"
        one="<2 mg/dL"
        two="2-3 mg/dL"
        three=">3 mg/dL"
      />
      <RadioGroup
        name="billirubin"
        title="Bilirubin (Total)"
        one="<2 mg/dL"
        two="2-3 mg/dL"
        three=">3 mg/dL"
      />
      <RadioGroup
        name="billirubin"
        title="Bilirubin (Total)"
        one="<2 mg/dL"
        two="2-3 mg/dL"
        three=">3 mg/dL"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  radioGroup: {
    flexDirection: "row",
    // justifyContent: "space-between",
    marginTop: 10,
  },
});
