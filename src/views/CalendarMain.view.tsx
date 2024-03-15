import { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { getInitialEvents } from "../service/getInitialEvents";
import { CalendarItemType } from "../types/calendar";
import { useScrollPosition } from "../Context/CalendarContext.provider";
import { CalendarColumn } from "../components/Calendar/CalendarColumn.component";
import { CalendarTop } from "../components/Calendar/CalendarTop.component";

export const CalendarViewMain = () => {
  const styles = getStyles();
  const { scrollPosition } = useScrollPosition();
  const { width } = Dimensions.get("screen");

  const [calendarData, setCalendarData] = useState([]);
  const [todayIndex, setTodayIndex] = useState(15);

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<CalendarItemType>) => (
      <CalendarColumn {...item} index={index} scrollPosition={scrollPosition} />
    ),
    [scrollPosition]
  );

  useEffect(() => {
    const initialCalendarData = getInitialEvents();
    setCalendarData(initialCalendarData);
  }, []);

  return (
    <View style={styles.wrapper}>
      <CalendarTop />

      <View style={styles.body}>
        {calendarData?.length > 0 && (
          <FlashList
            horizontal
            pagingEnabled
            data={calendarData}
            renderItem={renderItem}
            estimatedItemSize={width}
            initialScrollIndex={todayIndex}
          />
        )}
      </View>
    </View>
  );
};

const getStyles = () => {
  const { height, width } = Dimensions.get("screen");

  return StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    body: {
      flexGrow: 1,
    },
    currentTimeIndicator: {
      position: "absolute",
      top: 0,
      bottom: 0,
      width: 2,
      backgroundColor: "red",
    },
  });
};
