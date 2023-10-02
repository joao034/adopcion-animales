import {
  Image,
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { useEffect, useState } from "react";
import Perro from "../../assets/img/perro.png";

import { getAnimales } from "../services/animalesService";

import CustomCard from "../components/CustomCard";
import CustomButton from "../components/CustomButton";

const ListaMascotas = ( props ) => {

  const [animales, setAnimales] = useState([]);

  useEffect( async () => {
    const dataAnimales = await getAnimales();
    setAnimales(dataAnimales);
  }, []);

  useEffect(() => {
    console.log("Animales:", animales);
  }, [animales]);

  return (
    <ScrollView>
      <CustomButton
        title={"Agregar Animal"}
        type={"SECONDARY"}
        onPress={() => props.navigation.navigate("Create")}
      >
      </CustomButton>

      <View>
        <FlatList
          data={animales}
          renderItem={({ item }) => (
            <TouchableOpacity key={ item.id }
              onPress={() => props.navigation.navigate("Show", { animalId: item.id } )}
            >
              <CustomCard>
                <Text>{item.nombre}</Text>
              </CustomCard>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default ListaMascotas;
