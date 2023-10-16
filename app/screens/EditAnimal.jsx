import { View, Text, Alert } from "react-native";
import { useEffect, useState } from "react";
import AnimalForm from "../components/forms/AnimalForm";
import { getAnimal, updateAnimal } from "../services/animalesService";

export default function EditAnimal({ route, ...props }) {
  const {animalId} = route.params;
  const [animal, setAnimal] = useState({});

  useEffect(() => {
    const getDataAnimal = async () => {
      const animalData = await getAnimal(animalId);
      animalData ? setAnimal(animalData) : setAnimal({});
    };
    getDataAnimal(animalId);
  }, []);

  // recibe los nuevos datos del animal y actualiza el estado
  const onUpdate = (updatedAnimal) => {
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
      <AnimalForm title={"Editar Animal"} initialData={animal} onUpdate={onUpdate} />
    </View>
  );
}
