import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { useEffect, useState, useLayoutEffect } from "react";
import { getAnimales } from "../services/animalesService";
import CustomCard from "../components/CustomCard";
import CustomButton from "../components/CustomButton";
import COLORS from "../consts/colors";
import CustomModal from "../components/CustomModal";
import CustomDropdown from "../components/CustomDropdown";

const ListaMascotas = ({ route, ...props }) => {
  //Datos recibidos desde el componente padre
  const { authUser, setAuthUser, setIsLoggedIn } = route.params;
  const [animales, setAnimales] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [sexo, setSexo] = useState("");
  const [edad, setEdad] = useState("");
  const [tamanio, setTamanio] = useState("");
  const [estado, setEstado] = useState("En adopción");
  const [parametros, setParametros] = useState({});

  const [errors, setErrors] = useState({});

  //data
  const dataSexo = [
    { label: "Todos", value: "Todos"},
    { label: "Macho", value: "Macho" },
    { label: "Hembra", value: "Hembra" },
  ];
  const dataEdad = [
    { label: "Todos", value: "Todos"},
    { label: "Cachorro", value: "Cachorro" },
    { label: "Joven", value: "Joven" },
    { label: "Adulto", value: "Adulto" },
    { label: "Anciano", value: "Anciano" },
  ];
  const dataTamanio = [
    { label: "Todos", value: "Todos"},
    { label: "Pequeño", value: "Pequeño" },
    { label: "Mediano", value: "Mediano" },
    { label: "Grande", value: "Grande" },
  ];
  const dataEstado = [
    { label: "Todos", value: "Todos"},
    { label: "En adopción", value: "En adopción" },
    { label: "En proceso", value: "En proceso" },
    { label: "Adoptado", value: "Adoptado" },
  ];

  const handleDropdownChange = (value, name) => {
    setParametros({ ...parametros, [name]: value });
  };

  useLayoutEffect(() => {
    if (authUser.perfil === "admin") {
      props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={() => props.navigation.navigate("Create")}>
            <Text style={styles.text_button}>+ Agregar</Text>
          </TouchableOpacity>
        ),
      });
    }
  }, []);

  useEffect(() => {
    loadDataAnimales();
  }, [route.params]);

  const modalContent = (
    <View style={styles.modal_container}>

      {
        authUser.perfil === "admin" ? (
          <CustomDropdown
            label={"Estado:"}
            data={dataEstado}
            value={parametros.estado || ""}
            onChange={(item) => {
              handleDropdownChange(item.value, "estado", setEstado(item.value));
            }}
            labelField="label"
            valueField="value"
            placeholder={"Seleccione el estado"}
            search={false}
            //error={errors.sexo}
          />
        ) : null
      }

      <CustomDropdown
        label={"Sexo:"}
        data={dataSexo}
        value={sexo || ""}
        onChange={(item) => {
          handleDropdownChange(item.value, "sexo", setSexo(item.value));
        }}
        labelField="label"
        valueField="value"
        placeholder={"Seleccione el sexo"}
        search={false}
        //error={errors.sexo}
      />
      <CustomDropdown
        label={"Etapa de vida:"}
        data={dataEdad}
        value={edad || ""}
        onChange={(item) => {
          handleDropdownChange(item.value, "edad", setEdad(item.value));
        }}
        labelField="label"
        valueField="value"
        placeholder={"Seleccione la edad"}
        search={false}
        //error={errors.sexo}
      />
      <CustomDropdown
        label={"Tamaño:"}
        data={dataTamanio}
        value={tamanio || ""}
        onChange={(item) => {
          handleDropdownChange(item.value, "tamanio", setTamanio(item.value));
        }}
        labelField="label"
        valueField="value"
        placeholder={"Seleccione el tamaño"}
        search={false}
        //error={errors.sexo}
      />
    </View>
  );

  const loadDataAnimales = async () => {
    const dataAnimales = await getAnimales(parametros);
    dataAnimales ? setAnimales(dataAnimales) : setAnimales([]);
  };

  const filtrarAnimales = () => {
    setIsModalVisible(!isModalVisible);
    loadDataAnimales(parametros);
  }

  return (
    <View style={styles.container}>
      <CustomModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title="Busque a su mascota ideal"
        content={modalContent}
        functionOK={filtrarAnimales}
        textoAceptacion={"Buscar"}
      />

      <View style={styles.button_container}>
        <CustomButton
          title="Buscador"
          onPress={() => setIsModalVisible(!isModalVisible)}
        />
      </View>

      <FlatList
        data={animales}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              authUser.perfil === "admin"
                ? props.navigation.navigate("Edit", { animalId: item.id })
                : props.navigation.navigate("Show", { animalId: item.id });
            }}
          >
            <CustomCard>
              <Image style={styles.image} source={{ uri: item.imagenUrl }} />
              <Text style={styles.text}>{item.nombre}</Text>
              <Text style={{ textAlign: "center" }}>
                {item.sexo} - {item.tamanio}
              </Text>
            </CustomCard>
          </TouchableOpacity>
        )}
        numColumns={2}
        contentContainerStyle={{ gap: 2, flexGrow: 1 }}
        columnWrapperStyle={{ gap: 2, justifyContent: "center" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignContent: "center",
  },
  modal_container: {
    backgroundColor: "#fff",
    alignContent: "center",
    width: 200,
  },
  text: {
    color: "#4d4d4d",
    fontSize: 18,
    textAlign: "center",
  },
  text_button: {
    color: COLORS.primary,
  },
  image: {
    width: 140,
    height: 130,
    borderRadius: 5,
  },
  button_container: {
    width: "70%",
    alignSelf: "center",
  },
});

export default ListaMascotas;
