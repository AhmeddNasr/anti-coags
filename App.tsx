import { Text, View, StatusBar, TouchableOpacity } from "react-native";
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
import HomeScreen from "./HomeScreen";
import capitalizeFirstLetter from "./Utils/capitalizeFirstLetter";
import { MaterialIcons } from "@expo/vector-icons";

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
              backgroundColor: "white",
            },
            header: ({ route, navigation, back, options }) => (
              <View
                style={{
                  paddingTop: StatusBar.currentHeight + 20,
                  paddingBottom: 40,
                  backgroundColor: myTheme.default.DARK_RED,
                  alignItems: "center",
                  borderBottomRightRadius: 40,
                  borderBottomLeftRadius: 40,
                  flexDirection: "row",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                {/* {navigation.canGoBack()} */}
                {navigation.canGoBack() && route.name !== "Home" ? (
                  <TouchableOpacity
                    style={{ padding: 5, paddingTop: 5 }}
                    onPress={() => navigation.goBack()}
                  >
                    <MaterialIcons
                      name="arrow-back"
                      color="white"
                      size={30}
                      style={{ marginRight: 20 }}
                    />
                  </TouchableOpacity>
                ) : null}
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
