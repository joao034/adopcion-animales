import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ListaMascotas from "../screens/ListaMascotas";
import Foro from "../screens/Foro";
import Favorites from "../screens/Favorites";
import Chat from "../screens/Chat";
import Profile from "../screens/Profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ShowAnimal from "../screens/ShowAnimal";
import Info from "../screens/Info";
import CreateAnimal from "../screens/CreateAnimal";
import EditAnimal from "../screens/EditAnimal";
import SolicitudAdopcion from "../screens/SolicitudAdopcion";
import InfoSolicitudAdopcion from "../screens/InfoSolicitudAdopcion";
import ListaSolicitudesAdopcion from "../screens/ListaSolicitudesAdopcion";
import ShowSolicitudAdopcion from "../screens/ShowSolicitudAdopcion";
import AprobarSolicitudAdopcion from "../screens/AprobarSolicitudAdopcion";

const Tab = createBottomTabNavigator();

//stack del modulo de mascotas
const StackMascotas = createNativeStackNavigator();
const StackSolicitudesAdopcion = createNativeStackNavigator();

function StackMascotasScreen({ route }) {
  return (
    <StackMascotas.Navigator>
      <StackMascotas.Screen
        name="List"
        initialParams={route.params}
        component={ListaMascotas}
        options={{
          title: "Lista de Mascotas",
        }}
      />
      <StackMascotas.Screen
        name="Show"
        initialParams={route.params}
        component={ShowAnimal}
        options={{
          title: "Mascota",
        }}
      />
      <StackMascotas.Screen
        name="InfoSolicitudAdopcion"
        component={InfoSolicitudAdopcion}
        options={{
          title: "Información solicitud de adopción",
        }}
      />
      <StackMascotas.Screen
        name="SolicitudAdopcion"
        component={SolicitudAdopcion}
        options={{
          title: "Solicitud de adopción",
        }}
      />
      <StackMascotas.Screen
        name="Edit"
        component={EditAnimal}
        options={{
          title: "Editar Animal",
        }}
      />
      <StackMascotas.Screen
        name="Create"
        component={CreateAnimal}
        options={{ presentation: "modal", title: "Registrar Animal" }}
      />
    </StackMascotas.Navigator>
  );
}

function StackSolicitudesAdopcionScreen({ route }) {
  return (
    <StackSolicitudesAdopcion.Navigator>
      <StackSolicitudesAdopcion.Screen
        name="List"
        initialParams={route.params}
        component={ListaSolicitudesAdopcion}
        options={{
          title: "Lista de Solicitudes de Adopción",
        }}
      />
      <StackSolicitudesAdopcion.Screen
        name="Show"
        component={ShowSolicitudAdopcion}
        options={{
          title: "Solicitud de Adopción",
        }}
      />
      <StackSolicitudesAdopcion.Screen
        name="Aprobar"
        component={AprobarSolicitudAdopcion}
        options={{
          title: "Aprobar Solicitud de Adopción",
        }}
      />
    </StackSolicitudesAdopcion.Navigator>
  );
}
    

function TabsAdmin({ route }) {
  return (
    <Tab.Navigator
      initialRouteName="List"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
      }}
    >
      <Tab.Screen
        name="StackMascotas"
        initialParams={route.params}
        component={StackMascotasScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Mascotas",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="dog" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="StackSolicitudesAdopcion"
        initialParams={route.params}
        component={StackSolicitudesAdopcionScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Solicitudes",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="file-document-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Foro"
        component={Foro}
        options={{
          tabBarLabel: "Foro",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="newspaper"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chat" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={route.params}
        options={{
          tabBarLabel: "Perfil",
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function TabsCliente({ route }) {
  return (
    <Tab.Navigator
      initialRouteName="List"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
      }}
    >
      <Tab.Screen
        name="Información"
        component={Info}
        options={{
          headerShown: false,
          tabBarLabel: "Información",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="info" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ListaMascotas"
        component={StackMascotasScreen}
        initialParams={route.params}
        options={{
          headerShown: false,
          tabBarLabel: "Mascotas",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="dog" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Foro"
        component={Foro}
        options={{
          tabBarLabel: "Foro",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="newspaper"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          title: "Lista de Animales Favoritos",
          tabBarLabel: "Favoritos",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chat" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={route.params}
        options={{
          title: "Perfil",
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export { TabsAdmin, TabsCliente };
