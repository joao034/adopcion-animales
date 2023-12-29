import { View, Alert, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState, useLayoutEffect } from "react";
import AnimalForm from "../components/forms/AnimalForm";
import { getAnimal, updateAnimal, deleteAnimal } from "../services/animalesService";
import CustomModal from "../components/CustomModal";
import COLORS from "../consts/colors";

export default function EditAnimal({ route, ...props }) {
  const {animalId} = route.params;
  const [animal, setAnimal] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const getDataAnimal = async () => {
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

  // recibe los nuevos datos del animal y actualiza el estado
  const onSubmit = (updatedAnimal) => {
    handleEdit(updatedAnimal);
  };

  const handleEdit = async (animal) => {
    const success = await updateAnimal(animal);
    if (success) {
      Alert.alert("Éxito", "!Animal editado correctamente!");
      props.navigation.navigate("List", { isReload: true });
    } else {
      Alert.alert("Alerta", "No se pudo editar el animal");
    }
  };

  return (
    <View>
      <CustomModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title="Eliminar animal"
        content={modalContent}
        functionOK={eliminarAnimal}
        textoAceptacion={"Eliminar"}
      />
      <AnimalForm title={"Editar Animal"} initialData={animal} onSubmit={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  text_button: {
    color: COLORS.primary,
  },
});
