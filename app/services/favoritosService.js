import { doc, getDoc, FieldValue, updateDoc, arrayUnion, setDoc } from "firebase/firestore";

import { FIREBASE_DB } from "../../FirebaseConfig";
import { getUserId } from "./authService";


const getAnimalesFavoritos= async (authUserId) => {
  try {
    const userId = await getUserId(authUserId);
    const userRef = doc(FIREBASE_DB, "users", userId);
     useconstrSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const user = userSnapshot.data();
      // Verifica si 'favoritos' está definido y es un array
      const favoritos = user?.favoritos || [];

      const dataFavoritos = await Promise.all(
        favoritos.map(async (favoritoRef) => {
          const docSnapshot = await getDoc(favoritoRef);
          return docSnapshot.exists() ? docSnapshot.data() : null;
        })
      );
      return dataFavoritos;
    } else {
      return [];
    }
  } catch (error) {
    throw new Error(`Error al obtener los favoritos: ${error.message}`);
  }
};

const addToFavorites = async (animalId, authUserId) => {
  try {
    const userId = await getUserId(authUserId);
    const userRef = doc(FIREBASE_DB, "users", userId);

    const userSnapshot = await getDoc(userRef);
    if (userSnapshot.exists()) {
      const user = userSnapshot.data();
      const favoritos = user?.favoritos || [];
      const isFavorito = favoritos.find(favorito => favorito.id === animalId);
      if (isFavorito) {
        return false;
      }else{
        //agregar el animal a favoritos
        await updateDoc(userRef, {favoritos : arrayUnion( doc(FIREBASE_DB, "animales", animalId) )});
        return true;
      }
    }
  } catch (error) {
    throw new Error(`Error al agregar a favoritos: ${error.message}`);
  }
};

const verificarFavorito = async (animalId, authUserId) => {
  try {
    const userId = await getUserId(authUserId);
    const userRef = doc(FIREBASE_DB, "users", userId);
    const userSnapshot = await getDoc(userRef);
    if (userSnapshot.exists()) {
      const user = userSnapshot.data();
      const favoritos = user?.favoritos || [];
      const isFavorito = favoritos.find(favorito => favorito.id === animalId);
      if (isFavorito) {
        return true;
      }else{
        return false;
      }
    }
  }
  catch (error) {
    throw new Error(`Error : ${error.message}`);
  }
}


const removeFromFavorites = async (animalId, authUserId) => {
  try {
    const userId = await getUserId(authUserId);
    const userRef = doc(FIREBASE_DB, "users", userId);

    //guardar la referencia del documento del animal en la propiedad favoritos del usuario
    //verificar si el usuario ya tiene el animal en favoritos con un Set

    const userSnapshot = await getDoc(userRef);
    if (userSnapshot.exists()) {
      const user = userSnapshot.data();
      const favoritos = user?.favoritos || [];
      const isFavorito = favoritos.find(favorito => favorito.id === animalId);
      if (isFavorito) {
        //agregar el animal a favoritos
        await updateDoc(userRef, {favoritos : FieldValue.arrayRemove( doc(FIREBASE_DB, "animales", animalId) )});
        return true;
      }else{
        throw new Error("El animal no está en favoritos");
      }
    }
  } catch (error) {
    throw new Error(`Error al agregar a favoritos: ${error.message}`);
  }
}

export { getAnimalesFavoritos, addToFavorites };
