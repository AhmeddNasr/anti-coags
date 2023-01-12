import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import DoseScreen from "./DoseScreen";
import WarningScreen from "./WarningScreen";
import WarningInfo from "./WarningInfo";
import SwitchingScreen from "./SwitchingScreen";
import ChoosingScreen from "./ChoosingScreen";
import DrugDoseScreen from "./DrugDoseScreen";
import HemodialysisScreen from "./HemodialysisScreen";
import { NativeBaseProvider } from "native-base";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: "center",
            headerStyle: {
              // backgroundColor: "#152C4C",
            },
            headerTitleStyle: {
              // color: "white",
            },
            // headerShadowVisible: false,
            contentStyle: {
              backgroundColor: "#FDFDFD",
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "Coagulito",
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
            options={{
              title: "??",
            }}
          />
          <Stack.Screen name="Hemodialysis" component={HemodialysisScreen} />
          <Stack.Screen name="Switching" component={SwitchingScreen} />
          <Stack.Screen
            name="Choosing"
            component={ChoosingScreen}
            options={{
              title: "Dose Modification",
            }}
          />
          <Stack.Screen
            name="Warning"
            component={WarningScreen}
            options={{
              title: "Special Warnings",
            }}
          />
          <Stack.Screen
            name="WarningInfo"
            component={WarningInfo}
            options={{
              title: "??",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
