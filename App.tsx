import { Text, View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DoseScreen from "./DoseScreen";
import SwitchingScreen from "./SwitchingScreen";
import ChoosingScreen from "./ChoosingScreen";
import DrugDoseScreen from "./DrugDoseScreen";
import { NativeBaseProvider } from "native-base";
import * as myTheme from "./theme";
import setDefaultProps from "react-native-simple-default-props";
import { useFonts } from "expo-font";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Icon from "@expo/vector-icons";
//TODO
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "./HomeScreen";
import capitalizeFirstLetter from "./Utils/capitalizeFirstLetter";

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    "Proxima-Nova": require("./assets/fonts/proxima-nova.ttf"),
    "inter-font": require("./assets/fonts/inter.ttf"),
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
              backgroundColor: myTheme.default.BACKGROUND_COLOR,
            },
            header: ({ route, navigation, back, options }) => (
              <View
                style={{
                  // height: 100,

                  paddingTop: StatusBar.currentHeight + 20,
                  paddingBottom: 40,
                  backgroundColor: myTheme.default.DARK_RED,
                  // justifyContent: "center",
                  alignItems: "center",
                  borderBottomRightRadius: 40,
                  borderBottomLeftRadius: 40,
                }}
              >
                <Text style={{ color: "white", fontSize: 30 }}>
                  {options.title}
                </Text>
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
          <Stack.Screen name="Switching" component={SwitchingScreen} />
          <Stack.Screen
            name="Choosing"
            component={ChoosingScreen}
            options={{
              title: "Suitable Selection",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
