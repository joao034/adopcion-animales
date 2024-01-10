import {
  View,
  ScrollView,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FIREBASE_STORAGE } from "../../../FirebaseConfig";

import { useEffect, useState } from "react";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import CustomDropdown from "../CustomDropdown";
import BreedDropdown from "../BreedDropdown";
import COLORS from "../../consts/colors";
import Icono from "../../../assets/img/noIcon.png";

const AnimalForm = ({ title, initialData, onSubmit }) => {
  const [animal, setAnimal] = useState({});
  const [errors, setErrors] = useState({});
  const [especie, setEspecie] = useState(""); //dropdown
  const [sexo, setSexo] = useState(""); //dropdown
  const [esterilizado, setEsterilizado] = useState(""); //dropdown
  const [tamanio, setTamanio] = useState(""); //dropdown
  const [edad, setEdad] = useState(""); //dropdown
  const [estado, setEstado] = useState(""); //dropdown
  const [image, setImage] = useState(null);

  useEffect(() => {
    setAnimal(initialData);
    setEspecie(initialData.especie);
    setSexo(initialData.sexo);
    setEsterilizado(initialData.esterilizado);
    setTamanio(initialData.tamanio);
    setEdad(initialData.edad);
    setEstado(initialData.estado);
  }, [initialData]);

  const tipoAnimal = [
    { label: "Perro", value: "Perro" },
    //{ label: "Gato", value: "Gato" },
  ];

  const dataSexo = [
    { label: "Macho", value: "Macho" },
    { label: "Hembra", value: "Hembra" },
  ];

  const dataEsterilizado = [
    { label: "Sí", value: "Sí" },
    { label: "No", value: "No" },
  ];

  const dataTamanio = [
    { label: "Pequeño", value: "Pequeño" },
    { label: "Mediano", value: "Mediano" },
    { label: "Grande", value: "Grande" },
  ];

  const dataEdad = [
    { label: "Cachorro", value: "Cachorro" },
    { label: "Joven", value: "Joven" },
    { label: "Adulto", value: "Adulto" },
    { label: "Anciano", value: "Anciano" },
  ];

  const dataEstado = [
    { label: "En adopción", value: "En adopción" },
    { label: "En proceso", value: "En proceso" },
    { label: "Adoptado", value: "Adoptado" },
  ];

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

    if (animal.esterilizado === "") {
      handleError(
        "esterilizado",
        "Debe ingresar si el animal está esterilizado"
      );
      isValid = false;
    }

    if (animal.edad === "") {
      handleError("edad", "Debe ingresar la etapa de vida del animal");
      isValid = false;
    }

    if (animal.estado === "") {
      handleError("estado", "Debe ingresar el estado del animal");
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

  const pickImage = async () => {
    try {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // All, Images, Videos
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        uploadImage(result.assets[0].uri);
        //onImageChange(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const takePhoto = async () => {
    try {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // All, Images, Videos
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);
      if (!result.canceled) {
        console.log("result", result.assets[0].uri);
        setImage(result.assets[0].uri);
        uploadImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async (image) => {
    try {
      const { uri } = await FileSystem.getInfoAsync(image);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          console.log(e);
          reject(new TypeError("Error al subir la imagen"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });
      const refer = ref(FIREBASE_STORAGE, "images/" + new Date().getTime());
      // Sube la imagen a Firebase Storage
      await uploadBytes(refer, blob);
      console.log("Imagen subida correctamente");
      // Obtiene la URL de la imagen
      const url = await getDownloadURL(refer);
      //setea la url de la imagen en el estado
      setAnimal((prevAnimal) => ({ ...prevAnimal, imagenUrl: url }));

      //setImage(null);
    } catch (error) {
      console.log(error);
    }
  };

  //enviar datos actualizados del animal a la screen EditAnimal
  const handleSubmit = () => {
    onSubmit(animal);
  };

  // recibe el value seleccionado de la raza y setea el valor en el state animal
  const onSelected = (value) => {
    setAnimal((prevState) => ({ ...prevState, raza: value }));
  };

  // recibe el value seleccionado del dropdown y setea el valor en el state animal
  const handleDropdownChange = (value, name, setValue) => {
    handleChangeText(value, name);
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
        <TouchableOpacity onPress={takePhoto}>
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
            label={"Nombre del animal:"}
            placeholder={"Nombre"}
            onChangeText={(value) => handleChangeText(value, "nombre")}
            value={animal.nombre || ""}
            onFocus={() => handleError("nombre", "")}
            error={errors.nombre}
          />

          <CustomDropdown
            label={"Tipo de animal:"}
            data={tipoAnimal}
            value={especie || ""}
            onChange={(item) =>
              handleDropdownChange(
                item.value,
                "especie",
                setEspecie(item.value)
              )
            }
            labelField="label"
            valueField="value"
            placeholder={"Seleccione el tipo de animal"}
            search={false}
            error={errors.especie}
          />
          <BreedDropdown
            breedSelected={animal.raza}
            onSelected={onSelected}
            error={errors.raza}
          />

          <CustomDropdown
            label={"Sexo:"}
            data={dataSexo}
            value={sexo || ""}
            onChange={(item) =>
              handleDropdownChange(item.value, "sexo", setSexo(item.value))
            }
            labelField="label"
            valueField="value"
            placeholder={"Seleccione el sexo del animal"}
            search={false}
            error={errors.sexo}
          />
          <CustomDropdown
            label={"Estado de adopción"}
            data={dataEstado}
            value={estado || ""}
            onChange={(item) =>
              handleDropdownChange(item.value, "estado", setEstado(item.value))
            }
            labelField="label"
            valueField="value"
            placeholder={"Seleccione el estado del animal"}
            search={false}
            error={errors.estado}
          />

          <CustomDropdown
            label={"Esterilizado:"}
            data={dataEsterilizado}
            value={esterilizado || ""}
            onChange={(item) =>
              handleDropdownChange(
                item.value,
                "esterilizado",
                setEsterilizado(item.value)
              )
            }
            labelField="label"
            valueField="value"
            placeholder={"¿Está esterilizado?"}
            search={false}
            error={errors.esterilizado}
          />

          <CustomDropdown
            label={"Etapa de vida:"}
            data={dataEdad}
            value={edad || ""}
            onChange={(item) =>
              handleDropdownChange(item.value, "edad", setEdad(item.value))
            }
            labelField="label"
            valueField="value"
            placeholder={"Etapa de vida del animal"}
            search={false}
            error={errors.edad}
          />

          <CustomDropdown
            label={"Tamaño:"}
            data={dataTamanio}
            value={tamanio || ""}
            onChange={(item) =>
              handleDropdownChange(
                item.value,
                "tamanio",
                setTamanio(item.value)
              )
            }
            labelField="label"
            valueField="value"
            placeholder={"Seleccione el tamaño del animal"}
            search={false}
            error={errors.tamanio}
          />

          <CustomInput
            label={"Peso en kg:"}
            placeholder={"Peso"}
            onChangeText={(value) => handleChangeText(value, "peso")}
            value={animal.peso || ""}
            keyboardType="numeric"
            onFocus={() => handleError("peso", "")}
            error={errors.peso}
          />

          <CustomInput
            label={"Características:"}
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
