import { View, Text, Button, Alert } from "react-native";
import { useState, useEffect } from "react";
import SolicitudAdopcionForm from "../components/forms/SolicitudAdopcionForm";
import { addDocument } from "../services/adopcionService";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { getUserData } from "../services/authService";
import { getAnimal } from "../services/animalesService";

const SolicitudAdopcion = ({ route, ...props }) => {

  const { animalId } = route.params;

  const initialStateSolicitud = {
    //referencias
    idFormDatosPersonales: "",
    idFormRelacionAnimales: "",
    idFormSituacionFamiliar: "",
    idFormDomicilio: "",
    //datos
    estado: "pendiente", //pendiente, aprobado, rechazado
    fechaRegistro: new Date(),
    fechaRespuesta: "",
    observacion: "",
  };

  const [solicitudAdopcion, setSolitudAdopcion] = useState(initialStateSolicitud);

  const getUserName = async ( idUsuario ) => {
    const userData = await getUserData(idUsuario);
    console.log("userData", userData)
    return JSON.stringify(userData.nombres) + " " + JSON.stringify(userData.apellidos);
  }

  const getAnimalName = async ( idAnimal ) => {
    const animalData = await getAnimal(idAnimal);
    return animalData.nombre;
  }

  // recibe los nuevos datos de la solicitud de adopcion desde el formulario y actualiza el estado
  const onSubmit = (
    formDatosPersonales,
    formSituacionFamiliar,
    formDomicilio,
    formRelacionAnimales
  ) => {
    handleCreate(
      formDatosPersonales,
      formSituacionFamiliar,
      formDomicilio,
      formRelacionAnimales
    );
  };

  //Inserta toda la informacion del formulario
  const handleCreate = async (
    formDatosPersonales,
    formSituacionFamiliar,
    formDomicilio,
    formRelacionAnimales
  ) => {
    try {
      const idFormDatosPersonales = await addDocument(
        "formDatosPersonales",
        formDatosPersonales,
        "la sección de datos personales."
      );
      const idFormSituacionFamiliar = await addDocument(
        "formSituacionFamiliar",
        formSituacionFamiliar,
        "la sección de situación familiar."
      );
      const idFormDomicilio = await addDocument(
        "formDomicilio",
        formDomicilio,
        "la sección de domicilio."
      );
      const idFormRelacionAnimales = await addDocument(
        "formRelacionAnimales",
        formRelacionAnimales,
        "la sección de relacion con los animales."
      );

      const nombreUsuario = await getUserName(FIREBASE_AUTH.currentUser.uid);
      const nombreAnimal = await getAnimalName(animalId);

      await addDocument(
        "solicitudesAdopcion",
        {
          ...solicitudAdopcion,
          idFormDatosPersonales: idFormDatosPersonales,
          idFormSituacionFamiliar: idFormSituacionFamiliar,
          idFormDomicilio: idFormDomicilio,
          idFormRelacionAnimales: idFormRelacionAnimales,
          usuario : {
            id: FIREBASE_AUTH.currentUser.uid,
            nombre: nombreUsuario
          },
          animal : {
            id: animalId,
            nombre : nombreAnimal
          }
        },
        "el formulario de solicitud de adopción."
      );
      Alert.alert("Éxito", "Solicitud de adopción registrada correctamente");
      props.navigation.navigate("List");
    } catch (error) {
      Alert.alert("Error", "No se pudo registrar la solicitud de adopción");
      console.log("error", error);
    }
  };

  return (
    <View>
      <SolicitudAdopcionForm onSubmit={onSubmit} editable={true}/>
    </View>
  );
};

export default SolicitudAdopcion;
