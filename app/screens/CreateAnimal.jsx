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
import { addAnimal, uploadImage } from "../services/animalesService";
import UploadMediaFile from "../components/UploadMediaFile";
import * as FileSystem from "expo-file-system";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FIREBASE_STORAGE } from "../../FirebaseConfig";

import Icono from "../../assets/img/noPhoto.png";
import * as ImagePicker from "expo-image-picker";

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
  //const [url, setUrl] = useState("")

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
      //const result = await uploadImage( result.assets[0].uri)
      // console.log('result', result);
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

      await uploadBytes(refer, blob);
      console.log('Imagen subida correctamente')
      // Obtiene la URL de la imagen
      const url = await getDownloadURL(refer);
      setAnimal((prevAnimal) => ({ ...prevAnimal, imagenUrl: url }));
      // Limpia la imagen después de subirla
      //setImage(null);
    } catch (error) {
      console.log(error);
      //setUploading(false);
    }
  };

  const saveDataAnimal = async () => {
    const success = await addAnimal(animal);
    if (success) {
      console.log("Datos registrados correctamente");
      Alert.alert("Éxito", "!Animal registrado correctamente!");
      props.navigation.navigate("List", { animal });
    } else {
      console.log("Error al registrar los datos");
    }
  };

  return (
    <ScrollView>
      <Text>Registrar un animal</Text>
      <View>
        {/* <UploadMediaFile onImageChange={handleImageChange} /> */}
        <TouchableOpacity onPress={pickImage}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          ) : (
            <Image source={Icono} style={{ width: 200, height: 200 }} />
          )}
          <Text style={{ textAlign: "center" }}> Seleccione una imagen </Text>
        </TouchableOpacity>
        <CustomInput
          placeholder={"Nombre"}
          onChangeText={(value) => handleChangeText(value, "nombre")}
          value={animal.nombre}
        />
        <CustomInput
          placeholder={"Tipo de animal"}
          onChangeText={(value) => handleChangeText(value, "especie")}
          value={animal.especie}
        />
        <CustomInput
          placeholder={"Raza"}
          onChangeText={(value) => handleChangeText(value, "raza")}
          value={animal.raza}
        />
        <CustomInput
          placeholder={"Sexo"}
          onChangeText={(value) => handleChangeText(value, "sexo")}
          value={animal.sexo}
        />
        <CustomInput
          placeholder={"Peso"}
          onChangeText={(value) => handleChangeText(value, "peso")}
          value={animal.peso}
          keyboardType="numeric"
        />
        <CustomInput
          placeholder={"Tamaño"}
          onChangeText={(value) => handleChangeText(value, "tamanio")}
          value={animal.tamanio}
        />
      </View>
      <View>
        <CustomButton title="Guardar" onPress={saveDataAnimal} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreateAnimal;
