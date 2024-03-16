import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MenuIcon } from "../../assets/Menu.icon";
import { ArrowDownIcon } from "../../assets/ArrowDown.icon";
import { AddIcon } from "../../assets/Add.icon";
import { useState } from "react";
import { MonthCalendar } from "../MonthCalendar.component";
import { getMonthName } from "../../service/utils";

export const CalendarTop = () => {
  const styles = getStyles();

  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [currentMonth, setCurrentMonth] = useState<string>(
    getMonthName(new Date())
  );

  const rotationValue = useState(new Animated.Value(0))[0];

  const toggleCalendar = () => {
    if (showCalendar) {
      setCurrentMonth(getMonthName(new Date()));
    }

    setShowCalendar(!showCalendar);
    Animated.timing(rotationValue, {
      toValue: showCalendar ? 0 : 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const interpolatedRotateAnimation = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <View style={styles.left}>
          <TouchableOpacity>
            <MenuIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.monthSelector}
            onPress={toggleCalendar}
          >
            <Text>{currentMonth}</Text>
            <Animated.View
              style={{ transform: [{ rotate: interpolatedRotateAnimation }] }}
            >
              <ArrowDownIcon />
            </Animated.View>
          </TouchableOpacity>
        </View>

        <View style={styles.right}>
          <TouchableOpacity style={styles.addEvent}>
            <Text>Añadir evento</Text>
            <AddIcon />
          </TouchableOpacity>
        </View>
      </View>

      {showCalendar && (
        <View style={styles.month}>
          <MonthCalendar setCurrentMonthString={setCurrentMonth} />
        </View>
      )}
    </View>
  );
};

const getStyles = () => {
  const { height, width } = Dimensions.get("screen");

  return StyleSheet.create({
    wrapper: {
      width: "100%",
      borderBottomWidth: 1,
      borderColor: "#EFECEC",
      minHeight: 80,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      paddingTop: 15,
      alignItems: "center",
    },
    left: {
      flexDirection: "row",
      alignItems: "center",
      gap: 20,
    },
    right: {
      flexDirection: "row",
      alignItems: "center",
    },
    monthSelector: {
      flexDirection: "row",
      alignItems: "center",
      gap: 2,
    },
    addEvent: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    month: {
      width: "100%",
      height: 360,
      overflow: "hidden",
    },
  });
};
