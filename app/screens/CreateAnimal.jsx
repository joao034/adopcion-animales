import { View, Alert } from "react-native";
import { useState } from "react";
import AnimalForm from "../components/forms/AnimalForm";
import { addAnimal } from "../services/animalesService";

const CreatePet = ( { ...props } ) => {
  //Quitar el initial state
  const initialState = {
    nombre: "",
    especie: "",
    raza: "",
    imagenUrl: "",
    edad: "",
    sexo: "",
    caracteristicas: "",
    estado: "",
    peso: "",
    tamanio: "",
    esterilizado: "",
    createdAt: new Date(),
  };

    const [animal, setAnimal] = useState(initialState);
    //const [image, setImage] = useState(null);

    // recibe los nuevos datos del animal desde el formulario y actualiza el estado
    const onSubmit = (newAnimal)  => {
        handleCreate(newAnimal);
    }

    const handleCreate = async (animal) => {
        try {
          await addAnimal(animal);
          Alert.alert("Éxito", "Datos guardados correctamente");
          props.navigation.navigate("List", { animalId: animal.id });
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <View>
      <AnimalForm title={"Registrar animal"} initialData={animal} onSubmit={onSubmit}/>
    </View>
  );
};

export default CreatePet;
