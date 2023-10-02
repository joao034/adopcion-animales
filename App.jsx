import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import Login from "./app/screens/Login";
import Register from "./app/screens/Register";
import { TabsCliente, TabsAdmin } from "./app/navigation/Tabs";
import { getUserData } from "./app/services/authService"

const Stack = createNativeStackNavigator();

export default function App( ) {
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        try {
          setIsLoggedIn(true);
          const userData = await getUserData(user.uid);
          setAuthUser(userData || null); // Utiliza null en lugar de undefined
        } catch (error) {
          console.error("Error al obtener datos del usuario:", error);
          setAuthUser(null);
        }
      } else {
        setAuthUser(null);
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn && authUser ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Tabs"
            initialParams={{ authUser: authUser, setIsLoggedIn: setIsLoggedIn, setAuthUser: setAuthUser }}
            component={authUser.perfil == "admin" ? TabsAdmin : TabsCliente}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ title: "Registro de Usuarios" }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
