import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { Radio } from "native-base";
import theme from "../../theme";

const IPressable = (props) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.pressable,
        props.middle
          ? {
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: "#00000090",
            }
          : null,
        pressed
          ? {
              backgroundColor: theme.PRIMARY_COLOR_70,
              color: theme.TEXT_COLOR_WHITE,
            }
          : null,
      ]}
    >
      <Text style={styles.text}>{props.title}</Text>
      <Text style={{ color: "gray" }}>+{props.value}</Text>
    </Pressable>
  );
};

const RadioGroup = (props) => {
  return (
    <View style={styles.group}>
      <Text
        style={{
          flex: 1,
          // backgroundColor: "green",
          fontSize: theme.FONT_SIZE_MEDIUM,
        }}
      >
        {props.title}
      </Text>
      <View style={styles.radioGroup}>
        <IPressable title={props.one} value={1} />
        <IPressable title={props.two} value={2} middle />
        <IPressable title={props.three} value={3} />
      </View>
    </View>
  );
};

export default function HepaticDoseAdjustment() {
  return (
    <View>
      <RadioGroup
        title="Bilirubin (Total)"
        one="<2 mg/dL"
        two="2-3 mg/dL"
        three=">3 mg/dL"
      />
      <RadioGroup
        title="Albumin"
        one="<3.5 g/dL"
        two="2.8-3.5 g/dL"
        three="<2.8 g/dL"
      />
      <RadioGroup title="INR" one="<1.7" two="1.7-2.2" three=">2.2" />
      <RadioGroup title="Ascites" one="Absent" two="Slight" three="Moderate" />
      <RadioGroup
        title="Encephalopathy"
        one="No Encephalopathy"
        two="Grade 1-2"
        three="Grade 3-4"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    flexDirection: "row",
    // justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
  },
  radioGroup: {
    flex: 2,
    borderWidth: 1,
    borderColor: "#00000080",
    borderRadius: 7,
  },
  pressable: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  text: {
    fontSize: theme.FONT_SIZE_MEDIUM,
  },
});
