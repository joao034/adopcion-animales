import { View, Text, Button } from 'react-native'
import React from 'react'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig'

const ListaMascotas = () => {

  //recuperar el usuario logueado
  const user = FIREBASE_AUTH.currentUser;
  const getUserByEmail = async () => {
    const usersCollection = FIREBASE_DB().collection('users');
    //buscar el usuario en la base de datos
    try {
      const querySnapshot = await usersCollection.where('email', '===', user.email).get();
  
      if (querySnapshot.empty) {
        // No se encontraron usuarios con este correo electrónico
        return null;
      } else {
        // Recuperar el primer usuario encontrado (debería ser único)
        const userDocument = querySnapshot.docs[0];
        console.log(userDocument.data());
        return userDocument.data();
      }
    } catch (error) {
      console.error('Error al recuperar usuario por correo electrónico:', error);
      throw error;
    }

  }

  const userLogged = getUserByEmail();
  

  return (
    <View>
      <Text>Bienvenido {""}</Text>
      <Button onPress={ () => FIREBASE_AUTH.signOut()} title="Salir"></Button>
    </View>
  )
}

export default ListaMascotas