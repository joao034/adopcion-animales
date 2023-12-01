import { collection, addDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../FirebaseConfig";

const addDocument = async (collectionName, document, mensaje) => {
  try {
    const docRef = await addDoc(collection(FIREBASE_DB, collectionName), {
      ...document,
    });
    return docRef.id;
  } catch (error) {
    throw new Error(`Error al guardar ${mensaje}: ${error.message}`);
  }
};

export { addDocument };
