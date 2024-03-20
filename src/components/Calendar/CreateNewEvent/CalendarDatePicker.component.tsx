import React, { useCallback, useMemo, useState } from "react";
import {
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Calendar, CalendarUtils, DateData } from "react-native-calendars";
import { formatDateToYYYYMMDD, getMonthName } from "../../../service/utils";
import { CalendarTodayIcon } from "../../../assets/CalendarToday.component";
import { LocaleConfig } from "react-native-calendars";
import { DAYS, MONTHS } from "../../../Global/global";

const INITIAL_DATE = formatDateToYYYYMMDD(new Date());

LocaleConfig.locales["es"] = {
  monthNames: MONTHS,
  dayNames: DAYS,
  dayNamesShort: ["Dom", "Lun", "Mar", "Mer", "Jue", "Vie", "Sab"],
};
LocaleConfig.defaultLocale = "es";

type Props = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  showDatePicker: boolean;
  setShowDatePicker: (value: boolean) => void;
  setDateButton: (value: any) => void;
};

export const CalendarDatePicker: React.FC<Props> = ({
  selectedDate,
  setSelectedDate,
  showDatePicker,
  setShowDatePicker,
  setDateButton,
}) => {
  const styles = getStyles();
  const [selected, setSelected] = useState(INITIAL_DATE);
  const [selectedValue, setSelectedValue] = useState(new Date());

  const todayDate = new Date();
  const datePlusOne = new Date(todayDate);
  const datePlusTwo = new Date(todayDate);

  datePlusOne.setDate(datePlusOne.getDate() + 1);
  datePlusTwo.setDate(datePlusTwo.getDate() + 2);

  const onDayPress = useCallback((day: DateData) => {
    const targetDate = new Date(day.dateString);
    targetDate.setDate(targetDate.getDate() + 1);
    setSelectedDate(targetDate);
    setShowDatePicker(false);
  }, []);

  const onBackgroundPress = () => {
    setDateButton({
      0: true,
      1: false,
      2: false,
      3: false,
    });
    setShowDatePicker(false);
  };

  const marked = useMemo(() => {
    return {
      [selected]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: "rgba(255,118,72,0.3)",
        selectedTextColor: "#FF7648",
      },
      [CalendarUtils.getCalendarDateString(datePlusOne)]: {
        disabled: true,
      },
      [CalendarUtils.getCalendarDateString(datePlusTwo)]: {
        disabled: true,
      },
    };
  }, [selected]);

  const getNewSelectedDate = useCallback(
    (date: any, shouldAdd: any) => {
      const newMonth = new Date(date).getMonth();
      const month = shouldAdd ? newMonth + 1 : newMonth - 1;
      const newDate = new Date(selectedValue.setMonth(month));
      const newSelected = new Date(newDate.setDate(1));
      return newSelected;
    },
    [selectedValue]
  );
  const onPressArrowLeft = useCallback(
    (subtract: any, month: any) => {
      const newDate = getNewSelectedDate(month, false);
      setSelectedValue(newDate);
      subtract();
    },
    [getNewSelectedDate]
  );

  const onPressArrowRight = useCallback(
    (add: any, month: any) => {
      const newDate = getNewSelectedDate(month, true);
      setSelectedValue(newDate);
      add();
    },
    [getNewSelectedDate]
  );

  return (
    <Modal visible={showDatePicker} transparent>
      <TouchableOpacity style={styles.background} onPress={onBackgroundPress}>
        <SafeAreaView style={styles.wrapper}>
          <TouchableWithoutFeedback>
            <View style={styles.calendarBox}>
              <Calendar
                markingType="multi-dot"
                markedDates={marked}
                enableSwipeMonths
                showSixWeeks={true}
                disableAllTouchEventsForDisabledDays
                onDayPress={onDayPress}
                theme={{
                  todayTextColor: "#FF7648",
                  arrowColor: "#FF7648",
                }}
                onPressArrowLeft={onPressArrowLeft}
                onPressArrowRight={onPressArrowRight}
              />
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </TouchableOpacity>
    </Modal>
  );
};

const getStyles = () => {
  const { width } = Dimensions.get("screen");

  return StyleSheet.create({
    wrapper: {
      flex: 1,
      justifyContent: "center",
    },
    background: {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 10,
    },
    calendarBox: {
      backgroundColor: "white",
      borderRadius: 12,
      padding: 5,
      width: width * 0.8,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 12,
      elevation: 5,
    },
    customTitleContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      gap: 10,
    },
    customTitle: {
      fontSize: 16,
    },
  });
};
