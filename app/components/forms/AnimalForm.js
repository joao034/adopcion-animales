import {
  View,
  ScrollView,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

import { useEffect, useState } from "react";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import CustomDropdown from "../CustomDropdown";
import BreedDropdown from "../BreedDropdown";
import COLORS from "../../consts/colors";
import Icono from "../../../assets/img/noPhoto.png";

const AnimalForm = ({ title, initialData, pickImage, onUpdate }) => {

  const [animal, setAnimal] = useState(initialData || {});
  const [errors, setErrors] = useState({});
  //const [image, setImage] = useState(null);

  const tipoAnimal = ["Perro", "Gato"];

  useEffect(() => {
    setAnimal(initialData);
  }, [initialData]);

  useEffect(() => {
    console.log(animal);
  }, [animal]);

  const validate = () => {
    let isValid = true;
    if (animal.nombre === "") {
      handleError("nombre", "Debe ingresar el nombre del animal");
      isValid = false;
    }

    if (animal.especie === "") {
      handleError("especie", "Debe ingresar la especie del animal");
      isValid = false;
    }

    if (animal.raza === "") {
      handleError("raza", "Debe ingresar la raza del animal");
      isValid = false;
    }

    if (animal.sexo === "") {
      handleError("sexo", "Debe ingresar el sexo del animal");
      isValid = false;
    }

    if (animal.peso === "") {
      handleError("peso", "Debe ingresar el peso del animal");
      isValid = false;
    }

    if (animal.tamanio === "") {
      handleError("tamanio", "Debe ingresar el tamaño del animal");
      isValid = false;
    }

    if (animal.caracteristicas === "") {
      handleError(
        "caracteristicas",
        "Debe ingresar las características del animal"
      );
      isValid = false;
    }

    //valida que se seleccione una imagen para el animal
    if (animal.imagenUrl === "") {
      Alert.alert("Error", "Debe seleccionar una imagen del animal");
      isValid = false;
    }

    if (isValid) {
      handleSubmit();
    }
  };

  //enviar datos actualizados del animal a la screen EditAnimal
  const handleSubmit = () => {
    onUpdate(animal);
  };

  // recibe el value seleccionado y setea el valor en el state animal
  const onSelected = (value) => {
    setAnimal((prevState) => ({ ...prevState, raza: value }));
  };

  const handleChangeText = (value, name) => {
    setAnimal({ ...animal, [name]: value });
  };

  handleError = (input, error) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {/* <UploadMediaFile onImageChange={handleImageChange} /> */}
        <TouchableOpacity onPress={pickImage}>
          {animal.imagenUrl ? (
            <Image source={{ uri: animal.imagenUrl }} style={styles.image} />
          ) : (
            <>
              <Image source={Icono} style={{ width: 170, height: 170 }} />
              <Text style={{ textAlign: "center", color: COLORS.gray }}>
                Seleccione una imagen
              </Text>
            </>
          )}
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <CustomInput
            placeholder={"Nombre"}
            onChangeText={(value) => handleChangeText(value, "nombre")}
            value={animal.nombre || ""}
            onFocus={() => handleError("nombre", "")}
            error={errors.nombre}
          />

          <BreedDropdown breedSelected={animal.raza} onSelected={onSelected}/>

          <CustomInput
            placeholder={"Tipo de animal"}
            onChangeText={(value) => handleChangeText(value, "especie")}
            value={animal.especie || ""}
            onFocus={() => handleError("especie", "")}
            error={errors.especie}
          />
          <CustomInput
            placeholder={"Raza"}
            onChangeText={(value) => handleChangeText(value, "raza")}
            value={animal.raza || ""}
            onFocus={() => handleError("raza", "")}
            error={errors.raza}
          />
          <CustomInput
            placeholder={"Sexo"}
            onChangeText={(value) => handleChangeText(value, "sexo")}
            value={animal.sexo || ""}
            onFocus={() => handleError("sexo", "")}
            error={errors.sexo}
          />
          <View style={styles.rowContainer}>
            <CustomInput
              placeholder={"Peso"}
              onChangeText={(value) => handleChangeText(value, "peso")}
              value={animal.peso || ""}
              keyboardType="numeric"
              onFocus={() => handleError("peso", "")}
              error={errors.peso}
            />
            <CustomInput
              placeholder={"Tamaño"}
              onChangeText={(value) => handleChangeText(value, "tamanio")}
              value={animal.tamanio || ""}
              onFocus={() => handleError("tamanio", "")}
              error={errors.tamanio}
            />
          </View>

          <CustomInput
            placeholder={"Características"}
            onChangeText={(value) => handleChangeText(value, "caracteristicas")}
            value={animal.caracteristicas || ""}
            onFocus={() => handleError("caracteristicas", "")}
            error={errors.caracteristicas}
            multiline={true}
          />
          <CustomButton title="Guardar" onPress={validate} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  image: {
    width: 170,
    height: 170,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginBottom: 10,
  },
  inputContainer: {
    width: "80%",
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default AnimalForm;
