import { View, Text, CheckBox, StyleSheet } from "react-native";
import { useState } from "react";

const CustomCheckBox = ({ text }) => {
  const [isSelected, setSelection] = useState(false);

  return (
    <View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        />
        <Text style={styles.label}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});

export default CustomCheckBox;
