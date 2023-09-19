import { KeyboardAvoidingView, StyleSheet, View, Image } from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

import Logo from "../../assets/img/logoK.png";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        //console.log("usuario logueado", user.email);
      })
      .catch((error) => {
        console.error("Usuario o contraseña incorrectos");
      });
  };

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
