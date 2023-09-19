import { Text, StyleSheet, Pressable } from "react-native";
import React from "react";

const CustomButton = ({
  onPress,
  title,
  type = "PRIMARY",
  bgColor,
  textColor,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? { backgroundColor: bgColor } : {},
      ]}
    >
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          textColor ? { color: textColor } : {},
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    marginTop: 10,
  },

  container_PRIMARY: {
    backgroundColor: "#c32c8b",
  },
  container_SECONDARY: {
    backgroundColor: "#fff",
    borderColor: "#c32c8b",
    borderWidth: 2,
  },

  text: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  text_PRIMARY: {
    color: "#fff",
  },
  text_SECONDARY: {
    color: "#c32c8b",
  },
});

export default CustomButton;
