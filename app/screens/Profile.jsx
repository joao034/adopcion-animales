import { View, Text, Button } from 'react-native'
import { FIREBASE_AUTH } from '../../FirebaseConfig'
import { getUserData } from '../services/authService'
import { useState, useEffect } from 'react'

const Profile = ( { route } ) => {

  const { authUser, setAuthUser, setIsLoggedIn } = route.params
  
  const [user, setUser] = useState(null)

  useEffect( async () => {
    try{
      const user = await getUserData( FIREBASE_AUTH.currentUser.uid )
      if(user)
        setUser(user)
    }catch(error){
      console.error("error ->", error)
    }
  }, [])  

  const handleSignOut = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      setAuthUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <View>
      { user ? <Text>Bienvenido {user.nombres}</Text> : <Text>Cargando...</Text>  }
      <Button
        onPress={handleSignOut}
        title="Salir"
      ></Button>
    </View>
  )
}

export default Profile