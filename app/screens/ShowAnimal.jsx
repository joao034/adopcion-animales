import { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Touchable,
} from "react-native";
import { getAnimal, deleteAnimal } from "../services/animalesService";
import CustomCard from "../components/CustomCard";
import CustomButton from "../components/CustomButton";
import CustomModal from "../components/CustomModal";

const ShowAnimal = ({ route, ...props }) => {
  const { animalId } = route.params;

  const [animal, setAnimal] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const getDataAnimal = async (animalId) => {
      const animalData = await getAnimal(animalId);
      animalData ? setAnimal(animalData) : setAnimal({});
    };
    getDataAnimal(animalId);
  }, []);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setIsModalVisible(!isModalVisible)}>
          <Text style={styles.text_button}>Eliminar</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  const eliminarAnimal = async () => {
    const success = await deleteAnimal(animalId);
    if (success) {
      Alert.alert("Éxito", "!Animal eliminado correctamente!");
      props.navigation.navigate("List", { isReload: true });
    } else {
      Alert.alert("Alerta", "No se pudo eliminar el animal");
    }
  };

  const modalContent = (
    <View>
      <Text>¿Deseas eliminar al siguiente animal?</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title="Eliminar animal"
        content={modalContent}
        functionOK={eliminarAnimal}
      />

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

        <CustomButton title={`Quiero adoptar a ${animal.nombre}`} />
      </CustomCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  text_button: {
    color: "#c32c8b",
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
