import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button } from "native-base";

export default function HomeScreen({ navigation }) {
  const CustomButton = (props) => {
    return (
      <Button
        colorScheme="red"
        onPress={() => navigation.navigate(props.screen)}
        my={5}
        // w={"75%"}
        py={4}
      >
        {props.title}
      </Button>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <CustomButton title="Dose Modification" screen="Dose" />
        <CustomButton title="Hemodialysis" screen="Hemodialysis" />
        <CustomButton title="Switching" screen="Switching" />
        <CustomButton
          title="Choose a Suitable Anti-coagulant"
          screen="Choosing"
        />
        <CustomButton title="Special Warnings" screen="Warning" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
});
