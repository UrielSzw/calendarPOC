import React, { useCallback, useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar, CalendarUtils, DateData } from "react-native-calendars";
import { formatDateToYYYYMMDD, getMonthName } from "../service/utils";
import { CalendarTodayIcon } from "../assets/CalendarToday.component";
import { LocaleConfig } from "react-native-calendars";
import { DAYS, MONTHS } from "../Global/global";

const INITIAL_DATE = formatDateToYYYYMMDD(new Date());

LocaleConfig.locales["es"] = {
  monthNames: MONTHS,
  dayNames: DAYS,
  dayNamesShort: ["Dom", "Lun", "Mar", "Mer", "Jue", "Vie", "Sab"],
};
LocaleConfig.defaultLocale = "es";

type Props = {
  setCurrentMonthString: (month: string) => void;
  toggleCalendar: () => void;
  scrollToTodayIndex: () => void;
  scrollToIndexByDate: (date: Date) => void;
};

export const MonthCalendar: React.FC<Props> = ({
  setCurrentMonthString,
  toggleCalendar,
  scrollToTodayIndex,
  scrollToIndexByDate,
}) => {
  const [selected, setSelected] = useState(INITIAL_DATE);
  const [selectedValue, setSelectedValue] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(INITIAL_DATE);

  const getDate = (count: number) => {
    const date = new Date(INITIAL_DATE);
    const newDate = date.setDate(date.getDate() + count);
    return CalendarUtils.getCalendarDateString(newDate);
  };

  const onDayPress = useCallback((day: DateData) => {
    const targetDate = new Date(day.dateString);
    targetDate.setDate(targetDate.getDate() + 1);

    scrollToIndexByDate(targetDate);
    setSelected(day.dateString);
    toggleCalendar();
  }, []);

  const marked = useMemo(() => {
    return {
      [selected]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: "rgba(255,118,72,0.3)",
        selectedTextColor: "#FF7648",
      },
    };
  }, [selected]);

  const getNewSelectedDate = useCallback(
    (date, shouldAdd) => {
      const newMonth = new Date(date).getMonth();
      const month = shouldAdd ? newMonth + 1 : newMonth - 1;
      const newDate = new Date(selectedValue.setMonth(month));
      const newSelected = new Date(newDate.setDate(1));
      setCurrentMonthString(getMonthName(newSelected));
      return newSelected;
    },
    [selectedValue]
  );
  const onPressArrowLeft = useCallback(
    (subtract, month) => {
      const newDate = getNewSelectedDate(month, false);
      setSelectedValue(newDate);
      subtract();
    },
    [getNewSelectedDate]
  );

  const onPressArrowRight = useCallback(
    (add, month) => {
      const newDate = getNewSelectedDate(month, true);
      setSelectedValue(newDate);
      add();
    },
    [getNewSelectedDate]
  );

  const handleHeaderPress = () => {
    toggleCalendar();
    scrollToTodayIndex();
  };

  const CustomHeaderTitle = (
    <TouchableOpacity
      style={styles.customTitleContainer}
      onPress={handleHeaderPress}
    >
      <CalendarTodayIcon />
      <Text style={styles.customTitle}>{getMonthName(selectedValue)}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.calendarBox}>
        <Calendar
          markingType="multi-dot"
          markedDates={marked}
          enableSwipeMonths
          showSixWeeks={true}
          onDayPress={onDayPress}
          theme={{
            todayTextColor: "#FF7648",
            arrowColor: "#FF7648",
          }}
          customHeaderTitle={CustomHeaderTitle}
          onPressArrowLeft={onPressArrowLeft}
          onPressArrowRight={onPressArrowRight}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
  },
  calendarBox: {
    backgroundColor: "white",
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
