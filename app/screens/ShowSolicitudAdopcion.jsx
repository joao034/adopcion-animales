import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { getSolicitudAdopcion } from "../services/adopcionService";
import SolicitudAdopcionForm from "../components/forms/SolicitudAdopcionForm";
import CustomButton from "../components/CustomButton";

const ShowSolicitudAdopcion = ({ route, ...props }) => {
  const { solicitudId } = route.params;

  const [solicitudAdopcion, setSolicitudAdopcion] = useState({});

  useEffect(() => {
    const getDataSolicitudAdopcion = async () => {
      const solicitudAdopcionData = await getSolicitudAdopcion(solicitudId);
      solicitudAdopcionData
        ? setSolicitudAdopcion(solicitudAdopcionData)
        : setSolicitudAdopcion({});
    };
    getDataSolicitudAdopcion(solicitudId);
  }, []);

  return (
    <View>
      <SolicitudAdopcionForm dataSolicitudAdopcion={solicitudAdopcion} editable={false}/>
      <CustomButton title={"Aprobar/Rechazar Solicitud"} onPress={()=> props.navigation.navigate("Aprobar")}/>
    </View>
  );
};

export default ShowSolicitudAdopcion;
