import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Alert } from "react-native";
import { getAnimal } from "../services/animalesService";
import { addToFavorites } from "../services/favoritosService";
import CustomCard from "../components/CustomCard";
import CustomButton from "../components/CustomButton";

const ShowAnimal = ({ route, ...props }) => {
  const { animalId, authUser } = route.params;
  const [animal, setAnimal] = useState({});

  useEffect(() => {
    const getDataAnimal = async () => {
      const animalData = await getAnimal(animalId);
      animalData ? setAnimal(animalData) : setAnimal({});
    };
    getDataAnimal(animalId);
  }, []);

  const agregarEnFavoritos = async () => {
    try {
      const success = await addToFavorites(animalId, authUser.id);
      if (success) {
        Alert.alert("Agregado a favoritos");
        props.navigation.navigate("Favorites", { animalId: animal.id }	);
      } else {
        Alert.alert("El animal ya se encuentra en favoritos");
      }
    } catch (error) {
      console.log("Error al agregar a favoritos", error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <CustomCard>
          <View>
            <Image style={styles.image} source={{ uri: animal.imagenUrl }} />
            <Text style={styles.info_text}>Nombre: {animal.nombre}</Text>
            <Text style={styles.info_text}>Raza: {animal.raza}</Text>
            <Text style={styles.info_text}>Tamaño: {animal.tamanio} </Text>
            <Text style={styles.info_text}>Etapa de vida: {animal.edad} </Text>
            <Text style={styles.info_text}>Sexo: {animal.sexo} </Text>
            <Text style={styles.info_text}>Peso: {`${animal.peso} kg`} </Text>
            <Text style={styles.info_text}>
              Estirilizado: {animal.esterilizado}{" "}
            </Text>
            <Text style={styles.info_text}>
              Características: {animal.caracteristicas}{" "}
            </Text>
          </View>

          <CustomButton
            title={`Quiero adoptar a ${animal.nombre}`}
            onPress={() =>
              props.navigation.navigate("InfoSolicitudAdopcion", {
                animalId: animalId,
              })
            }
          />
          <CustomButton
            title={`Agregar a ${animal.nombre} a mis favoritos`}
            onPress={() => agregarEnFavoritos()}
          />
        </CustomCard>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 220,
    borderRadius: 5,
  },
  info_text: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default ShowAnimal;
