import { View, Text } from "react-native";
import drugs from "./drugs";

export default function DrugDoseScreen({ navigation, route }) {
  const drug = drugs[route.params.id];

  return (
    <View>
      <Text>{drug.name}</Text>
    </View>
  );
}
