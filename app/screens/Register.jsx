import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Text,
  Alert,
  ScrollView,
} from "react-native";
import CustomInput from "../components/CustomInput";
import { useState } from "react";
import CustomButton from "../components/CustomButton";
import { registerUser } from "../services/authService";
import COLORS from "../consts/colors";

const Register = () => {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [cedula, setCedula] = useState("");
  const [password, setPassword] = useState("");
  const [perfil, setPerfil] = useState("");

  const [errors, setErrors] = useState({});

  const validate = () => {
    let isValid = true;
    if (!nombres) {
      handleError("nombres", "Ingrese el nombre");
      isValid = false;
    }
    if (!apellidos) {
      handleError("apellidos", "Ingrese el apellido");
      isValid = false;
    }
    if (!cedula) {
      handleError("cedula", "Ingrese la cédula");
      isValid = false;
    } else if (cedula.length < 10) {
      handleError("cedula", "La cédula debe tener 10 dígitos");
      isValid = false;
    }
    if (!email) {
      handleError("email", "Ingrese el correo electrónico");
      isValid = false;
    } else if (!email.match(/\S+@\S+\.\S+/)) {
      handleError("email", "Ingrese un correo electrónico válido");
      isValid = false;
    }
    if (!password) {
      handleError("password", "Ingrese la contraseña");
      isValid = false;
    } else if (password.length < 6) {
      handleError("password", "La contraseña debe tener al menos 6 caracteres");
      isValid = false;
    }

    if (isValid) {
      handleSignUp();
    }
  };

  handleError = (input, error) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const handleSignUp = async () => {
    try {
      const success = await registerUser(
        nombres,
        apellidos,
        email,
        password,
        cedula
      );
      if (success) Alert.alert("Usuario registrado correctamente");
    } catch (error) {
      console.error("error ->", error);
      Alert.alert("No se pudo registrar el usuario");
    }
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.title}>Nuevo Usuario</Text>
        <View style={styles.inputContainer}>
          <CustomInput
            label={"Nombres"}
            value={nombres}
            setValue={setNombres}
            placeholder="Nombres"
            error={errors.nombres}
            onFocus={() => handleError("nombres", "")}
          ></CustomInput>
          <CustomInput
            label={"Apellidos"}
            value={apellidos}
            setValue={setApellidos}
            placeholder="Apellidos"
            error={errors.apellidos}
            onFocus={() => handleError("apellidos", "")}
          ></CustomInput>
          <CustomInput
            label={"Cédula"}
            value={cedula}
            setValue={setCedula}
            placeholder="Cédula"
            keyboardType="numeric"
            error={errors.cedula}
            onFocus={() => handleError("cedula", "")}
          ></CustomInput>
          <CustomInput
            label={"Correo electrónico"}
            value={email}
            setValue={setEmail}
            placeholder="Correo electrónico"
            keyboardType="email-address"
            error={errors.email}
            onFocus={() => handleError("email", "")}
          ></CustomInput>
          <CustomInput
            label={"Contraseña"}
            value={password}
            setValue={setPassword}
            placeholder="Contraseña"
            secureTextEntry
            error={errors.password}
            onFocus={() => handleError("password", "")}
          ></CustomInput>
          <CustomButton onPress={validate} title={"Registrar"}></CustomButton>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: COLORS.white,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.black,
    margin: 10,
  },
  inputContainer: {
    width: "80%",
  },
});
