import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";
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

const getSolicitudAdopcion = async (id) => {
  try {
    const docRef = doc(FIREBASE_DB, "solicitudesAdopcion", id);
    const solicitudSnap = await getDoc(docRef);

    if (!solicitudSnap.exists()) return null;

    if (solicitudSnap.exists()) {
      const docDatosPersonales = await getDoc(
        doc(
          FIREBASE_DB,
          "formDatosPersonales",
          solicitudSnap.data().idFormDatosPersonales
        )
      );

      const docDomicilio = await getDoc(
        doc(FIREBASE_DB, "formDomicilio", solicitudSnap.data().idFormDomicilio)
      );

      const docSituacionFamiliar = await getDoc(
        doc(
          FIREBASE_DB,
          "formSituacionFamiliar",
          solicitudSnap.data().idFormSituacionFamiliar
        )
      );

      const docRelacionAnimales = await getDoc(
        doc(
          FIREBASE_DB,
          "formRelacionAnimales",
          solicitudSnap.data().idFormRelacionAnimales
        )
      );

      if (
        !docDatosPersonales.exists() ||
        !docDomicilio.exists() ||
        !docSituacionFamiliar.exists() ||
        !docRelacionAnimales.exists()
      ) {
        return null;
      } else {
        return {
          solicitudAdopcion: solicitudSnap.data(),
          formDatosPersonales: docDatosPersonales.data(),
          formDomicilio: docDomicilio.data(),
          formSituacionFamiliar: docSituacionFamiliar.data(),
          formRelacionAnimales: docRelacionAnimales.data(),
        };
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const updateSolicitudAdopcion = async (solicitudAdopcion, id) => {
  try {
    const docRef = doc(FIREBASE_DB, "solicitudesAdopcion", id);
    await setDoc(docRef, { ...solicitudAdopcion, fechaRespuesta: new Date() });
    return true;
  } catch (error) {
    throw new Error(`Error al actualizar la solicitud de adopción: ${error.message}`);
  }
};


export { addDocument, getSolicitudesAdopcion, getSolicitudAdopcion, updateSolicitudAdopcion };
