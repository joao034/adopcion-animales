import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { getUserData } from "../services/authService";
import { useState, useEffect, useLayoutEffect } from "react";
import User from "../../assets/img/user.png";

const Profile = ({ route, ...props }) => {
  //Datos recibidos desde el componente padre
  const { authUser, setAuthUser, setIsLoggedIn } = route.params;

  const [user, setUser] = useState({});

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.button}
          onPress={() => FIREBASE_AUTH.signOut()
            .then(() => {
              setIsLoggedIn(false);
              setAuthUser(null);
            })
            .catch((error) => console.log("Error al cerrar sesión", error))
          }
        >
          <Text style={styles.text_button}>Cerrar sesión</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserData(authUser.id);
      setUser(user);
    };
    getUser();
  }, []);

  return (
    <ScrollView>
      <View>
        {authUser && (
          <>
            <Text style={styles.title}>Bienvenido</Text>
            <Image source={User} style={styles.image}></Image>
            <View style={styles.container}>
              <View style={styles.fila}>
                <View style={styles.columna}>
                  <Text style={styles.subtitle}>Nombres : </Text>
                </View>
                <View style={styles.columna}>
                  <Text style={styles.text}>{user.nombres}</Text>
                </View>
              </View>
              <View style={styles.fila}>
                <View style={styles.columna}>
                  <Text style={styles.subtitle}>Apellidos : </Text>
                </View>
                <View style={styles.columna}>
                  <Text style={styles.text}>{user.apellidos}</Text>
                </View>
              </View>
              <View style={styles.fila}>
                <View style={styles.columna}>
                  <Text style={styles.subtitle}>Cédula : </Text>
                </View>
                <View style={styles.columna}>
                  <Text style={styles.text}>{user.cedula}</Text>
                </View>
              </View>
              <View style={styles.fila}>
                <View style={styles.columna}>
                  <Text style={styles.subtitle}>Correo electrónico : </Text>
                </View>
                <View style={styles.columna}>
                  <Text style={styles.text}>{user.email}</Text>
                </View>
              </View>
              <View style={styles.fila}>
                <View style={styles.columna}>
                  <Text style={styles.subtitle}>Perfil : </Text>
                </View>
                <View style={styles.columna}>
                  <Text style={styles.text}>{user.perfil}</Text>
                </View>
              </View>
            </View>
            
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 10,
  },
  text_button: {
    color: "#c32c8b",
  },
  text: {
    fontSize: 16,
    textAlign: "justify",
    paddingTop: 11,
  },
  image: {
    margin: 10,
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  title: {
    paddingTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  subtitle: {
    paddingTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
  container: {
    flexDirection: "column",
    margin: 10,
  },
  fila: {
    flexDirection: "row",
  },
  columna: {
    flex: 1,
  },
});

export default Profile;
