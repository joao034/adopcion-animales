import { FIREBASE_DB } from "../../FirebaseConfig";
import { addDoc, collection, doc, getDocs, getDoc, deleteDoc } from "firebase/firestore";

const getAnimales = async () => {
  try {
    const querySnapshot = await getDocs(collection(FIREBASE_DB, "animales"));
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return documents;
  } catch (error) {
    console.log(error);
  }
};

const getAnimal = async ( id ) => {
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

const addAnimal = async ( animal ) => {
  try{
    const docRef = await addDoc( collection( FIREBASE_DB, "animales" ), { ...animal });
    return docRef.id;
  }catch(error){
    throw new Error(`Error al agregar el animal: ${error.message}`);
  }
}

const deleteAnimal = async ( id ) => {
  try{
    const docRef = doc( FIREBASE_DB, "animales", id );
    await deleteDoc( docRef );
    return true;
  }catch(error){
    throw new Error(`Error al eliminar el animal: ${error.message}`);
  }
}

export { getAnimales, addAnimal, getAnimal, deleteAnimal };
