import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { CalendarCategory } from "../../../types/calendar";
import { useState } from "react";
import { StyledTextInput } from "../../UI/StyledComponents/StyledTextInput.component";
import { DAYS, ORDER_DAYS } from "../../../Global/global";
import { ArrowBackIcon } from "../../../assets/ArrowBack.icon";

type Props = {
  value?: string;
  setValue?: (option: string) => void;
  show: boolean;
  setShow: (value: boolean) => void;
  dateSelected: Date;
};

const OPCIONES = [
  "No se repite",
  "Todos los dias",
  "Todas las semanas",
  "Todos los meses",
  "Todos los años",
  "Personalizar...",
];

const OPCIONES_PERSONALIZADAS = ["Dia", "Semana", "Mes", "Año"];

const PAGES_OPTIONS = ["Home", "Personalized", "Days", "End"];

export const CalendarRepeat: React.FC<Props> = ({
  value,
  setValue,
  show,
  setShow,
  dateSelected,
}) => {
  const { height, width } = Dimensions.get("screen");

  const styles = getStyles();
  const [repeatTime, seRepeatTime] = useState(OPCIONES_PERSONALIZADAS[0]);
  const [repeatText, seRepeatText] = useState(OPCIONES[0]);
  const [repeatAmount, setRepeatAmount] = useState("1");
  const [showPages, setShowPages] = useState(PAGES_OPTIONS[0]);
  const [choosenDays, setChoosenDays] = useState<string[]>([
    DAYS[dateSelected.getDay()],
  ]);
  const [monthOption, setMonthOption] = useState(true);

  const handleRepeatTextChange = (text: string) => {
    seRepeatText(text);

    if (text !== OPCIONES[5]) {
      setShow(false);
    } else {
      setShowPages(PAGES_OPTIONS[1]);
    }
  };

  const handleRepeatTimeChange = (text: string) => {
    seRepeatTime(text);
  };

  const handleChoosenDays = (day: string) => {
    const index = choosenDays.indexOf(day);

    if (index !== -1) {
      if (choosenDays.length === 1) return;

      const updatedDays = [...choosenDays];
      updatedDays.splice(index, 1);
      setChoosenDays(updatedDays);
    } else {
      setChoosenDays((prevDays) => [...prevDays, day]);
    }
  };

  const formatSelectedDaysText = (selectedDays: string[]): string => {
    const weekDays = ORDER_DAYS;

    const selectedDaysIndices = selectedDays
      .map((day) => weekDays.indexOf(day))
      .sort((a, b) => a - b);
    const sortedSelectedDays = selectedDaysIndices.map(
      (index) => weekDays[index]
    );

    switch (sortedSelectedDays.length) {
      case 0:
        return "";
      case 1:
        return `El ${sortedSelectedDays[0].toLowerCase()}`;
      case 2:
        return `El ${sortedSelectedDays[0].toLowerCase()} y ${sortedSelectedDays[1].toLowerCase()}`;
      default:
        const restOfDays = sortedSelectedDays.slice(0, -1);
        const lastDay = sortedSelectedDays[sortedSelectedDays.length - 1];
        return `El ${restOfDays
          .map((day) => day.toLowerCase())
          .join(", ")}, y ${lastDay.toLowerCase()}`;
    }
  };

  const getPositionOfDayInMonth = (date: Date) => {
    const positions = ["primer", "segundo", "tercer", "cuarto", "quinto"];

    const dayOfWeek = date.getDay();
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const dayInstances = [];

    // Obtener todas las instancias del día de la semana en el mes
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      if (currentDate.getDay() === dayOfWeek) {
        dayInstances.push(currentDate);
      }
    }

    // Determinar la posición de la fecha dada entre las instancias del día de la semana
    const position =
      dayInstances.findIndex(
        (instance) => instance.getDate() === date.getDate()
      ) + 1;

    return positions[position - 1];
  };

  const handleLeaveModal = () => {
    setShow(false);
    setShowPages(PAGES_OPTIONS[0]);
  };

  return (
    <Modal visible={show} transparent>
      <TouchableOpacity
        style={[
          styles.background,
          {
            paddingHorizontal: showPages === PAGES_OPTIONS[1] ? 20 : 50,
          },
        ]}
        onPress={handleLeaveModal}
      >
        <TouchableWithoutFeedback>
          <View
            style={[
              styles.wrapper,
              {
                height:
                  showPages !== PAGES_OPTIONS[0] ? height * 0.6 : height * 0.3,
              },
            ]}
          >
            {showPages === PAGES_OPTIONS[1] && (
              <View style={{ padding: 15 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={handleLeaveModal}
                  >
                    <ArrowBackIcon />
                    <Text style={{ color: "#BCC1CD" }}>Atras</Text>
                  </TouchableOpacity>
                  <Text>Se repite</Text>
                  <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <Text
                      style={{
                        color: "#FF7648",
                        fontWeight: "700",
                        paddingLeft: 4,
                        paddingRight: 6,
                      }}
                    >
                      Guardar
                    </Text>
                  </TouchableOpacity>
                </View>
                <StyledTextInput
                  value={repeatAmount}
                  onChangeText={setRepeatAmount}
                  keyboardType="numeric"
                  inputMode="numeric"
                />
              </View>
            )}

            {showPages === PAGES_OPTIONS[2] && (
              <View style={{ padding: 15 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={() => setShowPages(PAGES_OPTIONS[1])}
                  >
                    <ArrowBackIcon />
                    <Text style={{ color: "#BCC1CD" }}>Atras</Text>
                  </TouchableOpacity>

                  <Text>Seleccionar dias</Text>
                </View>
              </View>
            )}
            <ScrollView style={styles.scroll}>
              {showPages === PAGES_OPTIONS[0] && (
                <View>
                  {OPCIONES.map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.option,
                        {
                          backgroundColor:
                            repeatText === option
                              ? "rgba(239,236,236,0.3)"
                              : "transparent",
                        },
                      ]}
                      onPress={() => handleRepeatTextChange(option)}
                    >
                      <Text>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {showPages === PAGES_OPTIONS[1] && (
                <View>
                  <View style={styles.daytimeBox}>
                    {OPCIONES_PERSONALIZADAS.map((option) => (
                      <TouchableOpacity
                        key={option}
                        style={[
                          styles.daytime,
                          {
                            backgroundColor:
                              option === repeatTime
                                ? "rgba(239,236,236,0.3)"
                                : "transparent",
                          },
                        ]}
                        onPress={() => handleRepeatTimeChange(option)}
                      >
                        <Text style={styles.daytimeText}>{`${option}${
                          Number(repeatAmount) > 1
                            ? option === OPCIONES_PERSONALIZADAS[2]
                              ? "es"
                              : "s"
                            : ""
                        }`}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <View>
                    {repeatTime === OPCIONES_PERSONALIZADAS[1] && (
                      <TouchableOpacity
                        style={styles.option}
                        onPress={() => setShowPages(PAGES_OPTIONS[2])}
                      >
                        <Text>{formatSelectedDaysText(choosenDays)}</Text>
                      </TouchableOpacity>
                    )}
                    {repeatTime === OPCIONES_PERSONALIZADAS[2] && (
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.option,
                            {
                              backgroundColor: monthOption
                                ? "rgba(239,236,236,0.3)"
                                : "transparent",
                            },
                          ]}
                          onPress={() => setMonthOption(true)}
                        >
                          <Text>El mismo dia de cada mes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.option,
                            {
                              backgroundColor: !monthOption
                                ? "rgba(239,236,236,0.3)"
                                : "transparent",
                            },
                          ]}
                          onPress={() => setMonthOption(false)}
                        >
                          <Text>
                            {`El ${getPositionOfDayInMonth(
                              dateSelected
                            )} ${DAYS[
                              dateSelected.getDay()
                            ].toLocaleLowerCase()} de cada mes`}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>

                  <TouchableOpacity
                    style={[
                      styles.option,
                      // {
                      //   backgroundColor:
                      //     repeatText === option
                      //       ? "rgba(239,236,236,0.3)"
                      //       : "transparent",
                      // },
                    ]}
                  >
                    <Text>No termina</Text>
                  </TouchableOpacity>
                </View>
              )}

              {showPages === PAGES_OPTIONS[2] && (
                <View>
                  {ORDER_DAYS.map((day) => (
                    <TouchableOpacity
                      key={day}
                      style={[
                        styles.option,
                        {
                          backgroundColor: choosenDays.includes(day)
                            ? "rgba(239,236,236,0.3)"
                            : "transparent",
                        },
                      ]}
                      onPress={() => handleChoosenDays(day)}
                    >
                      <Text>{day}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

const getStyles = () => {
  const { height, width } = Dimensions.get("screen");

  return StyleSheet.create({
    background: {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    wrapper: {
      width: "100%",
      backgroundColor: "white",
      borderRadius: 12,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 12,
      elevation: 5,
    },
    scroll: {
      flexGrow: 1,
    },
    option: {
      width: "100%",
      flexDirection: "row",
      padding: 15,
      paddingHorizontal: 30,
      gap: 10,
      borderBottomWidth: 1,
      borderColor: "#EFECEC",
      alignItems: "center",
      justifyContent: "space-between",
    },
    daytimeBox: {
      flexDirection: "row",
      flexWrap: "wrap",
      // padding: 5,
      borderBottomWidth: 2,
    },
    daytime: {
      width: "100%",
      flexDirection: "row",
      padding: 15,
      paddingHorizontal: 30,
      gap: 10,
      borderBottomWidth: 1,
      borderColor: "#EFECEC",
      alignItems: "center",
      justifyContent: "space-between",
    },
    daytimeText: {
      //   fontSize: 18,
    },
  });
};
