import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import CustomCard from "../components/CustomCard";
import { getSolicitudesAdopcion } from "../services/adopcionService";
import CustomDropdown from "../components/CustomDropdown";
import COLORS from "../consts/colors";

const ListaSolicitudesAdopcion = ( { ...props } ) => {
  const estadosSolicitud = [
    { label: "Pendiente", value: "pendiente" },
    { label: "Aprobada", value: "aprobada" },
    { label: "Rechazada", value: "rechazada" },
  ];

  const [solicitudesAdopcion, setSolicitudesAdopcion] = useState([]);
  const [estadoSolicitud, setEstadoSolicitud] = useState("pendiente"); //dropdown

  useEffect(() => {
    const getData = async () => {
      const dataSolicitudesAdopcion = await getSolicitudesAdopcion(estadoSolicitud);
      if (dataSolicitudesAdopcion) {
        setSolicitudesAdopcion(dataSolicitudesAdopcion);
      }
    };
    getData();
  }, [estadoSolicitud]);

  //Recargar la lista de solicitudes cuando se cambia de estado
  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      const getData = async () => {
        const dataSolicitudesAdopcion = await getSolicitudesAdopcion(estadoSolicitud);
        if (dataSolicitudesAdopcion) {
          setSolicitudesAdopcion(dataSolicitudesAdopcion);
        }
      }
      getData();
    });
    return unsubscribe;
  }, [props.navigation]);

  const getDate = (dateObject) => {
    const seconds = dateObject.seconds;
    const dateFormated = new Date(seconds * 1000).toLocaleDateString("es-ES");
    return dateFormated;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitudes de Adopción</Text>

      <View style={styles.filter}>
        <Text style={styles.text_primary}>Filtrar por: </Text>
        <CustomDropdown
          data={estadosSolicitud}
          value={estadoSolicitud || ""}
          onChange={(item) => setEstadoSolicitud(item.value)
          }
          labelField="label"
          valueField="value"
          placeholder={"Seleccione el estado de la solicitud"}
          search={false}
        />
      </View>

      <FlatList
        keyExtractor={(item) => item.id}
        data={solicitudesAdopcion}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => { props.navigation.navigate("Show", { solicitudId: item.id }) }}>
            <CustomCard>
              <Text style={styles.text_primary}>
                Cliente:{item.usuario.nombre}
              </Text>
              {/* <Text style={styles.text}>
                Fecha: {getDate(item.fechaRegistro)}
              </Text> */}
              <Text style={styles.text}>
                Posible Adoptante para: {item.animal.nombre}
              </Text>
              <Text style={styles.link}>Ver info</Text>
            </CustomCard>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15
  },
  filter: {
    
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 15,
  },
  text_primary: {
    fontSize: 18,
    marginTop: 15,
    fontWeight: "bold",
  },
  link: {
    color: COLORS.primary,
    fontSize: 16,
    textAlign: "right",
  },
});

export default ListaSolicitudesAdopcion;
