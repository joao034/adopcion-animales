import { createContext, useEffect, useState, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
import { collection, where, getDocs, query } from "firebase/firestore";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider ( props ) {
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        try {
          const userData = await getUserData(user.uid);
          if (userData) {
            setAuthUser(userData); // Actualiza el estado con los datos del usuario
          } else {
            // El usuario no fue encontrado en la base de datos, establece el estado en null
            setAuthUser(null);
          }
        } catch (error) {
          // Maneja errores de forma adecuada
          console.error("Error al obtener datos del usuario:", error);
          setAuthUser(null);
        }
      } else {
        setAuthUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  async function getUserData(uid) {
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

  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

