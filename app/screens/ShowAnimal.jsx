import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { getAnimal, deleteAnimal } from "../services/animalesService";
import CustomButton from "../components/CustomButton";

const ShowAnimal = ({ route, props }) => {
  const { animalId } = route.params;

  const [animal, setAnimal] = useState({});

  useEffect(async () => {
    const animalData = await getAnimal( animalId );
    if (animalData) setAnimal(animalData);
  }, []);

  const eliminarAnimal = async () => {
    const success = await deleteAnimal(animalId);
    if (success) {
      alert("Animal eliminado");
      props.navigation.navigate('List') 
    }else{
      alert("Animal no eliminado");
    }
  };

  return (
    <View>
      <Text>Nombre: {animal.nombre}</Text>
      <Text>Raza: {animal.raza}</Text>
      <Text>Tamaño: {animal.tamanio} </Text>
      <CustomButton title="Eliminar" onPress={eliminarAnimal}/>
    </View>
  );
};

export default ShowAnimal;
