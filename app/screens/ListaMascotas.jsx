import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { useEffect, useState, useLayoutEffect } from "react";
import { getAnimales } from "../services/animalesService";
import CustomCard from "../components/CustomCard";
import CustomButton from "../components/CustomButton";
import COLORS from "../consts/colors";

const ListaMascotas = ({ route, ...props }) => {
  //Datos recibidos desde el componente padre
  const { authUser, setAuthUser, setIsLoggedIn } = route.params;

  const [animales, setAnimales] = useState([]);

  useLayoutEffect(() => {
    if (authUser.perfil === "admin") {
      props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={() => props.navigation.navigate("Create")}>
            <Text style={styles.text_button}>+ Agregar</Text>
          </TouchableOpacity>
        ),
      });
    }
  }, []);

  useEffect(() => {
    const getData = async () => {
      const dataAnimales = await getAnimales();
      dataAnimales ? setAnimales(dataAnimales) : setAnimales([]);
    };
    getData();
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.button_container}>
        <CustomButton />
      </View>

      <FlatList
        data={animales}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              authUser.perfil === "admin"
                ? props.navigation.navigate("Edit", { animalId: item.id })
                : props.navigation.navigate("Show", { animalId: item.id });
            }}
          >
            <CustomCard>
              <Image style={styles.image} source={{ uri: item.imagenUrl }} />
              <Text style={styles.text}>{item.nombre}</Text>
              <Text style={{ textAlign: "center" }}>
                {item.sexo} - {item.tamanio}
              </Text>
            </CustomCard>
          </TouchableOpacity>
        )}
        numColumns={2}
        contentContainerStyle={{ gap: 2, flexGrow: 1 }}
        columnWrapperStyle={{ gap: 2, justifyContent: "center" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignContent: "center",
  },
  text: {
    color: "#4d4d4d",
    fontSize: 18,
    textAlign: "center",
  },
  text_button: {
    color: COLORS.primary,
  },
  image: {
    width: 140,
    height: 130,
    borderRadius: 5,
  },
  button_container: {
    width: "70%",
    alignSelf: "center",
  },
});

export default ListaMascotas;
