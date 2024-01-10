import { FIREBASE_DB, FIREBASE_STORAGE } from "../../FirebaseConfig";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getDoc,
  deleteDoc,
  setDoc,
  where,
  query,
} from "firebase/firestore";

import * as FileSystem from "expo-file-system";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const getAnimales = async (parametros) => {
  try {
    const { edad, sexo, tamanio, estado } = parametros;
    let animalesRef;

    animalesRef = query(collection(FIREBASE_DB, "animales"));

    //verificar que parametros no sea un objeto vacio
    if (Object.keys(parametros).length !== 0) {
      let whereArray = [];
      if( edad && edad !== "Todos"){
        whereArray.push(where("edad", "==", edad));
      }
      if( sexo && sexo !== "Todos"){
        whereArray.push(where("sexo", "==", sexo));
      }
      if( tamanio & tamanio !== "Todos"){
        whereArray.push(where("tamanio", "==", tamanio));
      }
      if( estado && estado !== "Todos"){
        whereArray.push(where("estado", "==", estado));
      }
      animalesRef = query(collection(FIREBASE_DB, "animales"), ...whereArray);
    }

    const querySnapshot = await getDocs(animalesRef);
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return documents;
  } catch (error) {
    console.log("Error", error);
  }
};

const getAnimal = async (id) => {
  try {
    const docRef = doc(FIREBASE_DB, "animales", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

const addAnimal = async (animal) => {
  try {
    const docRef = await addDoc(collection(FIREBASE_DB, "animales"), {
      ...animal,
    });
    return docRef.id;
  } catch (error) {
    throw new Error(`Error al agregar el animal: ${error.message}`);
  }
};

const updateAnimal = async (animal) => {
  try {
    const docRef = doc(FIREBASE_DB, "animales", animal.id);
    await setDoc(docRef, { ...animal });
    return true;
  } catch (error) {
    throw new Error(`Error al actualizar el animal: ${error.message}`);
  }
};

const deleteAnimal = async (id) => {
  try {
    const docRef = doc(FIREBASE_DB, "animales", id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    throw new Error(`Error al eliminar el animal: ${error.message}`);
  }
};

const uploadImage = async (image) => {
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
    await uploadBytesResumable(refer, blob);
    const url = await getDownloadURL(refer);
    return url;
    /* const doc = await saveRecord(url);
    console.log("doc", doc)
    Alert.alert("Imagen Subida !!");
    setImage(null);
    setUploading(false); // Finalizar la carga con éxit */
  } catch (error) {
    console.log(error);
    //setUploading(false);
  }
};

export {
  getAnimales,
  addAnimal,
  getAnimal,
  deleteAnimal,
  updateAnimal,
  uploadImage,
};
