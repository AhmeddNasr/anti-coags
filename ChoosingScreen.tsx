import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  FormControl,
  Input,
  Select,
  CheckIcon,
  Button,
  Radio,
} from "native-base";
import { useState } from "react";
import theme from "./theme";

export default function ChoosingScreen() {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [gender, setGender] = useState("");
  const [indication, setIndication] = useState("");
  const [pltCount, setPltCount] = useState("");
  const [age, setAge] = useState(0);
  const [scr, setScr] = useState(0);

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* TODO DRY */}
        <FormControl isRequired>
          <Text style={[styles.header, { marginTop: 0 }]}>
            1. Calculate GFR
          </Text>
          <View style={styles.inputGroup}>
            <Text>Weight: </Text>
            <Input
              w={"75%"}
              keyboardType="number-pad"
              InputRightElement={
                <Text style={styles.inputTextElement}>kg</Text>
              }
            />
          </View>
          <View style={styles.inputGroup}>
            <Text>Height: </Text>
            <Input
              w={"75%"}
              keyboardType="number-pad"
              InputRightElement={
                <Text style={styles.inputTextElement}>cm</Text>
              }
            />
          </View>
          <View style={styles.inputGroup}>
            <Text>Gender: </Text>
            <Select
              minWidth="200"
              accessibilityLabel="Choose gender"
              placeholder="Gender"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size={2} />,
              }}
              w={"75%"}
            >
              <Select.Item label="Male" value="m" />
              <Select.Item label="Female" value="f" />
            </Select>
          </View>
          <View style={styles.inputGroup}>
            <Text>Age: </Text>
            <Input w={"75%"} keyboardType="number-pad" />
          </View>
          <View style={styles.inputGroup}>
            <Text>S. Cr: </Text>
            <Input
              w={"75%"}
              keyboardType="number-pad"
              InputRightElement={
                <Text style={styles.inputTextElement}>mg/dL</Text>
              }
            />
          </View>
          <Text style={styles.header}>2. Platelet count</Text>
          <Radio.Group
            name="plateletCount"
            accessibilityLabel="platelet count"
            value={pltCount}
            onChange={(nextValue) => setPltCount(nextValue)}
          >
            <Radio value="low" colorScheme="red" my={2}>
              &#60; 50
            </Radio>
            <Radio value="normal" colorScheme="red" my={2}>
              50 - 150
            </Radio>
          </Radio.Group>
          <Text style={styles.header}>3. Indication</Text>
          <Radio.Group
            name="indication"
            accessibilityLabel="indication"
            value={indication}
            onChange={(nextValue) => setIndication(nextValue)}
          >
            <Radio value="dvtp" colorScheme="red" my={2}>
              DVT prophylaxis
            </Radio>
            <Radio value="dvtt" colorScheme="red" my={2}>
              DVT treatment
            </Radio>
            <Radio value="af" colorScheme="red" my={2}>
              AF treatment
            </Radio>
          </Radio.Group>
          <Button
            colorScheme="red"
            // isDisabled={!isFormFilled}
            onPress={() => {
              return;
            }}
            my={8}
          >
            Show Suitable Anti-Coagulants
          </Button>
        </FormControl>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  inputTextElement: {
    marginRight: 20,
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: theme.PRIMARY_COLOR,
  },
  //TODO DRY
  header: {
    fontSize: theme.FONT_SIZE_LARGE,
    marginBottom: 20,
    marginTop: 20,
  },
});
