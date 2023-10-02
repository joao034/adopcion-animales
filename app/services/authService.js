import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
import { addDoc, collection, where, getDocs, query} from "firebase/firestore"; 
import {  signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const registerUser = async ( nombres, apellidos, email, password , cedula ) => {
  try {
    await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
    await addNewUser( nombres, apellidos, email, cedula );
    return true;
  } catch (error) {
    console.error("error ->", error);
    return false;
  }
};

//solo sirve para crear usuarios clientes
const addNewUser = async ( nombres, apellidos, email, cedula ) => {
  console.log('addNewUser()')
  await addDoc(collection(FIREBASE_DB, "users"), {
    id: FIREBASE_AUTH.currentUser.uid,
    nombres,
    apellidos,
    email,
    cedula,
    perfil: "cliente",
  });
};

const loginUser = async ( email, password ) => {
  try {
    await signInWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password
    );
    return true;
  } catch (error) {
    console.error("error ->", error);
    return false;
  }
};

async function getUserData( uid ) {
  try {
    const q = query(collection(FIREBASE_DB, "users"), where("id", "==", uid));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
      const doc = querySnapshot.docs[0];
      const userData = doc.data();
      return userData;
    } else {
      return null;
    }
  } catch (error) {
    console.error("error ->", error);
    throw error; // Deberías propagar el error para manejarlo adecuadamente en el lugar donde se llama a getUserData
  }
}

export { registerUser, loginUser, getUserData };
