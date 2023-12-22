import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { getUserData } from "../services/authService";
import { useState, useEffect, useLayoutEffect } from "react";

const Profile = ({ route, ...props }) => {
  //Datos recibidos desde el componente padre
  const { authUser, setAuthUser, setIsLoggedIn } = route.params;

  const [user, setUser] = useState(null);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.button}
          onPress={() => FIREBASE_AUTH.signOut()}
        >
          <Text style={styles.text_button}>Cerrar sesión</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserData(FIREBASE_AUTH.currentUser.uid);
      console.log("user", user);
    };
    getUser();
  }, []);

  /* useEffect(() => {
    try {
      const getUser = async () => {
        const user = await getUserData(FIREBASE_AUTH.currentUser.uid);
        user ? setUser(user) : setUser(null);
      };
      getUser();
    } catch (error) {
      console.error("error ->", error);
    }
  }, []); */

  /* const handleSignOut = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      setAuthUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  }; */

  return (
    <View>
      {authUser ? (
        <Text>Bienvenido {authUser.id}</Text>
      ) : (
        <Text>Cargando...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 10,
  },
  text_button: {
    color: "#c32c8b",
  },
});

export default Profile;
