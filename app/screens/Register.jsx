import {
    KeyboardAvoidingView,
    StyleSheet,
    View,
  } from "react-native";
  import CustomInput from "../components/CustomInput";
  import {useState} from "react";
  import { createUserWithEmailAndPassword } from "firebase/auth";
  import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
  import { addDoc, collection} from "firebase/firestore"; 
  import CustomButton from "../components/CustomButton";

  
  const Register = (  ) => {
  
    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [email, setEmail] = useState('')
    const [cedula, setCedula] = useState('')
    const [password, setPassword] = useState('')
    const [perfil, setPerfil] = useState('')
  
    const usersCollection = collection(FIREBASE_DB, "users");

    //getUsers
    const getUsers = async () => {
      const data = await getDocs(usersCollection)
    }


    const handleSignUp = () => {
      createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          addNewUser();
          console.log(user.id);
        })
        .catch((error) => {
          console.log('error=>', error);
        });
    };
    
  
    const addNewUser = async () => {
      //agregar un nuevo documento a la coleccion
      const user = {
        nombres: nombres,
        apellidos: apellidos,
        email: email,
        cedula: cedula,
        password: password,
        perfil: 'cliente'
      };
      await addDoc(collection(FIREBASE_DB, "users"), {user});
      
    };

  
    return (
      <KeyboardAvoidingView>
        <View style={styles.container}>  
        <CustomInput
            value={nombres}
            setValue={setNombres}
            placeholder="Nombres"
          ></CustomInput>
        <CustomInput
            value={apellidos}
            setValue={setApellidos}
            placeholder="Apellidos"
          ></CustomInput>
        <CustomInput
            value={cedula}
            setValue={setCedula}
            placeholder="Cédula"
            keyboardType="numeric"
          ></CustomInput>
        <CustomInput
            value={email}
            setValue={setEmail}
            placeholder="Correo electrónico"
            keyboardType="email-address"
          ></CustomInput>
        <CustomInput
            value={password}
            setValue={setPassword}
            placeholder="Contraseña"
            secureTextEntry
          ></CustomInput>
        <CustomButton onPress={handleSignUp} title={"Registrar"}></CustomButton>
        </View>
      </KeyboardAvoidingView>
    )
  }
  
  export default Register
  
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      padding : 20,
    },
    title:{
      fontSize: 30,
      fontWeight: "bold",
      color: "#f9a59a",
      margin: 10
    },
    inputContainer: {
      width: "80%",
    },
    buttonContainer: {
      width: "60%",
      marginTop: 20,
    },
    button: {
      backgroundColor: "#f9a59a",
      width: "100%",
      borderRadius: 10,
      padding: 15,
      alignItems: "center",
    },
    buttonOutline: {
      backgroundColor: "#fff",
      color: "#000",
      marginTop: 5,
      borderColor: "#f9a59a",
      borderWidth: 2,
    },
    buttonText: {
      color: "#fff",
      fontWeight: "700",
      fontSize: 16,
    },
    buttonOutlineText: {
      color: "#f9a59a",
      fontWeight: "700",
      fontSize: 16,
    },
    input: {
      backgroundColor: "#fff",
      marginVertical: 4,
      height: 50,
      padding: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "#000",
    },
  });
  