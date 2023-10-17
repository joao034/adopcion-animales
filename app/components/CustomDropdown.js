import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { AntDesign } from "@expo/vector-icons";
import COLORS from "../consts/colors";

const CustomDropdown = ({
  data,
  value,
  onChange,
  placeholder,
  search = true,
  searchPlaceholder,
  labelField,
  valueField,
  icon = "",
  error,
  onFocus = () => {},
}) => {
  return (
    <View>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search={search}
        maxHeight={300}
        labelField={labelField}
        valueField={valueField}
        placeholder={placeholder}
        searchPlaceholder={searchPlaceholder}
        value={value}
        onChange={onChange}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name={icon} size={20} />
        )}
      />
      {error && <Text style={{ color: COLORS.red, marginTop: 5 }}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    margin: 10,
    height: 40,
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default CustomDropdown;
