import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/Login';
import ListaMascotas from '../screens/ListaMascotas';
import Register from '../screens/Register';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
         <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={Register} options={{ title: "Registro de Usuarios" }} />
        <Stack.Screen name="ListaMascotas" component={ListaMascotas} options={{ title: "Lista Mascotas" }} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStack