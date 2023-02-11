import { Text, StyleSheet, ScrollView, View, Pressable } from "react-native";
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
  const [platlet, setPlatlet] = useState(4);
  const [renalAdjustment, setRenalAdjustment] = useState(false);
  const [hepaticAdjustment, setHepaticAdjustment] = useState(false);
  const [allContra, setAllContra] = useState(false);
  const [suitableDrugs, setSuitableDrugs] = useState([]);
  const [scr, setScr] = useState(0);
  const [hepatic, setHepatic] = useState();
  const indications = ["af", "dvtt", "dvtp"];

  let drugs;
  let output;

  function calculate() {
    output = [];
    if (indication === "") {
      return;
    }
    setAllContra(false);
    let rivaroxaban = {
      title: "rivaroxaban",
      contra: false,
      dose: "",
      id: 0,
    };
    let edoxaban = {
      title: "edoxaban",
      contra: false,
      dose: "",
      id: 1,
    };
    let apixaban = {
      title: "apixaban",
      contra: false,
      dose: "",
      id: 2,
    };
    let heparin = {
      title: "heparin",
      contra: false,
      dose: "",
      id: 4,
    };
    let warfarin = {
      title: "warfarin",
      contra: false,
      dose: "",
      id: 5,
    };
    let enoxaparin = {
      title: "enoxaparin",
      contra: false,
      dose: "",
      id: 3,
    };
    let fondaparinux = {
      title: "fondaparinux",
      contra: false,
      dose: "",
      id: 6,
    };
    if (platlet !== 4) {
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
        } else if (platlet === 3) {
          return setAllContra(true);
        }
      } else if (indication === "dvtp") {
        if (platlet !== 1) {
          return setAllContra(true);
        }
      }
    }
    console.log("hi");
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

    drugs = [
      rivaroxaban,
      apixaban,
      warfarin,
      heparin,
      fondaparinux,
      edoxaban,
      enoxaparin,
    ];

    drugs.map((drug, index) => {
      if (!drug.contra) {
        output.push(drug);
      }
    });
    if (output.length === 0) {
      setAllContra(true);
    } else {
      setSuitableDrugs(output);
    }
  }
  return (
    <ScrollView style={styles.container}>
      {/* TODO DRY */}
      {/* {console.log(suitableDrugs)} */}
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
          indication={indication}
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
          setHepatic={setHepatic}
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
        {/* <Text>All contra: {allContra ? "yes" : "no"}</Text> */}

        {!allContra ? (
          <>
            <Text
              style={{
                fontFamily: "inter-font",
                color: theme.TEXT_COLOR_WHITE,
                fontSize: theme.FONT_SIZE_EXTRA_LARGE,
                marginBottom: 15,
              }}
            >
              Suitable Drugs:
            </Text>
            {suitableDrugs.map((drug, index) => {
              // console.log(suitableDrugs);
              return (
                <Pressable key={index}>
                  <Text style={styles.resultDrug}>{drug.title}</Text>
                </Pressable>
              );
            })}
          </>
        ) : (
          <>
            <Text
              style={{
                fontFamily: "inter-font",
                color: theme.TEXT_COLOR_WHITE,
                fontSize: theme.FONT_SIZE_EXTRA_LARGE,
                marginBottom: 15,
              }}
            >
              No Drugs Found
            </Text>
            <Text style={{ color: "white", fontSize: theme.FONT_SIZE_MEDIUM }}>
              We could not find any suitable drug for this patient
            </Text>
          </>
        )}
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
