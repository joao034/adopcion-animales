import { KeyboardAvoidingView, StyleSheet, View, Image, Alert, Keyboard} from "react-native";
import { useState } from "react";
import Logo from "../../assets/img/logoK.png";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";


import { loginUser } from "../services/authService";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true
    if ( !email ){
      handleError('email', 'Ingrese el correo electrónico')
      isValid = false
    }
    if ( !password ){
      handleError('password', 'Ingrese la contraseña')
      isValid = false
    }

    if ( isValid ){
      handleLogin()
    }
  }

  const handleError = ( input, error) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

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
          label={"Correo electrónico"}
          value={email}
          setValue={setEmail}
          placeholder="Correo electrónico"
          onFocus={() => handleError('email', '')}
          error={errors.email}
        ></CustomInput>
        <CustomInput
          label={"Contraseña"}
          value={password}
          setValue={setPassword}
          placeholder="Contraseña"
          secureTextEntry
          onFocus={() => handleError('password', '')}
          error={errors.password}
        ></CustomInput>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton onPress={validate} title={"Login"}></CustomButton>
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
    marginTop: 10,
  },
  logo: {
    width: 400,
    maxWidth: 300,
    height: 100,
  },
});
