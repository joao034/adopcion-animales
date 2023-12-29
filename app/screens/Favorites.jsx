import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { getAnimalesFavoritos } from "../services/favoritosService";
import CustomCard from "../components/CustomCard";
import COLORS from "../consts/colors";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

const Favorites = ({ route, ...props }) => {
  const [listaFavoritos, setListaFavoritos] = useState([]);

  useEffect(() => {
    const getFavoritos = async () => {
      const favoritos = await getAnimalesFavoritos(
        FIREBASE_AUTH.currentUser.uid
      );
      setListaFavoritos(favoritos);
    };
    getFavoritos();
  }, [ route.params ]); 

  /* useEffect(() => {
    const unsuscribe = onSnapshot(
      collection(FIREBASE_DB, "users"),
      (snapshot) => {
        // listen to changes in the collection in firestore
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added" || change.type === "modified") {
            // if a new file is added, add it to the state
            setListaFavoritos((prevFiles) => [...prevFiles, change.doc.data()]);
          }
        });
      }
      
    );
    return () => unsuscribe();
    
  }, []); */

  return (
    <View style={styles.container}>
      <Text style={{ color: "" }}></Text>
      {listaFavoritos.length === 0 && (
        <Text style={styles.title}>No tiene animales favoritos.</Text>
      )}

      <FlatList
        data={listaFavoritos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Show", { animalId: item.id });
            }}
          >
            <CustomCard>
              <View style={styles.item}>
                <Image style={styles.image} source={{ uri: item.imagenUrl }} />
                <View style={styles.detailItem}>
                  <Text style={styles.text}> Nombre: {item.nombre}</Text>
                  <Text style={{ textAlign: "center" }}>
                    {item.sexo} - {item.tamanio}
                  </Text>
                  <Text style={styles.text}> Estado: {item.estado}</Text>
                </View>
                <Text style={styles.redirect}>Ver</Text>
              </View>
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
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  detailItem: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    width: 140,
    height: 100,
    borderRadius: 5,
  },
  redirect: {
    alignSelf: "flex-end",
    fontWeight: "bold",
    color: COLORS.primary,
  },
});

export default Favorites;
