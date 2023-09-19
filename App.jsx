import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";

import Login from "./app/screens/Login";
import Register from "./app/screens/Register";
import ListaMascotas from "./app/screens/ListaMascotas";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig"


const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

// Renderiza una pila de navegación interna cuando el usuario tenga una sesion activa
function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="ListaMascotas" component={ListaMascotas} />
    </InsideStack.Navigator>
  );
}

export default function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        { user ? <Stack.Screen name="Inside" component={InsideLayout} options={{ headerShown: false }} /> :  
        <><Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }} /><Stack.Screen
              name="Register"
              component={Register}
              options={{ title: "Registro de Usuarios" }} /></>
      }
      </Stack.Navigator>
    </NavigationContainer>
  );
}
