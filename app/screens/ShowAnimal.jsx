import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { getAnimal, addToFavorites } from "../services/animalesService";
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

  useEffect(() => {
    //console.log(authUser.id)
  }, [])

  const agregarEnFavoritos = () => {
    try{
      const success = addToFavorites( animalId, authUser.id)
      console.log(success)
      if(success){
        console.log("Agregado a favoritos")
      }
    }catch(error){
      console.log("Error al agregar a favoritos")
    }
  }

  return (
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
          onPress={() => props.navigation.navigate("InfoSolicitudAdopcion",  { animalId: animalId }) }
        />
        <CustomButton
          title={`Agregar a ${animal.nombre} en mis favoritos`}
          onPress={() => agregarEnFavoritos() }
        />
      </CustomCard>
    </View>
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
