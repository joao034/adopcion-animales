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
import { getUserData } from "../services/authService";
import { getAnimal } from "../services/animalesService";

const ListaSolicitudesAdopcion = () => {
  const [solicitudesAdopcion, setSolicitudesAdopcion] = useState([]);
 

  useEffect(() => {
    const getData = async () => {
      const dataSolicitudesAdopcion = await getSolicitudesAdopcion();
      if (dataSolicitudesAdopcion) {
        setSolicitudesAdopcion(dataSolicitudesAdopcion);
      }
    };
    getData();
  }, []);

  const getDate = ( dateObject ) => {
    const seconds = dateObject.seconds;
    const dateFormated = new Date(seconds * 1000).toLocaleDateString("es-ES");
    return dateFormated;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitudes de Adopción</Text>

      <FlatList
        keyExtractor={(item) => item.id}
        data={solicitudesAdopcion}
        renderItem=
        {({ item }) => (
          <TouchableOpacity onPress={() => {}}>
            <CustomCard>
              <Text style={styles.text_primary}>Cliente:{ item.usuario.nombre }</Text>
              <Text style={styles.text}>Fecha: { getDate(item.fechaRegistro) }</Text>
              <Text style={styles.text}>
                Posible Adoptante para: { item.animal.nombre }
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
  },
  link:{
    color: "#00f",
    fontSize: 16,
    textAlign: "right",
  },
  
});

export default ListaSolicitudesAdopcion;
