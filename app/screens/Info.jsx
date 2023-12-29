import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React from "react";
import COLORS from "../consts/colors";
import Informacion from "../../assets/img/info.png";
import CustomCard from "../components/CustomCard";

const Info = () => {
  console.log('Biecnvenidio')
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Adopción Responsable</Text>
        <Image source={Informacion} style={styles.logo} resizeMode="contain" />
        <CustomCard>
          <Text style={styles.subtitle}>¿Qué es la adopción responsable?</Text>
          <Text style={styles.text}>
            La adopción responsable es fundamental para el bienestar de los
            animales. Descubre cómo puedes hacer la diferencia y brindarles un
            hogar lleno de amor y cuidados
          </Text>
        </CustomCard>
        <Text style={styles.subtitle}>Consejos de cuidado de la mascota</Text>
        <CustomCard>
          <Text style={styles.items}>
            "Esteriliza a tu mascota para controlar la población y mejorar su
            salud."
          </Text>
        </CustomCard>
        <CustomCard>
          <Text style={styles.items}>
            "Proporciona atención veterinaria regular para garantizar su
            bienestar."
          </Text>
        </CustomCard>
        <CustomCard>
          <Text style={styles.items}>
            "Adopta solo si estás comprometido a cuidar a tu mascota durante
            toda su vida."
          </Text>
        </CustomCard>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 10,
    textAlign: "center",
  },
  logo: {
    width: 300,
    height: 200,
    alignSelf: "center",
  },
  text: {
    fontSize: 16,
    color: COLORS.black,
    textAlign: "justify",
  },
  items:{
    fontSize: 16,
    color: COLORS.black,
    textAlign: "justify",
    marginBottom: 10,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    textAlign: "center",
  },
});

export default Info;
