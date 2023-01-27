import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Pressable,
  StatusBar,
  Image,
} from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
import * as Icon from "@expo/vector-icons";
import theme from "./theme";

export default function HomeScreen({ navigation }) {
  function CustomButton(props: any) {
    return (
      <Pressable
        onPress={() => navigation.navigate(props.screen)}
        style={({ pressed }) => [
          styles.button,
          pressed
            ? {
                backgroundColor: "#5BC0F8",
              }
            : null,
        ]}
      >
        <Icon.Fontisto name={props.icon} color="white" size={38} />
        <Text style={{ fontSize: 17, marginTop: 10, color: "white" }}>
          {props.title}
        </Text>
        <Text
          style={{
            color: "white",
            alignSelf: "flex-start",
            fontSize: 13,
            fontStyle: "italic",
          }}
        >
          {props.description}
        </Text>
      </Pressable>
    );
  }

  const data = [
    [
      {
        title: "Dosing",
        screen: "Dose",
        bg: "#3a86ff",
        icon: "calculator",
        description: "Adjust dose according to patient's data",
      },
      {
        title: "Hemodialysis",
        screen: "Hemodialysis",
        bg: "#ff006e",
        icon: "blood-drop",
        description: "Hemodialysis compatibility guide",
      },
    ],
    [
      {
        title: "Switching",
        screen: "Switching",
        bg: "#fb5607",
        icon: "arrow-swap",
        description: "Switching to another agent guide",
      },
      {
        title: "Choosing an anticoagulant",
        screen: "Choosing",
        bg: "#8338ec",
        icon: "search",
        description: "Choosing a suitable anticoagulant guide",
      },
    ],
    [
      {
        title: "Warnings",
        screen: "Warning",
        bg: "#3a86ff",
        icon: "travis",
        description: "Warnings and precautions for the use of anticoagulants",
      },
      {
        title: "Warfarin and Heparin Dose Monitoring and Patient Education",
        screen: "Warning",
        icon: "night-clear",
        description: "hhhhhhhhhhh",
      },
    ],
  ];

  return (
    <View style={styles.container}>
      {data.map((group, index) => {
        return (
          <View key={"buttonGroup-" + index} style={styles.group}>
            {group.map((item, groupIndex) => {
              return (
                <CustomButton
                  title={item.title}
                  screen={item.screen}
                  bg={item.bg}
                  icon={item.icon}
                  description={item.description}
                  key={`homeButton-${index}-${groupIndex}`}
                />
              );
            })}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    // alignItems: "stretch",
    flex: 1,
    // backgroundColor: "pink",
    // flexDirection: "row",
    // backgroundColor: "#203453",
    margin: 30,
  },
  group: {
    flexDirection: "row",
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-evenly",
    // backgroundColor: "red",
  },
  button: {
    margin: 10,
    // width: 100,
    // height: 100,
    borderRadius: 15,
    // borderWidth: 1,
    paddingTop: 20,
    padding: 10,
    flex: 1,
    // flexGrow: 1,
    // backgroundColor: props.bg,
    // alignContent: "center",
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E84545",
    justifyContent: "space-around",
  },
  text: {
    color: "white",
  },
});
