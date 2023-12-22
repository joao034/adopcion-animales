import { View, StyleSheet, Text, Keyboard, ScrollView } from "react-native";
import CustomInput from "../components/CustomInput";
import { useEffect, useState } from "react";
import CustomDropdown from "../components/CustomDropdown";
import CustomButon from "../components/CustomButton";
import { updateSolicitudAdopcion } from "../services/adopcionService";
import { Alert } from "react-native";

const AprobarSolicitudAdopcion = ({ route, ...props }) => {
  const dataEstadoSolicitudAdopcion = [
    { label: "Aprobar", value: "aprobada" },
    { label: "Rechazar", value: "rechazada" },
  ];

  const { solicitudAdopcion, solicitudId } = route.params;
  const [estadoSolicitudAdopcion, setEstadoSolicitudAdopcion] = useState(""); //dropdown
  const [solicitud, setSolicitud] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setSolicitud({
      ...solicitudAdopcion,
    });
  }, [solicitudAdopcion]);


  handleError = (input, error) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const validate = () => {
    let isValid = true;
    if (solicitud.estado === "" || solicitud.estado=== "pendiente") {
      handleError("estado", "Seleccione un estado");
      isValid = false;
    }
    if (solicitud.observacion === "") {
      handleError("observacion", "Escriba alguna observación del proceso");
      isValid = false;
    }
    if(isValid){
      handleChangeStateSolicitud();
    }
  };
  
  const handleChangeText = (value, name) => {
    setSolicitud({ ...solicitud, [name]: value });
  };

  const handleChangeStateSolicitud = async () => {
    const response = await updateSolicitudAdopcion(solicitud, solicitudId);
    if (response) {
      Alert.alert("Éxito", "!Solicitud editada correctamente!");
      props.navigation.navigate("List", { isReload: true });
    } else {
      Alert.alert("Alerta", "No se pudo editar la solicitud");
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.subcontainer}>
          {solicitud && (
            <>
              <Text style={styles.text}>
                Solicitud de parte de: {solicitud.usuario?.nombre}
              </Text>
              <Text style={styles.text}>
                Para la adopción de : {solicitud.animal?.nombre}
              </Text>
            </>
          )}

          <CustomInput
            label={"Estado de la Solicitud"}
            editable={false}
            value={solicitud.estado}
          />
          <CustomDropdown
            label={"Cambiar estado de la solicitud:"}
            data={dataEstadoSolicitudAdopcion}
            value={estadoSolicitudAdopcion || ""}
            onChange={(item) =>
              handleChangeText(
                item.value,
                "estado",
                setEstadoSolicitudAdopcion(item.value)
              )
            }
            onFocus={() => handleError("estado", "")}
            error={errors.estado}
            labelField="label"
            valueField="value"
            placeholder={"Apruebe o rechace la solicitud"}
            search={false}
          />
          <CustomInput
            label={"Observaciones"}
            placeholder={"Ingrese observaciones"}
            editable={true}
            value={solicitud.observacion || ""}
            onChangeText={(value) => handleChangeText(value, "observacion")}
            multiline={true}
            onFocus={() => handleError("observacion", "")}
            error={errors.observacion}
          />
          <CustomButon
            title={"Guardar"}
            onPress={() => validate()}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  subcontainer: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#FFF",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default AprobarSolicitudAdopcion;
