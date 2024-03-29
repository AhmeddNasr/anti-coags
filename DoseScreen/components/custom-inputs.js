import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

import theme from "../../theme";
import capitalizeFirstLetter from "../../Utils/capitalizeFirstLetter";

function TextInputBlock(props) {
  return (
    <View style={[styles.inputGroup, props.style]}>
      <Text style={styles.label}>{props.title}</Text>
      {/* Input */}
      <TextInput
        editable={props.disabled}
        cursorColor={theme.PRIMARY_COLOR}
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 15,
          padding: 10,
          paddingLeft: 20,
          borderWidth: 1,
          borderColor: props.error ? theme.ERROR_COLOR : "#EBEDF5",
        }}
        keyboardType={props.keyboardType}
        value={props.value}
        onBlur={() => {
          // console.log("blur!");
          props.setTouched(true);
        }}
        // InputRightElement={
        //   <Text style={styles.inputTextElement}>{props.unit}</Text>
        // }
        onChangeText={(val) => props.setter(val)}
      />
      {/* Error validation */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 5,
          marginBottom: 5,
        }}
      >
        <Icon
          name="error"
          color={props.error ? theme.ERROR_COLOR : theme.BACKGROUND_COLOR}
          style={{ marginRight: 5 }}
          size={16}
        />
        <Text
          style={{
            color: props.error ? theme.ERROR_COLOR : theme.BACKGROUND_COLOR,
            fontSize: 13,
          }}
        >
          {props.error}
        </Text>
      </View>
    </View>
  );
}

function CheckboxInput(props) {
  return (
    <Pressable
      onPress={() => {
        props.setter(!props.value);
      }}
      {...props}
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
          color: "black",
          fontWeight: "600",
        }}
      >
        {props.title}
      </Text>
    </Pressable>
  );
}

function DoseType(props) {
  return (
    <>
      <Text
        style={{
          fontSize: theme.FONT_SIZE_EXTRA_LARGE,
          marginBottom: 15,
          marginTop: 20,
          color: "black",
          fontWeight: "600",
          fontFamily: "inter-font",
        }}
      >
        Dose Type
      </Text>
      <RadioButton
        title={"Initial Dose"}
        value={"initial"}
        selected={props.value}
        setter={props.setter}
      />
      <RadioButton
        title={"Maintenance Dose"}
        value={"maintenance"}
        selected={props.value}
        setter={props.setter}
      />
    </>
  );
}

function WeightInput(props) {
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    if (!touched) {
      return;
    }
    validateInput(30, 200, setError, error, props.value, "kg");
  }, [props.value, touched]);
  return (
    <TextInputBlock
      title="Weight (Kilograms)"
      keyboardType="numeric"
      unit="Kg"
      setter={props.setter}
      key="weight"
      value={props.value}
      error={error === "" ? null : error}
      setTouched={setTouched}
      disabled={props.disabled}
    />
  );
}

function InrInput(props) {
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    if (!touched) {
      return;
    }
    validateInput(0, 20, setError, error, props.value, "");
  }, [props.value, touched]);
  return (
    <>
      {props.doseType !== "" ? (
        <>
          <Text
            style={{
              fontSize: theme.FONT_SIZE_EXTRA_LARGE,
              marginBottom: 15,
              marginTop: 20,
              color: "black",
              fontWeight: "600",
              fontFamily: "inter-font",
            }}
          >
            Patient Information
          </Text>
          <Text style={styles.label}>Anti-Coagulation Goal</Text>
          {props.doseType === "maintenance" ? (
            <>
              <RadioButton
                title="Regular-intensity Anticoagulation"
                value={"regular"}
                selected={props.goalValue}
                setter={props.goalSetter}
              />
              <RadioButton
                title="High-intensity Anticoagulation"
                value={"high"}
                selected={props.goalValue}
                setter={props.goalSetter}
              />
            </>
          ) : null}
          <TextInputBlock
            title={props.doseType === "initial" ? "INR on day 4" : "INR"}
            keyboardType="numeric"
            unit=""
            setter={props.setter}
            value={props.value}
            error={error === "" ? null : error}
            setTouched={setTouched}
            disabled={props.disabled}
          />
        </>
      ) : null}
    </>
  );
}

function HeightInput(props) {
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    if (!touched) {
      return;
    }
    validateInput(100, 250, setError, error, props.value, "cm");
  }, [props.value, touched]);
  return (
    <TextInputBlock
      title="Height (Centimeters)"
      keyboardType="numeric"
      unit="cm"
      setter={props.setter}
      key="height"
      value={props.value}
      error={error === "" ? null : error}
      setTouched={setTouched}
      disabled={props.disabled}
    />
  );
}

function AgeInput(props) {
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    if (!touched) {
      return;
    }
    validateInput(12, 110, setError, error, props.value, "years");
  }, [props.value, touched]);
  return (
    <TextInputBlock
      title="Age (years)"
      keyboardType="numeric"
      unit="years"
      setter={props.setter}
      key="age"
      value={props.value}
      error={error === "" ? null : error}
      setTouched={setTouched}
      disabled={props.disabled}
    />
  );
}
let timer;
function validateInput(min, max, setError, error, value, unit) {
  if (value === null) {
    return;
  }
  clearTimeout(timer);
  timer = setTimeout(() => {
    if (value < min || value > max || value === "") {
      setError("Must be between " + min + " and " + max + " " + unit);
    } else if (error !== "") {
      setError("");
    }
  }, 100);
}

function ScrInput(props) {
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    if (!touched) {
      return;
    }
    validateInput(0.1, 70, setError, error, props.value, "mg/dL");
  }, [props.value, touched]);
  return (
    <TextInputBlock
      title="S.Cr (mg/dL)"
      keyboardType="numeric"
      unit="mg/dL"
      setter={props.setter}
      key="scr"
      value={props.value}
      error={error === "" ? null : error}
      setTouched={(val) => setTouched(val)}
      disabled={props.disabled}
    />
  );
}

function ApttInput(props) {
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    if (!touched) {
      return;
    }
    validateInput(1, 200, setError, error, props.value, "seconds");
  }, [props.value, touched]);
  return (
    <TextInputBlock
      title="aPTT (seconds)"
      keyboardType="numeric"
      setter={props.setter}
      key="aptt"
      value={props.value}
      error={error === "" ? null : error}
      setTouched={(val) => setTouched(val)}
      disabled={props.disabled}
      style={{ marginBottom: 40 }}
    />
  );
}

function CustomButton(props) {
  return (
    <Pressable
      onPress={() => props.handlePress()}
      color={theme.SECONDARY_COLOR}
      style={({ pressed }) => ({
        backgroundColor: theme.LIGHT_GREY,
        padding: 20,
        // width: 150,
        borderRadius: 25,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
        opacity: pressed ? 0.5 : 1,
        width: 150,
      })}
    >
      <Text
        style={{
          color: theme.MID_RED,
          fontSize: theme.FONT_SIZE_MEDIUM,
          fontWeight: "600",
        }}
      >
        {capitalizeFirstLetter(props.title)}
      </Text>
    </Pressable>
  );
}

function SubmitButton(props) {
  return (
    <>
      <Pressable
        onPress={() => props.calculate()}
        color={theme.SECONDARY_COLOR}
        my={8}
        disabled={!props.validInput || props.disabled}
        style={({ pressed }) => ({
          backgroundColor: "white",
          borderColor: theme.SECONDARY_COLOR,
          borderWidth: 1,
          padding: 20,
          // width: 150,
          borderRadius: 25,
          marginTop: 20,
          justifyContent: "center",
          alignItems: "center",
          transform: [{ scale: pressed ? 1.01 : 1 }],
          opacity: props.validInput ? (pressed ? 0.7 : 1) : 0.6,
        })}
      >
        {({ pressed }) => (
          <Text
            style={{
              color: theme.SECONDARY_COLOR,
              fontSize: theme.FONT_SIZE_MEDIUM,
              fontWeight: "600",
              fontFamily: "Proxima-Nova",
            }}
          >
            {props.buttonTitle ? props.buttonTitle : "Calculate Dose"}
          </Text>
        )}
      </Pressable>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 5,
          marginBottom: 5,
        }}
      >
        <Icon
          name="error"
          color={!props.validInput ? theme.ERROR_COLOR : theme.BACKGROUND_COLOR}
          style={{ marginRight: 5 }}
          size={16}
        />
        <Text
          style={{
            color: !props.validInput
              ? theme.ERROR_COLOR
              : theme.BACKGROUND_COLOR,
            fontSize: 13,
          }}
        >
          You must fill all the required fields
        </Text>
      </View>
    </>
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
          color: "black",
          fontWeight: "600",
          fontSize: theme.FONT_SIZE_MEDIUM,
        }}
      >
        {props.title}
      </Text>
    </Pressable>
  );
}

function PlateletCountGroup(props) {
  return (
    <View>
      <Label title={"Platelet Count (Billion/Liter)"} />
      <RadioButton
        title={"> 100"}
        value={4}
        selected={props.value}
        setter={props.setter}
      />
      <RadioButton
        title={"50-100"}
        value={1}
        selected={props.value}
        setter={props.setter}
      />
      <RadioButton
        title={"30-50"}
        value={2}
        selected={props.value}
        setter={props.setter}
      />
      <RadioButton
        title={"< 30"}
        value={3}
        selected={props.value}
        setter={props.setter}
      />
    </View>
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
    if (
      billirubin !== -1 &&
      albumin !== -1 &&
      inr !== -1 &&
      ascites !== -1 &&
      encephalopathy !== -1
    ) {
      props.setter(billirubin + albumin + inr + ascites + encephalopathy);
      if (!props.hepaticValid) {
        props.setHepaticValid(true);
      }
    }
  }, [billirubin, albumin, inr, ascites, encephalopathy]);
  return (
    <View style={{ marginBottom: 20 }}>
      <Text
        style={{
          fontSize: theme.FONT_SIZE_EXTRA_LARGE,
          marginBottom: 15,
          marginTop: 20,
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
    // marginBottom: 20,
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
    marginTop: 6,
    fontFamily: "Proxima-Nova",
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
  CustomButton,
  PlateletCountGroup,
  ApttInput,
  DoseType,
  InrInput,
};
