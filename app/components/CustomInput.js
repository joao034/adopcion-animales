import { View, TextInput, StyleSheet, Text } from "react-native";
import COLORS from "../consts/colors";
import { useState } from "react";

const CustomInput = ({
  label,
  placeholder,
  value,
  setValue,
  onChangeText,
  secureTextEntry,
  keyboardType = "text",
  error,
  multiline = false,
  numberOfLines,
  editable = true,
  onFocus = () => {},
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={{ marginBottom:10 }}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.container,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.primary
              : COLORS.gray,
            height: multiline ? '' : 40,
          },
        ]}
      >
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={setValue ? setValue : onChangeText}
          secureTextEntry={secureTextEntry}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={editable}
        ></TextInput>
      </View>
      {error && (
        <Text style={{ color: COLORS.red, marginVertical:5 }}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    //marginBottom: 10,
  },
  label: {
    color: COLORS.gray,
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "bold",
  },
});

export default CustomInput;
