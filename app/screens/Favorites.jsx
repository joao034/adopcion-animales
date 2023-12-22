import { View, Text } from "react-native";


const Favorites = () => {
  return (
    <View>
      
      <FlatList
        keyExtractor={(item) => item.id}
        data={solicitudesAdopcion}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => { props.navigation.navigate("Show", { solicitudId: item.id }) }}>
            <CustomCard>
              <Text style={styles.text_primary}>
                Cliente:{item.usuario.nombre}
              </Text>
              {/* <Text style={styles.text}>
                Fecha: {getDate(item.fechaRegistro)}
              </Text> */}
              <Text style={styles.text}>
                Posible Adoptante para: {item.animal.nombre}
              </Text>
              <Text style={styles.link}>Ver info</Text>
            </CustomCard>
          </TouchableOpacity>
        )}
      />

    </View>
  );
};

export default Favorites;
