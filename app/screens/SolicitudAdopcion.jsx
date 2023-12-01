import { View, Text, Button, Alert } from "react-native";
import { useState } from "react";
import SolicitudAdopcionForm from "../components/forms/SolicitudAdopcionForm";
import { addDocument } from "../services/adopcionService";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

const SolicitudAdopcion = ({ ...props }) => {
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

  /* const initialFormDatosPersonales = {
    //referencias
    //dSolicitudAdopcion: "",
    //datos
    nombreCompleto: "",
    cedula: "",
    fechaNacimiento: "",
    telefonoCasa: "",
    celular: "",
    correo: "",
    direccion: "",
    ocupacion: "",
    edad: 0,
    nivelInstruccion: "",
    referencia: {
      nombreCompleto: "",
      celular: "",
      parentesco: "",
    },
  }; */

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
      await addDocument(
        "solicitudesAdopcion",
        {
          ...solicitudAdopcion,
          idFormDatosPersonales: idFormDatosPersonales,
          idFormSituacionFamiliar: idFormSituacionFamiliar,
          idFormDomicilio: idFormDomicilio,
          idFormRelacionAnimales: idFormRelacionAnimales,
          idUsuario: FIREBASE_AUTH.currentUser.uid,
          idAnimal: "ncmMqTJ9oZBZYAa4eFTx", //agregar id del animal
        },
        "el formulario de solicitud de adopción."
      );
      Alert.alert("Éxito", "Solicitud de adopción registrada correctamente");
      props.navigation.navigate("List");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <SolicitudAdopcionForm onSubmit={onSubmit} />
    </View>
  );
};

export default SolicitudAdopcion;
