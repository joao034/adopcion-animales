import { KeyboardAvoidingView, StyleSheet, View, Image, Alert } from "react-native";
import { useState } from "react";
import Logo from "../../assets/img/logoK.png";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";


import { loginUser } from "../services/authService";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const success = await loginUser(email, password);
    if (success)
      console.log('Usuario logueado correctamente')
    else
      Alert.alert('Error', 'Usuario o contraseña incorrectos')
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
      </View>
      <View style={styles.inputContainer}>
        <CustomInput
          value={email}
          setValue={setEmail}
          placeholder="Correo electrónico"
        ></CustomInput>
        <CustomInput
          value={password}
          setValue={setPassword}
          placeholder="Contraseña"
          secureTextEntry
        ></CustomInput>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton onPress={handleLogin} title={"Login"}></CustomButton>
        <CustomButton
          onPress={() => navigation.navigate("Register")}
          title={"Registrarse"}
          type={"SECONDARY"}
        ></CustomButton>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#fff",
  },
  logoContainer: {
    borderRadius: 10,
    marginBottom: 20,
  },
  inputContainer: {
    width: "80%",
  },
  buttonContainer: {
    width: "60%",
    marginTop: 20,
  },
  logo: {
    width: 400,
    maxWidth: 300,
    height: 100,
  },
});
