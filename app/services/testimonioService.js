import { collection, addDoc, getDocs, doc, getDoc, onSnapshot} from "firebase/firestore";
import { FIREBASE_DB, FIREBASE_AUTH } from "../../FirebaseConfig";
import { getUserId } from "./authService";

const postTestimonio = async (testimonio) => {
  try {
    const userId = await getUserId(FIREBASE_AUTH.currentUser.uid);
    const userRef = doc(FIREBASE_DB, "users", userId);
    const userData = await getDoc(userRef);
    const testimonioRef = await addDoc(collection(FIREBASE_DB, "testimonios"), {
      ...testimonio,
      fecha: new Date(),
      usuario: {
        nombre: userData.data().nombres + " " + userData.data().apellidos,
        id: userData.id,
      },
    });
    return testimonioRef.id;
  } catch (error) {
    throw new Error(`Error al agregar el testimonio: ${error.message}`);
  }
};

const getTestimonios = async () => {
  try {
    const testimoniosRef = await getDocs(
      collection(FIREBASE_DB, "testimonios")
    );
    const testimonios = testimoniosRef.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return testimonios;
  } catch (error) {
    throw new Error(`Error al obtener los testimonios: ${error.message}`);
  }
};

//deprecated
const unsubscribe = (callback) => {
  onSnapshot(collection(FIREBASE_DB, "testimonios"), (snapshot) => {
    // listen to changes in the collection in firestore
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        // if a new file is added, add it to the state
        callback(change.doc.data());
      }
    });
  });
  return () => unsubscribe();
};


export { getTestimonios, postTestimonio, unsubscribe };
