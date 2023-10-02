import { View, Text, Alert } from "react-native";
import { useState } from "react";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { addAnimal } from "../services/animalesService";

const CreateAnimal = ( props ) => {
  const initialState = {
    nombre: "",
    especie: "",
    raza: "",
    imagenUrl: "",
    edad: "",
    sexo: "",
    caracteristicas: "",
    estado: "",
    color: "",
    peso: "",
    tamanio: "",
  };

  const [animal, setAnimal] = useState(initialState);

  const handleChangeText = (value, name) => {
    setAnimal({ ...animal, [name]: value });
  };

  const saveAnimal = async () => {
    const success = await addAnimal( animal )
    if (success){
      Alert.alert('Éxito', '!Animal registrado correctamente!')
      props.navigation.navigate("ListaMascotas")
    }
    else
      Alert.alert('Alerta', 'Animal registrado correctamente')
  };

  return (
    <View>
      <Text>Registrar un animal</Text>
      <View>
        <CustomInput
          placeholder={"Nombre"}
          onChangeText={(value) => handleChangeText(value, "nombre")}
          value={animal.nombre}
        />
        <CustomInput
          placeholder={"Tipo de animal"}
          onChangeText={(value) => handleChangeText(value, "especie")}
          value={animal.especie}
        />
        <CustomInput
          placeholder={"Raza"}
          onChangeText={(value) => handleChangeText(value, "raza")}
          value={animal.raza}
        />
        <CustomInput
          placeholder={"Sexo"}
          onChangeText={(value) => handleChangeText(value, "sexo")}
          value={animal.sexo}
        />
        <CustomInput
          placeholder={"Peso"}
          onChangeText={(value) => handleChangeText(value, "peso")}
          value={animal.peso}
          keyboardType="numeric"
        />
        <CustomInput
          placeholder={"Tamaño"}
          onChangeText={(value) => handleChangeText(value, "tamanio")}
          value={animal.tamanio}
        />
      </View>
      <View>
        <CustomButton title="Guardar" onPress={saveAnimal} />
      </View>
    </View>
  );
};

export default CreateAnimal;
