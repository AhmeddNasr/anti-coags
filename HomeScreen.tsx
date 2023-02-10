import { Text, View, StyleSheet, Pressable } from "react-native";
import * as Icon from "@expo/vector-icons";
import theme from "./theme";

export default function HomeScreen({ navigation }) {
  const data = [
    [
      {
        title: "Dosing",
        screen: "Dose",
        bg: "#3a86ff",
        icon: "calculator",
        description:
          "Calculate optimum dose based on patient's weight, height, renal and hepatic function",
      },
      {
        title: "Switching",
        screen: "Switching",
        bg: "#fb5607",
        icon: "arrow-swap",
        description: "Switching to another anticoagulant agent guideline",
      },
    ],
    [
      {
        title: "Checklist",
        screen: "Choosing",
        bg: "#8338ec",
        icon: "search",
        description: "Find suitable anti-coagulants based on patient's data",
      },
    ],
  ];

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
          { justifyContent: "space-between" },
        ]}
      >
        <View>
          <Text
            style={[
              styles.text,
              {
                fontSize: theme.FONT_SIZE_EXTRA_LARGE,
                fontFamily: "inter-font",
                fontWeight: "900",
                marginTop: 10,
              },
            ]}
          >
            {props.title}
          </Text>
          <Text
            style={{
              color: theme.TEXT_COLOR_WHITE,
              alignSelf: "flex-start",
              fontSize: 14,
              fontStyle: "italic",
            }}
          >
            {props.description}
          </Text>
        </View>
        <Icon.Fontisto
          name={props.icon}
          color={theme.TEXT_COLOR_WHITE}
          size={theme.FONT_SIZE_LOGO}
          style={{ alignSelf: "flex-end", margin: 10 }}
        />
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          marginBottom: 30,
          marginTop: 30,
          fontSize: theme.FONT_SIZE_LOGO,
          fontFamily: "inter-font",
        }}
      >
        CoaguRx
      </Text>
      {data.map((group, index) => {
        return (
          <>
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
          </>
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
  // group: {
  //   flexDirection: "row",
  //   flex: 1,
  //   alignItems: "stretch",
  //   justifyContent: "space-evenly",
  //   // backgroundColor: "red",
  // },
  button: {
    // margin: 10,
    // width: 100,
    // height: 100,
    borderRadius: 15,
    // borderWidth: 1,
    // paddingTop: 20,
    padding: 10,
    flex: 1,
    // borderColor: theme.TEXT_COLOR_GRAY,
    backgroundColor: theme.BLUE_COLOR,
    marginBottom: 30,
    // flexGrow: 1,
    // backgroundColor: props.bg,
    // alignContent: "center",
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "#E84545",
    // justifyContent: "space-around",
  },
  text: {
    color: "white",
  },
});
