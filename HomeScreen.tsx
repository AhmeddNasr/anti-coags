import { Text, View, StyleSheet, Pressable, Image } from "react-native";
import * as Icon from "@expo/vector-icons";
import theme from "./theme";

export default function HomeScreen({ navigation }) {
  const data = [
    {
      title: "Checklist",
      screen: "Choosing",
      description: "Find suitable anti-coagulants based on patient's data",
    },
    {
      title: "Dosing",
      screen: "Dose",
      description:
        "Calculate optimum dose based on patient's weight, height, renal and hepatic function",
    },
    {
      title: "Switching",
      screen: "Switching",
      description: "Switching to another anticoagulant agent guideline",
    },
  ];
  let checkIcon = require("./assets/icons/checklist-checked-box.png");
  let switchIcon = require("./assets/icons/swap.png");
  let doseIcon = require("./assets/icons/balance-sheet.png");
  function CustomButton(props: any) {
    return (
      <Pressable
        onPress={() => navigation.navigate(props.screen)}
        style={({ pressed }) => [
          styles.button,
          pressed
            ? {
                opacity: 0.9,
              }
            : null,
          { justifyContent: "space-between" },
        ]}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              // backgroundColor: "cyan",
              padding: 10,
            }}
          >
            <Image
              source={
                props.title === "Dosing"
                  ? doseIcon
                  : props.title === "Switching"
                  ? switchIcon
                  : checkIcon
              }
              style={{
                width: 25,
                height: 25,
                // alignSelf: "center",
                marginRight: 8,
                // backgroundColor: "blue",
              }}
            />
            <Text
              style={[
                styles.text,
                {
                  fontSize: 25,
                  fontFamily: "inter-font",
                  fontWeight: "900",
                  // marginTop: 10,
                  // padding: 10,
                  paddingRight: 0,
                  paddingLeft: 0,
                  // backgroundColor: "blue",
                  // alignSelf: "center",
                },
              ]}
            >
              {props.title}
            </Text>
          </View>
          <Text
            style={{
              color: theme.LIGHT_BLACK,
              alignSelf: "flex-start",
              fontSize: 14,
              fontStyle: "italic",
            }}
          >
            {props.description}
          </Text>
        </View>
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      {data.map((item, index) => {
        return (
          <CustomButton
            title={item.title}
            screen={item.screen}
            description={item.description}
            key={`homeButton-${index}`}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    margin: 30,
  },

  button: {
    borderRadius: 15,
    padding: 10,
    flex: 1,
    backgroundColor: theme.LIGHT_GREY,
    marginBottom: 30,
    maxHeight: 150,
  },
  text: {
    color: "BLACK",
  },
});
