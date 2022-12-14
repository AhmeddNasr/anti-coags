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
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Dose" component={DoseScreen} />
          <Stack.Screen name="DrugDose" component={DrugDoseScreen} />
          <Stack.Screen name="Hemodialysis" component={HemodialysisScreen} />
          <Stack.Screen name="Switching" component={SwitchingScreen} />
          <Stack.Screen name="Choosing" component={ChoosingScreen} />
          <Stack.Screen name="Warning" component={WarningScreen} />
          <Stack.Screen name="WarningInfo" component={WarningInfo} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
