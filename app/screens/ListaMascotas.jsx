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

  /* useEffect(() => {
    const unsubscribe = onSnapshot(collection(FIREBASE_DB, "animales"), (snapshot) => {
      // listen to changes in the collection in firestore
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          // if a new file is added, add it to the state
          console.log("New file", change.doc.data());
          setAnimales((prevFiles) => [...prevFiles, change.doc.data()]);
        }
      });
    });
   
    return () => unsubscribe();
    // It is a good practice to unsubscribe to the listener when unmounting.
    // Because if you don't, you will have a memory leak.
  }, []); */

  return (
    <View style={styles.container}>
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
    color: "#c32c8b",
  },
  image: {
    width: 140,
    height: 130,
    borderRadius: 5,
  },
});

export default ListaMascotas;
