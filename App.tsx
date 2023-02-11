import { Text } from "react-native";
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
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
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

  const Tab = createBottomTabNavigator();

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        {/* <Tab.Navigator
          initialRouteName="Dose"
          safeAreaInsets={{ top: 200 }}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Dose") {
                iconName = focused
                  ? "ios-calculator"
                  : "ios-calculator-outline";
              } else if (route.name === "Checklist") {
                iconName = focused
                  ? "ios-search-circle"
                  : "ios-search-circle-outline";
              } else if (route.name === "Switching") {
                iconName = focused ? "sync-circle" : "sync-circle-outline";
              }
              return (
                <Icon.Ionicons name={iconName} color={color} size={size} />
              );
            },
            tabBarLabel:
              route.name === "Dose"
                ? "Dose Modification"
                : route.name === "Switching"
                ? "Switching"
                : "Checklist",
            tabBarHideOnKeyboard: true,
            tabBarActiveTintColor: "#fff",
            tabBarInactiveTintColor: "#ffffff90",
            headerTitleAlign: "center",
            tabBarStyle: {
              backgroundColor: myTheme.default.BLUE_COLOR,
              height: 70,
              paddingBottom: 10,
              paddingTop: 10,
              borderWidth: 0,
            },
            // headerStyle: {
            //   backgroundColor: myTheme.default.BACKGROUND_COLOR,
            // },

            headerTitleStyle: {
              // color: "white",
              fontWeight: "600",
              color: myTheme.default.PRIMARY_COLOR,
              fontFamily: "inter-font",
            },

            headerShadowVisible: false,
          })}
        >
          <Tab.Screen name="Checklist" component={ChoosingScreen} />
          <Tab.Screen name="Dose" component={DoseScreen} />
          <Tab.Screen name="Switching" component={SwitchingScreen} />
        </Tab.Navigator> */}

        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: myTheme.default.BACKGROUND_COLOR,
            },
            headerTitleStyle: {
              // color: "white",
              fontWeight: "700",
              color: myTheme.default.PRIMARY_COLOR,
              fontFamily: "inter-font",
            },
            headerShadowVisible: false,
            contentStyle: {
              backgroundColor: myTheme.default.BACKGROUND_COLOR,
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "",
              headerShown: false,
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
