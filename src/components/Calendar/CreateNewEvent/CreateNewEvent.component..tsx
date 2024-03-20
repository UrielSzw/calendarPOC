import { useState } from "react";
import {
  Dimensions,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { StyledTextInput } from "../../UI/StyledComponents/StyledTextInput.component";
import { SelectDateButton } from "./SelectDateButton.component";
import { ArrowNextIcon } from "../../../assets/ArrowNext.icon";
import { ArrowBackIcon } from "../../../assets/ArrowBack.icon";
import { CalendarCategoryPicker } from "./CalendarCategoryPicker.component";
import { CalendarCategory } from "../../../types/calendar";
import { CalendarDatePicker } from "./CalendarDatePicker.component";
import { CalendarTimePicker } from "./CalendarTimePicker.component";
import { CalendarRepeat } from "./CalendarRepeat.component";

type Props = {
  todayDate: Date;
  setIsCreateView: (value: boolean) => void;
};

const CATEGORIES = [
  {
    name: "Personal",
    color: "red",
  },
  {
    name: "Familia",
    color: "blue",
  },
  {
    name: "Trabajo",
    color: "orange",
  },
  {
    name: "Amigos",
    color: "green",
  },
  {
    name: "Juegos",
    color: "lightblue",
  },
  {
    name: "Viajes",
    color: "pink",
  },
];

export const CreateNewEvent: React.FC<Props> = ({
  todayDate,
  setIsCreateView,
}) => {
  const styles = getStyles();

  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [notesOnFocus, setNotesOnFocus] = useState(false);
  const [category, setCategory] = useState<CalendarCategory>(CATEGORIES[0]);
  const [isAllDay, setIsAllDay] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [dateButtons, setDateButton] = useState({
    0: true,
    1: false,
    2: false,
    3: false,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateSelected, setDateSelected] = useState(new Date());
  const [showRepeat, setShowRepeat] = useState(false);

  const toggleSwitch = () => {
    setIsAllDay((prev) => !prev);
  };

  const datePlusOne = new Date(todayDate);
  const datePlusTwo = new Date(todayDate);

  datePlusOne.setDate(datePlusOne.getDate() + 1);
  datePlusTwo.setDate(datePlusTwo.getDate() + 2);

  const checkDateSelected = () => {
    if (dateSelected.toDateString() === new Date(todayDate).toDateString()) {
      return true;
    }

    if (dateSelected.toDateString() === datePlusOne.toDateString()) {
      return true;
    }

    if (dateSelected.toDateString() === datePlusTwo.toDateString()) {
      return true;
    }

    return false;
  };

  const [dateTimeFrom, setDateTimeFrom] = useState(new Date());
  const [dateTimeTo, setDateTimeTo] = useState(new Date());
  const [timeFrom, setTimeFrom] = useState(["12", "00"]);
  const [timeTo, setTimeTo] = useState(["14", "00"]);
  const [showTimePickerFrom, setShowTimePickerFrom] = useState(false);
  const [showTimePickerTo, setShowTimePickerTo] = useState(false);

  const onChangeFrom = (_event: any, selectedDate: Date) => {
    const currentDate = selectedDate || dateTimeFrom;
    setShowTimePickerFrom(Platform.OS === "ios");
    setDateTimeFrom(currentDate);
    setTimeFrom([
      currentDate.getHours().toString(),
      currentDate.getMinutes().toString(),
    ]);
  };

  const onChangeTo = (_event: any, selectedDate: Date) => {
    const currentDate = selectedDate || dateTimeTo;
    setShowTimePickerTo(Platform.OS === "ios");
    setDateTimeTo(currentDate);
    setTimeTo([
      currentDate.getHours().toString(),
      currentDate.getMinutes().toString(),
    ]);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.wrapper}>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 20,
              marginBottom: 10,
            }}
          >
            <View>
              <TouchableOpacity
                style={styles.backIconButton}
                onPress={() => setIsCreateView(false)}
              >
                <ArrowBackIcon />
                <Text style={{ color: "#BCC1CD" }}>Cancelar</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Crear Evento</Text>
              </TouchableOpacity>
            </View>
          </View>

          <StyledTextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Añadir evento"
            focusOnRender
          />
        </View>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.scrollBox} onStartShouldSetResponder={() => true}>
            <View style={styles.selectDate}>
              <Text style={styles.selectDateTitle}>Seleccionar fecha</Text>
              <View style={styles.datesBox}>
                <SelectDateButton
                  date={todayDate}
                  selected={dateButtons[0]}
                  onPress={() => {
                    setDateSelected(todayDate);
                    setDateButton({
                      0: true,
                      1: false,
                      2: false,
                      3: false,
                    });
                  }}
                />
                <SelectDateButton
                  date={datePlusOne}
                  selected={dateButtons[1]}
                  onPress={() => {
                    setDateSelected(datePlusOne);
                    setDateButton({
                      0: false,
                      1: true,
                      2: false,
                      3: false,
                    });
                  }}
                />
                <SelectDateButton
                  date={datePlusTwo}
                  selected={dateButtons[2]}
                  onPress={() => {
                    setDateSelected(datePlusTwo);
                    setDateButton({
                      0: false,
                      1: false,
                      2: true,
                      3: false,
                    });
                  }}
                />
                {checkDateSelected() ? (
                  <SelectDateButton
                    text1="Otra"
                    text2="Fecha"
                    selected={dateButtons[3]}
                    onPress={() => {
                      setShowDatePicker(true);
                      setDateButton({
                        0: false,
                        1: false,
                        2: false,
                        3: true,
                      });
                    }}
                  />
                ) : (
                  <SelectDateButton
                    date={dateSelected}
                    selected={dateButtons[3]}
                    onPress={() => {
                      setShowDatePicker(true);
                      setDateButton({
                        0: false,
                        1: false,
                        2: false,
                        3: true,
                      });
                    }}
                  />
                )}
              </View>
            </View>
            <View style={styles.isAllDay}>
              <Text style={styles.isAllDayTitle}>Dura todo el dia</Text>
              <Switch
                trackColor={{ false: "#EFECEC", true: "#FFAA8D" }}
                thumbColor={isAllDay ? "#FF7648" : "#f4f3f4"}
                ios_backgroundColor="#EFECEC"
                onValueChange={toggleSwitch}
                value={isAllDay}
              />
            </View>
            <View
              style={[styles.selectTime, { height: isAllDay ? 0 : "auto" }]}
            >
              <View style={styles.timeTitleBox}>
                <Text style={styles.timeTitle}>Seleccionar hora</Text>
              </View>

              <View style={styles.timeButtonBox}>
                <View style={styles.timeButton}>
                  <TouchableOpacity
                    style={styles.timeButtonTouch}
                    onPress={() => setShowTimePickerFrom(true)}
                  >
                    <Text style={styles.timeButtonTopText}>Desde</Text>
                    <Text
                      style={styles.timeButtonHour}
                    >{`${timeFrom[0]}:${timeFrom[1]}`}</Text>
                  </TouchableOpacity>
                </View>
                <ArrowNextIcon />
                <View style={styles.timeButton}>
                  <TouchableOpacity
                    style={styles.timeButtonTouch}
                    onPress={() => setShowTimePickerTo(true)}
                  >
                    <Text style={styles.timeButtonTopText}>Hasta</Text>
                    <Text
                      style={styles.timeButtonHour}
                    >{`${timeTo[0]}:${timeTo[1]}`}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={{ paddingHorizontal: 20 }}>
              <TouchableOpacity onPress={() => setShowRepeat(true)}>
                <Text style={styles.timeRepeat}>Se repite</Text>
              </TouchableOpacity>

              <Text>Todas las semanas. Los dias lun, mar, jue y sab</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                }}
              >
                Seleccionar calendar
              </Text>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
                onPress={() => setShowPicker(true)}
              >
                <View
                  style={{
                    width: 15,
                    height: 15,
                    backgroundColor: category.color,
                    borderRadius: 2,
                  }}
                />
                <Text
                  style={{
                    fontSize: 18,
                  }}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <Text style={[styles.isAllDayTitle, { paddingHorizontal: 20 }]}>
                Agregar nota
              </Text>
              <StyledTextInput
                value={notes}
                onChangeText={setNotes}
                multiline
                placeholder="Nota..."
                numberOfLines={5}
                onFocus={() => setNotesOnFocus(true)}
                onBlur={() => setNotesOnFocus(false)}
                style={{
                  borderWidth: 1,
                  borderColor: "#EFECEC",
                  borderRadius: 12,
                  width: "100%",
                  fontSize: 16,
                  height: 110,
                  padding: 10,
                  paddingTop: 15,
                  marginBottom: notesOnFocus ? 300 : 0,
                }}
              />
            </View>
          </View>
        </ScrollView>
        <CalendarCategoryPicker
          value={category}
          setValue={setCategory}
          options={CATEGORIES}
          showPicker={showPicker}
          setShowPicker={setShowPicker}
        />
        <CalendarDatePicker
          selectedDate={dateSelected}
          setSelectedDate={setDateSelected}
          setShowDatePicker={setShowDatePicker}
          showDatePicker={showDatePicker}
          setDateButton={setDateButton}
        />

        <CalendarTimePicker
          id="timePickerFrom"
          date={dateTimeFrom}
          setShow={setShowTimePickerFrom}
          onChange={onChangeFrom}
          show={showTimePickerFrom}
        />

        <CalendarTimePicker
          id="timePickerTo"
          date={dateTimeTo}
          setShow={setShowTimePickerTo}
          onChange={onChangeTo}
          show={showTimePickerTo}
        />

        <CalendarRepeat
          dateSelected={dateSelected}
          show={showRepeat}
          setShow={setShowRepeat}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const getStyles = () => {
  const { height, width } = Dimensions.get("screen");

  return StyleSheet.create({
    wrapper: {
      width: width,
      height: height,
      backgroundColor: "white",
      paddingTop: 50,
      gap: 30,
    },
    scroll: {
      flexGrow: 1,
      paddingBottom: 60,
    },
    scrollBox: {
      gap: 40,
    },
    backIconButton: {
      flexDirection: "row",
      alignItems: "center",
    },
    selectDate: {
      width: width,
      paddingHorizontal: 20,
    },
    selectDateTitle: {
      fontSize: 18,
      paddingBottom: 10,
    },
    datesBox: {
      maxWidth: width,
      height: 140,
      flexDirection: "row",
      gap: 5,
      justifyContent: "center",
    },
    isAllDay: {
      width: width,
      paddingHorizontal: 20,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    isAllDayTitle: {
      fontSize: 18,
    },
    selectTime: {
      width: width,
      paddingHorizontal: 20,
      overflow: "hidden",
    },
    timeTitleBox: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    timeTitle: {
      fontSize: 18,
    },
    timeRepeat: {
      fontSize: 18,
      color: "#79ACFF",
    },
    timeButtonBox: {
      flexDirection: "row",
      height: 140,
      width: "100%",
      alignItems: "center",
      marginTop: 10,
    },
    timeButton: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    timeButtonTouch: {
      padding: 30,
    },
    timeButtonTopText: {
      color: "#94A3B8",
    },
    timeButtonHour: {
      fontSize: 24,
      fontWeight: "700",
    },
    button: {
      padding: 10,
      backgroundColor: "#FF7648",
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      color: "white",
      fontSize: 16,
    },
  });
};
