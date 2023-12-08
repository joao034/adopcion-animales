import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import CustomInput from "../CustomInput";
import CustomDropdown from "../CustomDropdown";
import CustomButton from "../CustomButton";
import COLORS from "../../consts/colors";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const formDatosPersonalesForm = ({
  onSubmit,
  dataSolicitudAdopcion,
  editable,
  ...props
}) => {
  const initialStateFormDatosPersonales = {
    nombreCompleto: "",
    cedula: "",
    correo: "",
    direccion: "",
    fechaNacimiento: "",
    ocupacion: "",
    instruccion: "",
    celular: "",
    telefonoCasa: "",
    referenciaNombreCompleto: "",
    referenciaCelular: "",
    referenciaParentesco: "",
  };

  const initialStateFormSituacionFamiliar = {
    nombreFamiliar: "",
    parentescoFamiliar: "",
    edadFamiliar: "",
    esperaBebe: false,
  };

  const initialStateFormDomicilio = {
    tipoInmueble: "",
    areaInmueble: "",
    tipoPropiedad: "",
    nombreDuenio: "",
    celularDuenio: "",
    tieneCerramiento: false,
    materialCerramiento: "",
    areaCerramiento: "",
  };

  const initialStateFormRelacionAnimales = {
    malaExperienciaAnimales: "",
    tipoMascota: "",
    otraMascota: "",
    sexoUltimaMascota: "",
    esterilizadoUltimaMascota: "",
    situacionUltimaMascota: "",
  };

  const [solicitud, setSolicitud] = useState({});

  const [formDatosPersonales, setFormDatosPersonales] = useState({});
  const [formSituacionFamiliar, setFormSituacionFamiliar] = useState({});
  const [formDomicilio, setFormDomicilio] = useState({});
  const [formRelacionAnimales, setFormRelacionAnimales] = useState({});
  const [errors, setErrors] = useState({});
  //estados dropdowns
  const [instruccion, setInstruccion] = useState("");
  const [tipoInmueble, setTipoInmueble] = useState("");
  const [tipoPropiedad, setTipoPropiedad] = useState("");
  const [malaExperienciaAnimales, setMalaExperienciaAnimales] = useState("");
  const [tipoMascota, setTipoMascota] = useState("");
  const [sexoUltimaMascota, setSexoUltimaMascota] = useState("");
  const [esterilizadoUltimaMascota, setEsterilizadoUltimaMascota] =
    useState("");

  //setea los datos de la solicitud en los states
  useEffect(() => {
    if (dataSolicitudAdopcion) {
      setSolicitud(dataSolicitudAdopcion);
      setFormDatosPersonales(dataSolicitudAdopcion.formDatosPersonales);
      setFormSituacionFamiliar(dataSolicitudAdopcion.formSituacionFamiliar);
      setFormDomicilio(dataSolicitudAdopcion.formDomicilio);
      setFormRelacionAnimales(dataSolicitudAdopcion.formRelacionAnimales);
    }
  }, [dataSolicitudAdopcion]);

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
  ];

  const dataTipoMascotas = [
    { label: "Canino", value: "Canino" },
    { label: "Felino", value: "Felino" },
    { label: "No he tenido", value: "No he tenido" },
    { label: "Otra", value: "Otra" },
  ];

  const dataSexoMascota = [
    { label: "Macho", value: "Macho" },
    { label: "Hembra", value: "Hembra" },
  ];

  const dataEsterilizado = [
    { label: "Si", value: "Si" },
    { label: "No", value: "No" },
  ];

  const validateDatosPersonales = () => {
    let isValid = true;
    if (formDatosPersonales.nombreCompleto === "") {
      handleError("nombreCompleto", "Debe ingresar su nombre completo");
      console.log("error Form Datos Personales");
      isValid = false;
    }

    if (formDatosPersonales.cedula === "") {
      handleError("cedula", "Ingrese la cédula");
      isValid = false;
    } else if (
      formDatosPersonales.cedula.length < 10 ||
      formDatosPersonales.cedula.length > 10
    ) {
      handleError("cedula", "La cédula debe tener 10 dígitos");
      isValid = false;
    }
    if (formDatosPersonales.correo === "") {
      handleError("correo", "Ingrese el correo electrónico");
      isValid = false;
    } else if (!formDatosPersonales.correo.match(/\S+@\S+\.\S+/)) {
      handleError("correo", "Ingrese un correo electrónico válido");
      isValid = false;
    }

    if (formDatosPersonales.direccion === "") {
      handleError("direccion", "Debe ingresar su dirección");
      isValid = false;
    }
    if (formDatosPersonales.fechaNacimiento === "") {
      handleError("fechaNacimiento", "Debe ingresar su fecha de nacimiento");
      isValid = false;
    }
    if (formDatosPersonales.ocupacion === "") {
      handleError("ocupacion", "Debe ingresar su ocupación");
      isValid = false;
    }
    if (formDatosPersonales.instruccion === "") {
      handleError("instruccion", "Debe ingresar su nivel de instrucción");
      isValid = false;
    }
    if (formDatosPersonales.celular === "") {
      handleError("celular", "Debe ingresar su número de celular");
      isValid = false;
    }
    if (
      formDatosPersonales.celular.length < 10 ||
      formDatosPersonales.celular.length > 10
    ) {
      handleError("celular", "El número de celular debe tener 10 dígitos");
      isValid = false;
    }

    if (formDatosPersonales.referenciaNombreCompleto === "") {
      handleError(
        "referenciaNombreCompleto",
        "Debe ingresar el nombre de su referencia personal"
      );
      isValid = false;
    }
    if (formDatosPersonales.referenciaCelular === "") {
      handleError(
        "referenciaCelular",
        "Debe ingresar el número de celular de su referencia personal"
      );
      isValid = false;
    }
    if (
      formDatosPersonales.referenciaCelular.length < 10 ||
      formDatosPersonales.referenciaCelular.length > 10
    ) {
      handleError(
        "referenciaCelular",
        "El número de celular de su referencia personal debe tener 10 dígitos"
      );
      isValid = false;
    }
    if (formDatosPersonales.referenciaParentesco === "") {
      handleError(
        "referenciaParentesco",
        "Debe ingresar el parentesco de su referencia personal"
      );
      isValid = false;
    }
    return isValid;
  };

  const validateSituacionFamiliar = () => {
    let isValid = true;
    if (formSituacionFamiliar.nombreFamiliar === "") {
      console.log("error Form Situacion familiar");
      handleError(
        "nombreFamiliar",
        "Debe ingresar el nombre de la persona que vive con usted"
      );
      isValid = false;
    }
    if (formSituacionFamiliar.parentescoFamiliar === "") {
      handleError(
        "parentescoFamiliar",
        "Debe ingresar el parentesco de la persona que vive con usted"
      );
      isValid = false;
    }
    if (formSituacionFamiliar.edadFamiliar === "") {
      handleError(
        "edadFamiliar",
        "Debe ingresar la edad de la persona que vive con usted"
      );
      isValid = false;
    }
    return isValid;
  };

  const validateDomicilio = () => {
    let isValid = true;
    if (formDomicilio.tipoInmueble === "") {
      handleError("tipoInmueble", "Debe ingresar el tipo de inmueble");
      isValid = false;
    }
    if (formDomicilio.areaInmueble === "") {
      handleError("areaInmueble", "Debe ingresar el área del inmueble");
      isValid = false;
    }
    if (formDomicilio.tipoPropiedad === "") {
      handleError("tipoPropiedad", "Debe ingresar el tipo de propiedad");
      isValid = false;
    }

    if (formDomicilio.tipoPropiedad === "Arrendada") {
      if (formDomicilio.nombreDuenio === "") {
        handleError("nombreDuenio", "Debe ingresar el nombre del dueño");
        isValid = false;
      }
      if (formDomicilio.celularDuenio === "") {
        handleError("celularDuenio", "Debe ingresar el celular del dueño");
        isValid = false;
      }
      if (
        formDomicilio.celularDuenio.length < 10 ||
        formDomicilio.celularDuenio.length > 10
      ) {
        handleError(
          "celularDuenio",
          "El celular del dueño debe tener 10 dígitos"
        );
        isValid = false;
      }
    }

    if (formDomicilio.tieneCerramiento === "") {
      handleError(
        "tieneCerramiento",
        "Debe ingresar si el lugar donde pasará el animal tiene cerramiento"
      );
      isValid = false;
    }

    if (formDomicilio.tieneCerramiento) {
      if (formDomicilio.materialCerramiento === "") {
        handleError(
          "materialCerramiento",
          "Debe ingresar el material del cerramiento"
        );
        isValid = false;
      }
      if (formDomicilio.areaCerramiento === "") {
        handleError("areaCerramiento", "Debe ingresar el área del cerramiento");
        isValid = false;
      }
    }

    return isValid;
  };

  const validateRelacionAnimales = () => {
    let isValid = true;
    if (formRelacionAnimales.malaExperienciaAnimales === "") {
      handleError(
        "malaExperienciaAnimales",
        "Debe ingresar si ha tenido alguna mala experiencia con los animales"
      );
      isValid = false;
    }
    if (formRelacionAnimales.tipoMascota === "") {
      handleError("tipoMascota", "Debe ingresar el tipo de mascota que tuvo");
      isValid = false;
    }

    if (
      formRelacionAnimales.tipoMascota != "No he tenido" &&
      formRelacionAnimales.tipoMascota != ""
    ) {
      if (formRelacionAnimales.sexoUltimaMascota === "") {
        handleError("sexoUltimaMascota", "Debe ingresar el sexo de la mascota");
        isValid = false;
      }
      if (formRelacionAnimales.esterilizadoUltimaMascota === "") {
        handleError(
          "esterilizadoUltimaMascota",
          "Debe ingresar si la mascota estaba esterilizada"
        );
        isValid = false;
      }
      if (formRelacionAnimales.situacionUltimaMascota === "") {
        handleError(
          "situacionUltimaMascota",
          "Debe ingresar la situación actual de la mascota"
        );
        isValid = false;
      }
    }
    return isValid;
  };

  //valida los datos de cada formulario para enviarlos a la screen Solicitud de Adopcion
  const validate = () => {
    const validateDP = validateDatosPersonales();
    const validateSF = validateSituacionFamiliar();
    const validateDom = validateDomicilio();
    const validateRA = validateRelacionAnimales();
    if (validateDP && validateRA && validateSF && validateDom) {
      handleSubmit();
    }
  };

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
  const handleDropdownChangeDatosPersonales = (value, name) => {
    setFormDatosPersonales({ ...formDatosPersonales, [name]: value });
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
          {formDatosPersonales ? (
            <View style={styles.inputContainer}>
              <Text style={styles.subsubtitle}>Información Básica:</Text>
              <CustomInput
                label={"Nombre Completo"}
                placeholder={"Nombre Completo"}
                onChangeText={(value) =>
                  handleChangeText(value, "nombreCompleto")
                }
                value={formDatosPersonales.nombreCompleto || ""}
                onFocus={() => handleError("nombreCompleto", "")}
                error={errors.nombreCompleto}
                editable={editable}
              />
              <CustomInput
                label={"Cédula de Identidad"}
                placeholder={"Cédula de Identidad	"}
                onChangeText={(value) => handleChangeText(value, "cedula")}
                value={formDatosPersonales.cedula || ""}
                onFocus={() => handleError("cedula", "")}
                error={errors.cedula}
                keyboardType="numeric"
                editable={editable}
              />
              <CustomInput
                label={"Correo electrónico"}
                placeholder={"Correo electrónico"}
                onChangeText={(value) => handleChangeText(value, "correo")}
                value={formDatosPersonales.correo || ""}
                onFocus={() => handleError("correo", "")}
                error={errors.correo}
                keyboardType="email-address"
                editable={editable}
              />
              <CustomInput
                label={"Dirección"}
                placeholder={"Dirección exacta donde permanecerá el animal"}
                onChangeText={(value) => handleChangeText(value, "direccion")}
                value={formDatosPersonales.direccion || ""}
                onFocus={() => handleError("direccion", "")}
                error={errors.direccion}
                editable={editable}
              />
              <CustomInput
                label={"Fecha de nacimiento"}
                placeholder={"Fecha de nacimiento"}
                onChangeText={(value) =>
                  handleChangeText(value, "fechaNacimiento")
                }
                value={formDatosPersonales.fechaNacimiento || ""}
                onFocus={() => handleError("fechaNacimiento", "")}
                error={errors.fechaNacimiento}
                editable={editable}
              />
              <CustomInput
                label={"Ocupación"}
                placeholder={"Ocupación"}
                onChangeText={(value) => handleChangeText(value, "ocupacion")}
                value={formDatosPersonales.ocupacion || ""}
                onFocus={() => handleError("ocupacion", "")}
                error={errors.ocupacion}
                editable={editable}
              />
              <Text style={styles.subsubtitle}>Instrucción:</Text>
              <CustomDropdown
                label={"Nivel de instrucción"}
                data={dataInstruccion}
                value={formDatosPersonales.instruccion || ""}
                onChange={(item) =>
                  handleDropdownChangeDatosPersonales(
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
                disable={!editable}
              />

              <Text style={styles.subsubtitle}>Teléfonos de Contacto:</Text>
              <CustomInput
                label={"Celular"}
                placeholder={"Celular"}
                onChangeText={(value) => handleChangeText(value, "celular")}
                value={formDatosPersonales.celular || ""}
                onFocus={() => handleError("celular", "")}
                error={errors.celular}
                keyboardType="numeric"
                editable={editable}
              />
              <CustomInput
                label={"Teléfono de casa"}
                placeholder={"Teléfono de casa"}
                onChangeText={(value) =>
                  handleChangeText(value, "telefonoCasa")
                }
                value={formDatosPersonales.telefonoCasa || ""}
                onFocus={() => handleError("telefonoCasa", "")}
                error={errors.telefonoCasa}
                keyboardType="numeric"
                editable={editable}
              />
              <Text style={styles.subsubtitle}>Referencia Personal:</Text>
              <CustomInput
                label={"Nombre Completo"}
                placeholder={"Nombre Completo"}
                onChangeText={(value) =>
                  handleChangeText(value, "referenciaNombreCompleto")
                }
                value={formDatosPersonales.referenciaNombreCompleto || ""}
                onFocus={() => handleError("referenciaNombreCompleto", "")}
                error={errors.referenciaNombreCompleto}
                editable={editable}
              />
              <CustomInput
                label={"Celular"}
                placeholder={"Celular"}
                onChangeText={(value) =>
                  handleChangeText(value, "referenciaCelular")
                }
                value={formDatosPersonales.referenciaCelular || ""}
                onFocus={() => handleError("referenciaCelular", "")}
                error={errors.referenciaCelular}
                keyboardType="numeric"
                editable={editable}
              />
              <CustomInput
                label={"Parentesco"}
                placeholder={"Parentesco"}
                onChangeText={(value) =>
                  handleChangeText(value, "referenciaParentesco")
                }
                value={formDatosPersonales.referenciaParentesco || ""}
                onFocus={() => handleError("referenciaParentesco", "")}
                error={errors.referenciaParentesco}
                editable={editable}
              />
            </View>
          ) : (
            <Text>... Cargando Sección 1</Text>
          )}
        </View>
        <View style={styles.subcontainer}>
          <Text style={styles.subtitle}>Sección 2: Situación Familiar</Text>
          {formSituacionFamiliar ? (
            <View style={styles.inputContainer}>
              <Text style={styles.subsubtitle}>
                Nombre una persona que viva con usted:
              </Text>
              <CustomInput
                label={"Nombre y Apellido"}
                placeholder={"Nombre y Apellido"}
                onChangeText={(value) =>
                  handleChangeTextSF(value, "nombreFamiliar")
                }
                value={formSituacionFamiliar.nombreFamiliar || ""}
                onFocus={() => handleError("nombreFamiliar", "")}
                error={errors.nombreFamiliar}
                editable={editable}
              />
              <CustomInput
                label={"Parentesco"}
                readOnly={true}
                placeholder={"Parentesco"}
                onChangeText={(value) =>
                  handleChangeTextSF(value, "parentescoFamiliar")
                }
                value={formSituacionFamiliar.parentescoFamiliar || ""}
                onFocus={() => handleError("parentescoFamiliar", "")}
                error={errors.parentescoFamiliar}
                editable={editable}
              />
              <CustomInput
                label={"Edad"}
                placeholder={"Edad"}
                onChangeText={(value) =>
                  handleChangeTextSF(value, "edadFamiliar")
                }
                value={formSituacionFamiliar.edadFamiliar || ""}
                onFocus={() => handleError("edadFamiliar", "")}
                error={errors.edadFamiliar}
                keyboardType="numeric"
                editable={editable}
              />
              <BouncyCheckbox
                style={{ marginTop: 10 }}
                size={25}
                fillColor={COLORS.primary}
                text="¿Algún familiar espera un bebé?"
                onPress={(value) => handleChangeTextSF(value, "esperaBebe")}
                isChecked={formSituacionFamiliar.esperaBebe}
                disableBuiltInState={!editable}
              />
            </View>
          ) : (
            <Text>... Cargando Sección 2</Text>
          )}
        </View>
        <View style={styles.subcontainer}>
          <Text style={styles.subtitle}>Sección 3: Dimicilio</Text>
          {formDomicilio ? (
            <View style={styles.inputContainer}>
              <Text style={styles.subsubtitle}>
                Caracteristicas del inmueble:{" "}
              </Text>
              <CustomDropdown
                label={"Tipo de inmueble"}
                data={dataTipoInmueble}
                value={formDomicilio.tipoInmueble || ""}
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
                disable={!editable}
              />

              <CustomInput
                label={"Área en m2"}
                placeholder={"Área en m2"}
                onChangeText={(value) =>
                  handleChangeTextDomicilio(value, "areaInmueble")
                }
                value={formDomicilio.areaInmueble || ""}
                onFocus={() => handleError("areaInmueble", "")}
                error={errors.areaInmueble}
                keyboardType="numeric"
                editable={editable}
              />
              <Text style={styles.subsubtitle}>Propiedad: </Text>
              <CustomDropdown
                label={"Tipo de propiedad"}
                data={dataTipoPropiedad}
                value={formDomicilio.tipoPropiedad || ""}
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
                disable={!editable}
              />
              <Text style={styles.subsubtitle}>En caso de ser arrendado: </Text>
              <CustomInput
                label={"Nombre del dueño"}
                placeholder={"Nombre del dueño"}
                onChangeText={(value) =>
                  handleChangeTextDomicilio(value, "nombreDuenio")
                }
                value={formDomicilio.nombreDuenio || ""}
                onFocus={() => handleError("nombreDuenio", "")}
                error={errors.nombreDuenio}
                editable={editable}
              />
              <CustomInput
                label={"Celular del dueño"}
                placeholder={"Celular del dueño"}
                onChangeText={(value) =>
                  handleChangeTextDomicilio(value, "celularDuenio")
                }
                value={formDomicilio.celularDuenio || ""}
                onFocus={() => handleError("celularDuenio", "")}
                error={errors.celularDuenio}
                keyboardType="numeric"
                editable={editable}
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
                isChecked={formDomicilio.tieneCerramiento}
                disableBuiltInState={!editable}
              />
              <Text style={styles.subsubtitle}>
                En caso de tener cerramiento:{" "}
              </Text>
              <CustomInput
                label={"Material del cerramiento"}
                placeholder={"Material del cerramiento"}
                onChangeText={(value) =>
                  handleChangeTextDomicilio(value, "materialCerramiento")
                }
                value={formDomicilio.materialCerramiento || ""}
                onFocus={() => handleError("materialCerramiento", "")}
                error={errors.materialCerramiento}
                editable={editable}
              />
              <CustomInput
                label={"Área del cerramiento en m2"}
                placeholder={"Área del cerramiento en m2"}
                onChangeText={(value) =>
                  handleChangeTextDomicilio(value, "areaCerramiento")
                }
                value={formDomicilio.areaCerramiento || ""}
                onFocus={() => handleError("areaCerramiento", "")}
                error={errors.areaCerramiento}
                keyboardType="numeric"
                editable={editable}
              />
            </View>
          ) : (
            <Text>... Cargando Sección 3</Text>
          )}
        </View>
        <View style={styles.subcontainer}>
          <Text style={styles.subtitle}>
            Sección 4: Relación con los animales
          </Text>
          {formRelacionAnimales ? (
            <View style={styles.inputContainer}>
              <Text style={styles.subsubtitle}>
                Mala experiencia con los animales:
              </Text>
              <CustomDropdown
                label={"¿Ha tenido alguna mala experiencia con los animales?"}
                data={dataMalaExperienciaAnimales}
                value={formRelacionAnimales.malaExperienciaAnimales || ""}
                onChange={(item) =>
                  handleChangeTextRA(
                    item.value,
                    "malaExperienciaAnimales",
                    setMalaExperienciaAnimales(item.value)
                  )
                }
                labelField="label"
                valueField="value"
                placeholder={
                  "¿Ha tenido alguna mala experiencia con los animales?"
                }
                search={false}
                error={errors.malaExperienciaAnimales}
                disable={!editable}
              />
              <Text style={styles.subsubtitle}>
                Cuéntenos sobre su útima mascota:
              </Text>
              <CustomDropdown
                label={"Tipo de Mascota"}
                data={dataTipoMascotas}
                value={formRelacionAnimales.tipoMascota || ""}
                onChange={(item) =>
                  handleChangeTextRA(
                    item.value,
                    "tipoMascota",
                    setTipoMascota(item.value)
                  )
                }
                labelField="label"
                valueField="value"
                placeholder={"Tipo de Mascota"}
                search={false}
                error={errors.tipoMascota}
                disable={!editable}
              />
              <CustomInput
                label={"En caso de haber tenido otro tipo de mascota"}
                placeholder={"Escriba el tipo de mascota"}
                onChangeText={(value) =>
                  handleChangeTextRA(value, "otraMascota")
                }
                value={formRelacionAnimales.otraMascota || ""}
                onFocus={() => handleError("otraMascota", "")}
                error={errors.otraMascota}
                editable={editable}
              />
              <Text style={styles.subsubtitle}>Datos última mascota: </Text>
              <CustomDropdown
                label={"Sexo de la mascota"}
                data={dataSexoMascota}
                value={formRelacionAnimales.sexoUltimaMascota || ""}
                onChange={(item) =>
                  handleChangeTextRA(
                    item.value,
                    "sexoUltimaMascota",
                    setSexoUltimaMascota(item.value)
                  )
                }
                labelField="label"
                valueField="value"
                placeholder={"Elija el sexo de la mascota"}
                search={false}
                error={errors.sexoUltimaMascota}
                disable={!editable}
              />
              <CustomDropdown
                label={"Esterilizado"}
                data={dataEsterilizado}
                value={formRelacionAnimales.esterilizadoUltimaMascota || ""}
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
                disable={!editable}
              />
              <CustomInput
                label={"Situación actual de la mascota"}
                placeholder={
                  "¿En dónde está ahora? Si falleció, lo perdió o está en otro lugar, indique la causa."
                }
                onChangeText={(value) =>
                  handleChangeTextRA(value, "situacionUltimaMascota")
                }
                value={formRelacionAnimales.situacionUltimaMascota || ""}
                onFocus={() => handleError("situacionUltimaMascota", "")}
                error={errors.situacionUltimaMascota}
                multiline={true}
                editable={editable}
              />
            </View>
          ) : (
            <Text>... Cargando Sección 4</Text>
          )}
        </View>
        {!dataSolicitudAdopcion && (
          <CustomButton title="Guardar" onPress={validate} />
        )}

        <View>{props.children}</View>
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
    marginBottom: 5,
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
