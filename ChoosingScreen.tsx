import { Text, StyleSheet, ScrollView, View } from "react-native";
import { useState } from "react";
import theme from "./theme";
import GenerateInputs from "./DoseScreen/components/GenerateInputs";
import {
  CheckboxInput,
  RadioButton,
} from "./DoseScreen/components/custom-inputs";
import calculateGFR from "./Utils/calculateGFR";

export default function ChoosingScreen() {
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("m");
  const [indication, setIndication] = useState("");
  const [platlet, setPlatlet] = useState(1);
  const [renalAdjustment, setRenalAdjustment] = useState(true);
  const [hepaticAdjustment, setHepaticAdjustment] = useState(true);
  const [allContra, setAllContra] = useState(false);
  const [scr, setScr] = useState(0);
  const indications = ["af", "dvtt", "dvtp"];

  let rivaroxaban = {
    contra: false,
    dose: "",
  };
  let edoxaban = {
    contra: false,
    dose: "",
  };
  let apixaban = {
    contra: false,
    dose: "",
  };
  let heparin = {
    contra: false,
    dose: "",
  };
  let warfarin = {
    contra: false,
    dose: "",
  };
  let enoxaparin = {
    contra: false,
    dose: "",
  };
  let fondaparinux = {
    contra: false,
    dose: "",
  };

  function calculate() {
    if (indication === "") {
      return;
    }
    if (indication === "af") {
      if (platlet === 1) {
        apixaban.dose = "Reduced dose (2.5 mg twice daily)";
        rivaroxaban.dose = "Reduced dose (15mg twice daily)";
        enoxaparin.contra = true;
        fondaparinux.contra = true;
      } else {
        return setAllContra(true);
      }
    } else if (indication === "dvtt") {
      if (platlet === 2) {
        apixaban.contra = true;
        rivaroxaban.contra = true;
        edoxaban.contra = true;
        enoxaparin.dose =
          "In case of high bleedin risk: 50% reduction of dose or prophylactic dose";
      } else {
        return setAllContra(true);
      }
    } else if (indication === "dvtp") {
      if (platlet !== 1) {
        return setAllContra(true);
      }
    }

    if (renalAdjustment) {
      let gfr = calculateGFR(gender, age, weight, scr);
      if (gfr < 15) {
        edoxaban.contra = true;
        rivaroxaban.contra = true;
        apixaban.contra = true;
        enoxaparin.contra = true;
      } else if (gfr > 95) {
        edoxaban.contra = true;
      }
    }

    if (hepaticAdjustment) {
      if (hepatic >= 10) {
        edoxaban.contra = true;
        rivaroxaban.contra = true;
        apixaban.contra = true;
      } else if (hepatic >= 7) {
        edoxaban.contra = true;
        rivaroxaban.contra = true;
      }
    }

    console.log(
      rivaroxaban,
      apixaban,
      warfarin,
      fondaparinux,
      edoxaban,
      heparin
    );
  }
  return (
    <ScrollView style={styles.container}>
      {/* TODO DRY */}
      <View style={{ padding: 25, paddingTop: 0 }}>
        <Text style={[styles.header, { marginTop: 0 }]}>Indication</Text>
        {indications.map((val, index) => {
          return (
            <RadioButton
              title={
                val === "dvtp"
                  ? "DVT Prophylaxis"
                  : val === "dvtt"
                  ? "DVT Treatment"
                  : "Atrial Fibrillation"
              }
              value={val}
              selected={indication}
              setter={setIndication}
              key={"indicationRadio-" + index}
            />
          );
        })}
        <Text style={[styles.header]}>Adjustment Type</Text>
        <CheckboxInput
          title="Renal Dose Adjustment"
          setter={setRenalAdjustment}
          value={renalAdjustment}
        />
        <CheckboxInput
          title="Hepatic Dose Adjustment"
          setter={setHepaticAdjustment}
          value={hepaticAdjustment}
        />
        <Text style={[styles.header]}>Patient Information</Text>
        <GenerateInputs
          platlet={platlet}
          setPlatlet={setPlatlet}
          age={age}
          setAge={setAge}
          weight={weight}
          setWeight={setWeight}
          gender={gender}
          setGender={setGender}
          scr={scr}
          setScr={setScr}
          calculate={calculate}
          buttonTitle={"Find Suitable Drug"}
          renalAdjustment={renalAdjustment}
          hepaticAdjustment={hepaticAdjustment}
          renalOnlyParams={["age", "weight"]}
        />
      </View>
      <View
        style={{
          // height: 100,
          padding: 20,
          paddingBottom: 50,
          // marginBottom: 20,
          backgroundColor: theme.BLUE_COLOR,
        }}
      >
        <Text
          style={{
            fontFamily: "inter",
            color: theme.TEXT_COLOR_WHITE,
            fontSize: theme.FONT_SIZE_EXTRA_LARGE,
            marginBottom: 15,
          }}
        >
          Suitable Drugs:
        </Text>
        <Text style={styles.resultDrug}>Apixaban</Text>
        <Text style={styles.resultDrug}>Rivaroxaban</Text>
        <Text style={styles.resultDrug}>Edoxaban</Text>
        <Text style={styles.resultDrug}>Warfarin</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // margin: 25,
    // padding: 25,
    paddingTop: 10,
    // paddingBottom: 50,
    flex: 1,
  },
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
  //TODO DRY
  header: {
    fontSize: theme.FONT_SIZE_EXTRA_LARGE,
    marginBottom: 15,
    marginTop: 20,
    color: theme.PRIMARY_COLOR,
    fontWeight: "600",
    fontFamily: "inter-font",
  },
  resultDrug: {
    // color: theme.TEXT_COLOR_WHITE,
    color: "black",
    marginBottom: 10,
    width: 150,
    borderRadius: 15,
    padding: 10,
    fontSize: 15,
    backgroundColor: "white",
  },
});
