import { View, Text } from "react-native";
import CustomDropdown from "./CustomDropdown";
import { useState, useEffect } from "react";
import COLORS from "../consts/colors";

const BreedDropdown = ({ breedSelected, onSelected, error}) => {
  const dogBreeds = [
    { label: "No determinada", value: "No determinada" },
    { label: "Labrador Retriever", value: "Labrador Retriever" },
    { label: "Bulldog", value: "Bulldog" },
    { label: "Golden Retriever", value: "Golden Retriever" },
    { label: "Pastor Alemán", value: "Pastor Alemán" },
    { label: "Caniche", value: "Caniche" },
    { label: "Beagle", value: "Beagle" },
    { label: "Rottweiler", value: "Rottweiler" },
    { label: "Yorkshire Terrier", value: "Yorkshire Terrier" },
    { label: "Bulldog Francés", value: "Bulldog Francés" },
    { label: "Boxer", value: "Boxer" },
    { label: "Dálmata", value: "Dálmata" },
    { label: "Doberman", value: "Doberman" },
    { label: "Cocker Spaniel", value: "Cocker Spaniel" },
    { label: "Pomerania", value: "Pomerania" },
    { label: "Border Collie", value: "Border Collie" },
    { label: "Shih Tzu", value: "Shih Tzu" },
    { label: "Schnauzer", value: "Schnauzer" },
    { label: "Bulldog Inglés", value: "Bulldog Inglés" },
    { label: "Husky Siberiano", value: "Husky Siberiano" },
    { label: "Chihuahua", value: "Chihuahua" },
    { label: "Pug", value: "Pug" },
    { label: "Poodle", value: "Poodle" },
    { label: "Bichón Maltés", value: "Bichón Maltés" },
    { label: "Dachshund", value: "Dachshund" },
    { label: "Shar Pei", value: "Shar Pei" },
    { label: "Papillón", value: "Papillón" },
    { label: "Bóxer", value: "Bóxer" },
    { label: "Terranova", value: "Terranova" },
    { label: "Boston Terrier", value: "Boston Terrier" },
    { label: "Greyhound", value: "Greyhound" },
    { label: "Collie", value: "Collie" },
    { label: "Basset Hound", value: "Basset Hound" },
    { label: "San Bernardo", value: "San Bernardo" },
    { label: "Gran Danés", value: "Gran Danés" },
    { label: "Pequinés", value: "Pequinés" },
    { label: "Galgo Español", value: "Galgo Español" },
    { label: "Chow Chow", value: "Chow Chow" },
    { label: "Bichón Frisé", value: "Bichón Frisé" },
    { label: "Lhasa Apso", value: "Lhasa Apso" },
    { label: "Setter Irlandés", value: "Setter Irlandés" },
    { label: "Shiba Inu", value: "Shiba Inu" },
    { label: "Fox Terrier", value: "Fox Terrier" },
    { label: "Cane Corso", value: "Cane Corso" },
    { label: "Bulldog Americano", value: "Bulldog Americano" },
    {
      label: "Staffordshire Bull Terrier",
      value: "Staffordshire Bull Terrier",
    },
    { label: "Corgi", value: "Corgi" },
    { label: "Akita Inu", value: "Akita Inu" },
    { label: "Bóxer Americano", value: "Bóxer Americano" },
    { label: "Galgo Afgano", value: "Galgo Afgano" },
    { label: "Leonberger", value: "Leonberger" },
  ];

  const [value, setValue] = useState(null);
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    setBreeds(dogBreeds);
  }, []);

  //setea la raza del animal en el dropdown
  useEffect(() => {
    setValue(breedSelected);
  },[breedSelected])

  const onChange = (item) => {
    setValue(item.value);
    handleSelected(item.value);
  };

  //enviar el item seleccionado a AnimalForm
  const handleSelected = (item) => {
    onSelected(item);
  };

  return (
    <View>
      <CustomDropdown
        label={"Raza:"}
        data={breeds}
        value={value}
        onChange={onChange}
        placeholder={"Selecciona la raza del animal"}
        searchPlaceholder="Buscar la raza del animal"
        labelField="label"
        valueField="value"
      />
      {error && <Text style={{ color: COLORS.red, marginTop: 5 }}>{error}</Text>}
    </View>
  );
};

export default BreedDropdown;
