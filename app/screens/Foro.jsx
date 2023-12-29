import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useState, useEffect, useLayoutEffect } from "react";
import {
  getTestimonios,
  postTestimonio,

} from "../services/testimonioService";
import CustomCard from "../components/CustomCard";
import PERFIL from "../../assets/img/user.png";
import COLORS from "../consts/colors";
import CustomModal from "../components/CustomModal";
import CustomInput from "../components/CustomInput";
import { collection, onSnapshot } from "firebase/firestore";
import { FIREBASE_DB } from "../../FirebaseConfig";

const Foro = ({ ...props }) => {
  const [testimonios, setTestimonios] = useState([]);
  const [testimonio, setTestimonio] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  /* useEffect(() => {
    const getTestimoniosData = async () => {
      const listaTestimonios = await getTestimonios( (newTratamientos) => {
        setTestimonios(newTratamientos);
      });
      setTestimonios(listaTestimonios);
    };
    getTestimoniosData();
  }, []); */

  useEffect(() => {
    const unsuscribe = onSnapshot(
      collection(FIREBASE_DB, "testimonios"),
      (snapshot) => {
        // listen to changes in the collection in firestore
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            // if a new file is added, add it to the state
            setTestimonios((prevFiles) => [...prevFiles, change.doc.data()]);
          }
          //no funciona
          if (change.type === "removed") {
            setTestimonios((prevFiles) =>
              prevFiles.filter(
                (testimonio) => testimonio.id !== change.doc.id
            ));
          }
        });
      }
    );
    return () => unsuscribe();
  }, []);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setIsModalVisible(!isModalVisible)}>
          <Text style={styles.text_button}>+ Agregar</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  const getDate = (dateObject) => {
    const seconds = dateObject.seconds;
    const dateFormated = new Date(seconds * 1000).toLocaleDateString("es-ES");
    return dateFormated;
  };

  const modalContent = (
    <View>
      <CustomInput
        label={"Testimonio"}
        placeholder={"Escriba un testimonio o recomendacion"}
        multiline
        numberOfLines={8}
        onChangeText={(text) =>
          setTestimonio({ ...testimonio, testimonio: text })
        }
      />
    </View>
  );

  const addTestimonio = async () => {
    //validar que el testimonio no este vacio
    if (testimonio.testimonio === undefined || testimonio.testimonio === "") {
      Alert.alert("Alerta", "El testimonio no puede estar vacio");
      return;
    }
    const success = await postTestimonio(testimonio);
    if (success) {
      Alert.alert("Éxito", "!Testimonio publicado!");
      setIsModalVisible(!isModalVisible);
      setTestimonio("");
    } else {
      Alert.alert("Alerta", "No se pudo publicar el testimonio");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Testimonios</Text>
      <CustomModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title="Agregar un nuevo testimonio/recomendación"
        content={modalContent}
        functionOK={addTestimonio}
        textoAceptacion={"Publicar"}
      />

      <FlatList
        data={testimonios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              //props.navigation.navigate("Show", { animalId: item.id });
            }}
          >
            <CustomCard>
              <View style={styles.header}>
                <Image source={PERFIL} style={styles.image} />
                <Text style={styles.text}>
                  {" "}
                  {item.usuario.nombre} ({getDate(item.fecha)})
                </Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.text}>{item.testimonio}</Text>
              </View>
            </CustomCard>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    marginBottom: 10,
  },
  fila: {
    flexDirection: "row",
    marginBottom: 10,
  },
  columna: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  text_button: {
    color: COLORS.primary,
    padding: 10,
  },
});

export default Foro;
