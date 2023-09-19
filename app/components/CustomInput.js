import { View, TextInput, StyleSheet } from "react-native";
import React from "react";



const CustomInput = ( { placeholder, value, setValue, secureTextEntry, keyboardType="text"}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      ></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    height: 40,
  },
  input: {},
});

export default CustomInput;
