import { View, Text, StyleSheet, Image } from "react-native";
import { useState } from "react";
import CustomButton from "../components/CustomButton";
import Perro from "../../assets/img/perroInfo.png";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import COLORS from "../consts/colors";

const InfoSolicitudAdopcion = ({ route, ...props }) => {

  const { animalId } = route.params;

   const [isChecked, setIsChecked] = useState(false)
   const [isButtonDisabled, setIsButtonDisabled] = useState(true) 

    const handleCheckbox = () => {
        //setIsChecked(!isChecked)
        setIsButtonDisabled(!isButtonDisabled)
        console.log('Pressed')
    }

  return (
    <View style={styles.container}>
      {/* <Image src={Perro} style={ styles.image } resizeMode='contain'></Image> */}
      <Text style={styles.info_text}>
        Por favor, llene la siguiente solicitud de adopción con sus datos
        personales e información relacionada a la adopción animal. Nuestros
        asesores revisarán la solicitud y se comunicarán con usted para
        continuar con el proceso.
      </Text>
      <Text style={styles.info_text}>El formulario contiene 4 secciones:</Text>
      <Text style={styles.info_text}>*Sección 1: Datos personales</Text>
      <Text style={styles.info_text}>*Sección 2: Situación Familiar</Text>
      <Text style={styles.info_text}>*Sección 3: Domicilio</Text>
      <Text style={styles.info_text}>
        *Sección 4: Relación con los animales
      </Text>

      <Text style={styles.info_text}>Sugerencias:</Text>
      <Text style={styles.info_text}>
        *Asegúrate de completar las cuatro secciones
      </Text>
      <Text style={styles.info_text}>
        *Se requiere entre 5 a 10 minutos para completar la solicitud
      </Text>

      <BouncyCheckbox
        size={25}
        fillColor={COLORS.primary}
        text="He leído y acepto los términos y condiciones de la solicitud de adopción"
        isChecked={isChecked}
        onPress={() => setIsButtonDisabled(!isButtonDisabled)}
      />

      <CustomButton
        title={`Llenar solicitud de adopción`}
        onPress={() => props.navigation.navigate("SolicitudAdopcion", { animalId: animalId })}
        disabled={isButtonDisabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 220,
    borderRadius: 5,
  },
  info_text: {
    fontSize: 16,
    marginVertical: 5,
    textAlign: "justify",
  },
});

export default InfoSolicitudAdopcion;
