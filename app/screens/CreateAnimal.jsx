import {
  View,
  ScrollView,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

import { useState, useEffect } from "react";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { addAnimal } from "../services/animalesService";
import UploadMediaFile from "../components/UploadMediaFile";
import * as FileSystem from "expo-file-system";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FIREBASE_STORAGE } from "../../FirebaseConfig";

import Icono from "../../assets/img/noPhoto.png";
import * as ImagePicker from "expo-image-picker";
import COLORS from "../consts/colors";

const CreateAnimal = ({ ...props }) => {
  const initialState = {
    nombre: "",
    especie: "",
    raza: "",
    imagenUrl: "",
    edad: "",
    sexo: "",
    caracteristicas: "",
    estado: "",
    color: "",
    peso: "",
    tamanio: "",
    esterilizado: "",
    createdAt: new Date(),
  };

  const [animal, setAnimal] = useState(initialState);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let isValid = true;
    if (animal.nombre === "") {
      handleError("nombre", "Debe ingresar el nombre del animal");
      isValid = false;
    }

    if (animal.especie === "") {
      handleError("especie", "Debe ingresar la especie del animal");
      isValid = false;
    }

    if (animal.raza === "") {
      handleError("raza", "Debe ingresar la raza del animal");
      isValid = false;
    }

    if (animal.sexo === "") {
      handleError("sexo", "Debe ingresar el sexo del animal");
      isValid = false;
    }

    if (animal.peso === "") {
      handleError("peso", "Debe ingresar el peso del animal");
      isValid = false;
    }

    if (animal.tamanio === "") {
      handleError("tamanio", "Debe ingresar el tamaño del animal");
      isValid = false;
    }

    if (animal.caracteristicas === "") {
      handleError(
        "caracteristicas",
        "Debe ingresar las características del animal"
      );
      isValid = false;
    }

    //valida que se seleccione una imagen para el animal
    if (!image) {
      Alert.alert("Error", "Debe seleccionar una imagen del animal");
      isValid = false;
    }

    if (isValid) {
      saveDataAnimal();
    }
  };

  handleError = (input, error) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const handleChangeText = (value, name) => {
    setAnimal({ ...animal, [name]: value });
  };

  // Función para actualizar el estado 'image' en el componente padre
  /* const handleImageChange = (newImage) => {
    setImage(newImage);
    console.log("newImage", newImage)
  };
 */

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // All, Images, Videos
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      upload(result.assets[0].uri);
      //onImageChange(result.assets[0].uri);
    }
  };

  const upload = async (image) => {
    try {
      const { uri } = await FileSystem.getInfoAsync(image);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          console.log(e);
          reject(new TypeError("Error al subir la imagen"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });
      const refer = ref(FIREBASE_STORAGE, "images/" + new Date().getTime());
      // Sube la imagen a Firebase Storage
      await uploadBytes(refer, blob);
      console.log("Imagen subida correctamente");
      // Obtiene la URL de la imagen
      const url = await getDownloadURL(refer);
      //setea la url de la imagen en el estado
      setAnimal((prevAnimal) => ({ ...prevAnimal, imagenUrl: url }));

      //setImage(null);
    } catch (error) {
      console.log(error);
    }
  };

  const saveDataAnimal = async () => {
    try {
      await addAnimal(animal);
      Alert.alert("Éxito", "Datos guardados correctamente");
      props.navigation.navigate("List", { animalId: animal.id });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Registrar un animal</Text>
        {/* <UploadMediaFile onImageChange={handleImageChange} /> */}
        <TouchableOpacity onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Image source={Icono} style={{ width: 170, height: 170 }} />
          )}
          <Text style={{ textAlign: "center", color: COLORS.gray }}>
            {" "}
            Seleccione una imagen{" "}
          </Text>
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <CustomInput
            placeholder={"Nombre"}
            onChangeText={(value) => handleChangeText(value, "nombre")}
            value={animal.nombre}
            onFocus={() => handleError("nombre", "")}
            error={errors.nombre}
          />
          <CustomInput
            placeholder={"Tipo de animal"}
            onChangeText={(value) => handleChangeText(value, "especie")}
            value={animal.especie}
            onFocus={() => handleError("especie", "")}
            error={errors.especie}
          />
          <CustomInput
            placeholder={"Raza"}
            onChangeText={(value) => handleChangeText(value, "raza")}
            value={animal.raza}
            onFocus={() => handleError("raza", "")}
            error={errors.raza}
          />
          <CustomInput
            placeholder={"Sexo"}
            onChangeText={(value) => handleChangeText(value, "sexo")}
            value={animal.sexo}
            onFocus={() => handleError("sexo", "")}
            error={errors.sexo}
          />
          <CustomInput
            placeholder={"Peso"}
            onChangeText={(value) => handleChangeText(value, "peso")}
            value={animal.peso}
            keyboardType="numeric"
            onFocus={() => handleError("peso", "")}
            error={errors.peso}
          />
          <CustomInput
            placeholder={"Tamaño"}
            onChangeText={(value) => handleChangeText(value, "tamanio")}
            value={animal.tamanio}
            onFocus={() => handleError("tamanio", "")}
            error={errors.tamanio}
          />
          <CustomInput
            placeholder={"Características"}
            onChangeText={(value) => handleChangeText(value, "caracteristicas")}
            value={animal.caracteristicas}
            onFocus={() => handleError("caracteristicas", "")}
            error={errors.caracteristicas}
            multiline={true}
            numberOfLines={2}
          />
          <CustomButton title="Guardar" onPress={validate} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  image: {
    width: 170,
    height: 170,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginBottom: 10,
  },
  inputContainer: {
    width: "80%",
    marginBottom: 20,
  },
});

export default CreateAnimal;
