import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
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

//get las solicitudes de adopcion en estado pendiente
//aumentar un parametro estado y consultar por ese parametro
/* 
const getSolicitudesAdopcion = async ( estado = "pendiente") => {

  try {
    const querySnapshot = await getDocs(collection(FIREBASE_DB, "solicitudesAdopcion"));
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return documents;
  } catch (error) {
    console.log(error);
  }
}; */

const getSolicitudesAdopcion = async (estado = "pendiente") => {
  const querySnapshot = await getDocs(
    query(
      collection(FIREBASE_DB, "solicitudesAdopcion"),
      where("estado", "==", estado)
    )
  );
  const solicitudes = [];
  querySnapshot.forEach((doc) => {
    solicitudes.push({ id: doc.id, ...doc.data() });
  });
  return solicitudes;
};

export { addDocument, getSolicitudesAdopcion };
