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

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  //contenido del modal
  const modalContent = <Text> Deseas eliminar al siguiente animal?</Text>;

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
        <TouchableOpacity
          onPress={() => {
            toggleModal;
          }}
        >
          <CustomModal
            visible={isModalVisible}
            onClose={toggleModal}
            title="Título del Modal"
            content={modalContent}
          />
          <Text style={styles.text_button}>Eliminar</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  const eliminarAnimal = async () => {
    const success = await deleteAnimal(animalId);
    if (success) {
      console.log("Eliminado");
      Alert.alert("Éxito", "!Animal registrado correctamente!");
      props.navigation.navigate("List");
    } else {
      Alert.alert("Alerta", "No se pudo eliminar el animal");
    }
  };

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
