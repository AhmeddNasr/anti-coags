import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import RenalDoseAdjustment from "./DoseScreen/components/RenalDoseAdjustment";
import drugs from "./drugs";
import theme from "./theme";

export default function DoseScreen({ navigation }) {
  return (
    <View>
      {drugs.map((drug, index) => {
        return (
          <View key={index} style={styles.container}>
            {index === 0 ? (
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Oral anti-coagulants</Text>
              </View>
            ) : index === 1 ? (
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Parentral anti-coagulants</Text>
              </View>
            ) : null}
            <Pressable
              onPress={() => navigation.navigate("DrugDose", { id: index })}
              style={({ pressed }) => [
                { opacity: pressed ? 0.8 : 1 },
                styles.Button,
              ]}
            >
              <Text style={styles.ButtonText}>{drug.name}</Text>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    padding: 20,
    margin: 0,
  },
  title: { fontSize: 20 },
  Button: {
    borderColor: "gray",
    marginTop: 20,
    padding: 30,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: theme.PRIMARY_COLOR,
    alignItems: "center",
    justifyContent: "center",
    width: 130,
  },
  ButtonActive: {
    backgroundColor: "orange",
  },
  ButtonText: {
    color: "white",
  },
});
