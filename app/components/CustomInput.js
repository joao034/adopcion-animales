import { View, TextInput, StyleSheet, Text } from "react-native";
import COLORS from "../consts/colors";
import { useState } from "react";

const CustomInput = ({
  placeholder,
  value,
  setValue,
  onChangeText,
  secureTextEntry,
  keyboardType = "text",
  error,
  onFocus = () => {},
  multiline,
  numberOfLines 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View>
      <View
        style={[
          styles.container,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.primary
              : COLORS.gray,
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
        ></TextInput>
      </View>
      {error && (
        <Text style={{ color: COLORS.red, marginTop: 5 }}>{error}</Text>
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
    marginVertical: 5,
    height: 40,
  },
  input: {},
});

export default CustomInput;
