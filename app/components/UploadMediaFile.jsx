import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { FIREBASE_STORAGE, FIREBASE_DB } from "../../FirebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Icono from "../../assets/img/noPhoto.png";
import { addDoc, collection } from "firebase/firestore";

const UploadMediaFile = ( {onImageChange} ) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

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
      onImageChange(result.assets[0].uri);
      //const result = await uploadImage( result.assets[0].uri)
      // console.log('result', result);
    }
  };

  const upload = async (  ) => {
    setUploading(true);
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
      //const filename = image.substring(image.lastIndexOf("/" + 1));
      const refer = ref(FIREBASE_STORAGE, "images/" + new Date().getTime());
      await uploadBytesResumable(refer, blob);
      const url = await getDownloadURL(refer);
      console.log("url", url);
      const doc = await saveRecord(url);
      console.log("doc", doc)
      Alert.alert("Imagen Subida !!");
      setImage(null);
      setUploading(false); // Finalizar la carga con éxit
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        ) : (
          <Image source={Icono} style={{ width: 200, height: 200 }} />
        )}
        <Text style={{ textAlign:"center" }}> Seleccione una imagen </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default UploadMediaFile;
