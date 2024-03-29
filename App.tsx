import { Text, View, StatusBar, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DoseScreen from "./DoseScreen";
import SwitchingScreen from "./SwitchingScreen";
import ChoosingScreen from "./ChoosingScreen";
import DrugDoseScreen from "./DrugDoseScreen";
import { NativeBaseProvider } from "native-base";
import theme, * as myTheme from "./theme";
import setDefaultProps from "react-native-simple-default-props";
import { useFonts } from "expo-font";
import HomeScreen from "./HomeScreen";
import capitalizeFirstLetter from "./Utils/capitalizeFirstLetter";
import { MaterialIcons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    "Proxima-Nova": require("./assets/fonts/Proxima-Nova.ttf"),
    "inter-font": require("./assets/fonts/inter-font.ttf"),
  });

  if (!loaded) {
    return null;
  }
  setDefaultProps(Text, {
    style: [{ fontFamily: "Proxima-Nova" }],
  });

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: "center",
            // headerStyle: {
            //   backgroundColor: myTheme.default.DARK_RED,
            // },
            headerTitleStyle: {
              // color: "white",
              fontWeight: "700",
              color: "white",
              fontFamily: "inter-font",
            },
            headerShadowVisible: false,
            contentStyle: {
              backgroundColor: "white",
              // paddingTop: 200,
            },
            header: ({ route, navigation, back, options }) => (
              <View
                style={{
                  paddingTop: StatusBar.currentHeight,
                  paddingBottom: 20,
                  backgroundColor: myTheme.default.DARK_RED,
                  borderBottomRightRadius: 20,
                  borderBottomLeftRadius: 20,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  // marginBottom: 20,
                }}
              >
                {/* {navigation.canGoBack()} */}
                {navigation.canGoBack() && route.name !== "Home" ? (
                  <TouchableOpacity
                    style={{
                      padding: 5,
                      paddingTop: 5,
                      position: "absolute",
                      top: StatusBar.currentHeight - 5,
                      left: 15,
                      // backgroundColor: "white",
                      // borderRadius: "25",
                    }}
                    onPress={() => navigation.goBack()}
                  >
                    {/* {console.log(route)} */}
                    {/* {console.log()} */}
                    {/* {console.log(route.name === "home")} */}
                    <MaterialIcons
                      name="arrow-back"
                      color="white"
                      size={30}
                      style={{ marginRight: 20 }}
                    />
                  </TouchableOpacity>
                ) : null}
                <Text
                  style={{
                    color: "white",
                    fontSize: 30,
                    fontFamily: "Proxima-Nova",
                  }}
                >
                  {options.title}
                </Text>
                <StatusBar barStyle={"dark-content"} />
              </View>
            ),
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "CoaguRX",
            }}
          />
          <Stack.Screen
            name="Dose"
            component={DoseScreen}
            options={{
              title: "Dose Modification",
            }}
          />
          <Stack.Screen
            name="DrugDose"
            component={DrugDoseScreen}
            options={({ route }) => ({
              title: capitalizeFirstLetter(route.params.name),
            })}
          />
          <Stack.Screen
            name="Switching"
            component={SwitchingScreen}
            options={{ title: "Switching" }}
          />
          <Stack.Screen
            name="Choosing"
            component={ChoosingScreen}
            options={{
              title: "Checklist",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
