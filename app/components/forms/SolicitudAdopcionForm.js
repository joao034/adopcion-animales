import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import CustomInput from "../CustomInput";
import CustomDropdown from "../CustomDropdown";
import CustomButton from "../CustomButton";
import COLORS from "../../consts/colors";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const formDatosPersonalesForm = ({ onSubmit }) => {
  const [formDatosPersonales, setFormDatosPersonales] = useState({});
  const [formSituacionFamiliar, setFormSituacionFamiliar] = useState({});
  const [formDomicilio, setFormDomicilio] = useState({});
  const [formRelacionAnimales, setFormRelacionAnimales] = useState({});
  const [errors, setErrors] = useState({});
  //estados dropdowns
  const [instruccion, setInstruccion] = useState(""); //dropdown
  const [tipoInmueble, setTipoInmueble] = useState(""); //dropdown
  const [tipoPropiedad, setTipoPropiedad] = useState(""); //dropdown
  const [malaExperienciaAnimales, setMalaExperienciaAnimales] = useState(""); //dropdown
  const [ultimaMascota, setUltimaMascota] = useState(""); //dropdown
  const [sexoUltimaMascota, setSexoUltimaMascota] = useState(""); //dropdown
  const [esterilizadoUltimaMascota, setEsterilizadoUltimaMascota] = useState(""); //dropdown

  useEffect(() => {
    console.log(formRelacionAnimales);
  }, [formRelacionAnimales]);

  //formDatosPersonales
  const dataInstruccion = [
    { label: "Primaria", value: "Primaria" },
    { label: "Secundaria", value: "Secundaria" },
    { label: "Universitaria", value: "Universitaria" },
    { label: "Postgrado", value: "Postgrado" },
  ];

  //formDomicilio
  const dataTipoInmueble = [
    { label: "Casa", value: "Casa" },
    { label: "Apartamento", value: "Apartamento" },
    { label: "Otro", value: "Otro" },
  ];

  const dataTipoPropiedad = [
    { label: "Propia", value: "Propia" },
    { label: "Arrendada", value: "Arrendada" },
  ];

  //formRelacionAnimales
  const dataMalaExperienciaAnimales = [
    { label: "Ataque", value: "Ataque" },
    { label: "Alergia", value: "Alergia" },
    { label: "Mordedura", value: "Mordedura" },
    { label: "Ninguna", value: "Ninguna" },
    { label: "Otras", value: "Otras" },
  ]

  const dataTipoMascotas = [
    { label: "Canino", value: "Canino" },
    { label: "Felino", value: "Felino" },
    { label: "No he tenido", value: "No he tenido" },
    { label: "Otra", value: "Otra" },
  ]

  const dataSexoMascota = [
    { label: "Macho", value: "Macho" },
    { label: "Hembra", value: "Hembra" },
  ]

  const dataEsterilizado = [
    { label: "Si", value: "Si" },
    { label: "No", value: "No" },
  ]

  //enviar datos actualizados del formulario a la screen Solicitud de Adopcion
  const handleSubmit = () => {
    onSubmit(
      formDatosPersonales,
      formSituacionFamiliar,
      formDomicilio,
      formRelacionAnimales
    );
  };

  // recibe el value seleccionado del dropdown y setea el valor en el state formDatosPersonales
  const handleDropdownChange = (value, name) => {
    handleChangeText(value, name);
  };

  // recibe el value seleccionado del dropdown y setea el valor en el state formDomicilio
  const handleDropdownChangeDomicilio = (value, name) => {
    setFormDomicilio({ ...formDomicilio, [name]: value });
  };

  //aumentar nestedKey para agregar mas datos
  //setea los datos de los inputs en el state formDatosPersonales
  const handleChangeText = (value, name) => {
    setFormDatosPersonales({ ...formDatosPersonales, [name]: value });
  };

  //setea los datos de los inputs en el state formSituacionFamiliar
  const handleChangeTextSF = (value, name) => {
    setFormSituacionFamiliar({ ...formSituacionFamiliar, [name]: value });
  };

  //setea los datos de los inputs en el state formDomicilio
  const handleChangeTextDomicilio = (value, name) => {
    setFormDomicilio({ ...formDomicilio, [name]: value });
  };

  //setea los datos de los inputs en el state formRelacionAnimales
  const handleChangeTextRA = (value, name) => {
    setFormRelacionAnimales({ ...formRelacionAnimales, [name]: value });
  };

  handleError = (input, error) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <Text style={styles.titile}>Solicitud de Adopción</Text> */}
        <View style={styles.subcontainer}>
          <Text style={styles.subtitle}>Sección 1: Datos Personales</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.subsubtitle}>Información Básica:</Text>
            <CustomInput
              placeholder={"Nombre Completo"}
              onChangeText={(value) =>
                handleChangeText(value, "nombreCompleto")
              }
              value={formDatosPersonales.nombreCompleto || ""}
              onFocus={() => handleError("nombreCompleto", "")}
              error={errors.nombreCompleto}
            />
            <CustomInput
              placeholder={"Cédula de Identidad	"}
              onChangeText={(value) => handleChangeText(value, "cedula")}
              value={formDatosPersonales.cedula || ""}
              onFocus={() => handleError("cedula", "")}
              error={errors.cedula}
              keyboardType="numeric"
            />
            <CustomInput
              placeholder={"Correo electrónico"}
              onChangeText={(value) => handleChangeText(value, "correo")}
              value={formDatosPersonales.correo || ""}
              onFocus={() => handleError("correo", "")}
              error={errors.correo}
              keyboardType="email-address"
            />
            <CustomInput
              placeholder={"Dirección exacta donde permanecerá el animal"}
              onChangeText={(value) => handleChangeText(value, "direccion")}
              value={formDatosPersonales.direccion || ""}
              onFocus={() => handleError("direccion", "")}
              error={errors.direccion}
            />
            <CustomInput
              placeholder={"Fecha de nacimiento"}
              onChangeText={(value) =>
                handleChangeText(value, "fechaNacimiento")
              }
              value={formDatosPersonales.fechaNacimiento || ""}
              onFocus={() => handleError("fechaNacimiento", "")}
              error={errors.fechaNaciemiento}
            />
            <CustomInput
              placeholder={"Ocupación"}
              onChangeText={(value) => handleChangeText(value, "ocupacion")}
              value={formDatosPersonales.ocupacion || ""}
              onFocus={() => handleError("ocupacion", "")}
              error={errors.ocupacion}
            />
            <Text style={styles.subsubtitle}>Instrucción:</Text>
            <CustomDropdown
              data={dataInstruccion}
              value={instruccion || ""}
              onChange={(item) =>
                handleDropdownChange(
                  item.value,
                  "instruccion",
                  setInstruccion(item.value)
                )
              }
              labelField="label"
              valueField="value"
              placeholder={"¿Cuál es su nivel de instrucción?"}
              search={false}
              error={errors.instruccion}
            />
            <Text style={styles.subsubtitle}>Teléfonos de Contacto:</Text>
            <CustomInput
              placeholder={"Celular"}
              onChangeText={(value) => handleChangeText(value, "celular")}
              value={formDatosPersonales.celular || ""}
              onFocus={() => handleError("celular", "")}
              error={errors.celular}
              keyboardType="numeric"
            />
            <CustomInput
              placeholder={"Teléfono de casa"}
              onChangeText={(value) => handleChangeText(value, "telefonoCasa")}
              value={formDatosPersonales.telefonoCasa || ""}
              onFocus={() => handleError("telefonoCasa", "")}
              error={errors.telefonoCasa}
              keyboardType="numeric"
            />
            <Text style={styles.subsubtitle}>Referencia Personal:</Text>
            <CustomInput
              placeholder={"Nombre Completo"}
              onChangeText={(value) =>
                handleChangeText(value, "referenciaNombreCompleto")
              }
              value={formDatosPersonales.referenciaNombreCompleto || ""}
              onFocus={() => handleError("referenciaNombreCompleto", "")}
              error={errors.referenciaNombreCompleto}
            />
            <CustomInput
              placeholder={"Celular"}
              onChangeText={(value) =>
                handleChangeText(value, "referenciaCelular")
              }
              value={formDatosPersonales.referenciaCelular || ""}
              onFocus={() => handleError("referenciaCelular", "")}
              error={errors.referenciaCelular}
              keyboardType="numeric"
            />
            <CustomInput
              placeholder={"Parentesco"}
              onChangeText={(value) =>
                handleChangeText(value, "referenciaParentesco")
              }
              value={formDatosPersonales.referenciaParentesco || ""}
              onFocus={() => handleError("referenciaParentesco", "")}
              error={errors.referenciaParentesco}
            />
          </View>
        </View>
        <View style={styles.subcontainer}>
          <Text style={styles.subtitle}>Sección 2: Situación Familiar</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.subsubtitle}>
              Nombre una persona que viva con usted:
            </Text>
            <CustomInput
              placeholder={"Nombre y Apellido"}
              onChangeText={(value) =>
                handleChangeTextSF(value, "nombreFamiliar")
              }
              value={formSituacionFamiliar.nombreFamiliar || ""}
              onFocus={() => handleError("nombreCompleto", "")}
              error={errors.nombreFamiliar}
            />
            <CustomInput
              placeholder={"Parentesco"}
              onChangeText={(value) =>
                handleChangeTextSF(value, "parentescoFamiliar")
              }
              value={formSituacionFamiliar.parentescoFamiliar || ""}
              onFocus={() => handleError("parentescoFamiliar", "")}
              error={errors.parentescoFamiliar}
            />
            <CustomInput
              placeholder={"Edad"}
              onChangeText={(value) =>
                handleChangeTextSF(value, "edadFamiliar")
              }
              value={formSituacionFamiliar.edadFamiliar || ""}
              onFocus={() => handleError("edadFamiliar", "")}
              error={errors.edadFamiliar}
              keyboardType="numeric"
            />
            <BouncyCheckbox
              style={{ marginTop: 10 }}
              size={25}
              fillColor={COLORS.primary}
              text="¿Algún familiar espera un bebé?"
              onPress={(value) => handleChangeTextSF(value, "esperaBebe")}
            />
          </View>
        </View>
        <View style={styles.subcontainer}>
          <Text style={styles.subtitle}>Sección 3: Dimicilio</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.subsubtitle}>
              Caracteristicas del inmueble:{" "}
            </Text>
            <CustomDropdown
              data={dataTipoInmueble}
              value={tipoInmueble || ""}
              onChange={(item) =>
                handleDropdownChangeDomicilio(
                  item.value,
                  "tipoInmueble",
                  setTipoInmueble(item.value)
                )
              }
              labelField="label"
              valueField="value"
              placeholder={"¿Con qué tipo de inmueble cuenta?"}
              search={false}
              error={errors.tipoInmueble}
            />

            <CustomInput
              placeholder={"Área en m2"}
              onChangeText={(value) =>
                handleChangeTextDomicilio(value, "areaInmueble")
              }
              value={formDomicilio.areaInmueble || ""}
              onFocus={() => handleError("areaInmueble", "")}
              error={errors.areaInmueble}
              keyboardType="numeric"
            />
            <Text style={styles.subsubtitle}>Propiedad: </Text>
            <CustomDropdown
              data={dataTipoPropiedad}
              value={tipoPropiedad || ""}
              onChange={(item) =>
                handleDropdownChangeDomicilio(
                  item.value,
                  "tipoPropiedad",
                  setTipoPropiedad(item.value)
                )
              }
              labelField="label"
              valueField="value"
              placeholder={"¿Qué tipo de propiedad es?"}
              search={false}
              error={errors.tipoPropiedad}
            />
            <Text style={styles.subsubtitle}>En caso de ser arrendado: </Text>
            <CustomInput
              placeholder={"Nombre del dueño"}
              onChangeText={(value) =>
                handleChangeTextDomicilio(value, "nombreDuenio")
              }
              value={formDomicilio.nombreDuenio || ""}
              onFocus={() => handleError("nombreDuenio", "")}
              error={errors.nombreDuenio}
            />
            <CustomInput
              placeholder={"Celular del dueño"}
              onChangeText={(value) =>
                handleChangeTextDomicilio(value, "celularDuenio")
              }
              value={formDomicilio.celularDuenio || ""}
              onFocus={() => handleError("celularDuenio", "")}
              error={errors.celularDuenio}
              keyboardType="numeric"
            />
            <Text style={styles.subsubtitle}>Cerramiento: </Text>
            <BouncyCheckbox
              style={{ marginTop: 10 }}
              size={25}
              fillColor={COLORS.primary}
              text="¿El lugar donde pasará el animal tiene cerramiento?"
              onPress={(value) =>
                handleChangeTextDomicilio(value, "tieneCerramiento")
              }
            />
            <CustomInput
              placeholder={"Material del cerramiento"}
              onChangeText={(value) =>
                handleChangeTextDomicilio(value, "materialCerramiento")
              }
              value={formDomicilio.materialCerramiento || ""}
              onFocus={() => handleError("materialCerramiento", "")}
              error={errors.materialCerramiento}
            />
            <CustomInput
              placeholder={"Área del cerramiento"}
              onChangeText={(value) =>
                handleChangeTextDomicilio(value, "areaCerramiento")
              }
              value={formDomicilio.areaCerramiento || ""}
              onFocus={() => handleError("areaCerramiento", "")}
              error={errors.areaCerramiento}
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={styles.subcontainer}>
          <Text style={styles.subtitle}>
            Sección 4: Relación con los animales
          </Text>
          <View style={styles.inputContainer}>
            <Text style={styles.subsubtitle}>
              Mala experiencia con los animales:
            </Text>
            <CustomDropdown
              data={dataMalaExperienciaAnimales}
              value={malaExperienciaAnimales || ""}
              onChange={(item) =>
                handleChangeTextRA(
                  item.value,
                  "malaExperienciaAnimales",
                  setMalaExperienciaAnimales(item.value)
                )
              }
              labelField="label"
              valueField="value"
              placeholder={"¿Ha tenido alguna mala experiencia con los animales?"}
              search={false}
              error={errors.malaExperienciaAnimales}
            />
            <Text style={styles.subsubtitle}>
              Cuéntenos sobre su útima mascota:
            </Text>
            <CustomDropdown
              data={dataTipoMascotas}
              value={ultimaMascota || ""}
              onChange={(item) =>
                handleChangeTextRA(
                  item.value,
                  "tipoMascota",
                  setUltimaMascota(item.value)
                )
              }
              labelField="label"
              valueField="value"
              placeholder={"Tipo de Mascota"}
              search={false}
              error={errors.ultimaMascota}
            />
            <CustomInput
              placeholder={"¿Otro, cuál?"}
              onChangeText={(value) =>
                handleChangeTextRA(value, "otraMascota")
              }
              value={formRelacionAnimales.otraMascota || ""}
              onFocus={() => handleError("otraMascota", "")}
              error={errors.otraMascota}
            />
            <Text style={styles.subsubtitle}>Datos última mascota: </Text>
            <CustomDropdown
              data={dataSexoMascota}
              value={sexoUltimaMascota || ""}
              onChange={(item) =>
                handleChangeTextRA(
                  item.value,
                  "sexoUltimaMascota",
                  setSexoUltimaMascota(item.value)
                )
              }
              labelField="label"
              valueField="value"
              placeholder={"Sexo de la mascota"}
              search={false}
              error={errors.sexoUtlimaMascota}
            />
            <CustomDropdown
              data={dataEsterilizado}
              value={esterilizadoUltimaMascota || ""}
              onChange={(item) =>
                handleChangeTextRA(
                  item.value,
                  "esterilizadoUltimaMascota",
                  setEsterilizadoUltimaMascota(item.value)
                )
              }
              labelField="label"
              valueField="value"
              placeholder={"¿Estaba esterilizado?"}
              search={false}
              error={errors.esterilizadoUltimaMascota}
            />
            <CustomInput
              placeholder={"¿En dónde está ahora? Si falleció, lo perdió o está en otro lugar, indique la causa."}
              onChangeText={(value) =>
                handleChangeTextRA(value, "situacionUltimaMascota")
              }
              value={formRelacionAnimales.situacionUltimaMascota || ""}
              onFocus={() => handleError("situacionUltimaMascota", "")}
              error={errors.situacionUltimaMascota}
              multiline={true}
            />
          </View>
        </View>
        <CustomButton title="Guardar" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginLeft: 10,
    marginRight: 10,
  },
  titile: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
    alignSelf: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 5,
    alignSelf: "flex-start",
  },
  subsubtitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 5,
    alignSelf: "flex-start",
  },
  subcontainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "start",
    marginBottom: 10,
  },
  inputContainer: {
    marginLeft: 10,
    width: "93%",
    marginBottom: 5,
  },
});

export default formDatosPersonalesForm;
