import { View, StyleSheet, Text } from "react-native";
import { FormControl, Input, Select, CheckIcon } from "native-base";
import { useState } from "react";
import theme from "../../theme";

export default function RenalDoseAdjustment() {
  return (
    <FormControl isRequired>
      <View style={styles.inputGroup}>
        <Text>Weight: </Text>
        <Input
          w={"75%"}
          keyboardType="number-pad"
          InputRightElement={<Text style={styles.inputTextElement}>kg</Text>}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text>Height: </Text>
        <Input
          w={"75%"}
          keyboardType="number-pad"
          InputRightElement={<Text style={styles.inputTextElement}>cm</Text>}
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
          InputRightElement={<Text style={styles.inputTextElement}>mg/dL</Text>}
        />
      </View>
    </FormControl>
  );
}

const styles = StyleSheet.create({
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
});
