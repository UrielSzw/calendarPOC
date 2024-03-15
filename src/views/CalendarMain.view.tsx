import { useCallback, useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { getInitialEvents } from "../service/getInitialEvents";
import { CalendarItemType } from "../types/calendar";
import { CalendarColumn } from "../components/CalendarColumn.component";
import { useScrollPosition } from "../Context/CalendarContext.provider";

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
      <View style={styles.header}></View>
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
    header: {
      width: "100%",
      borderBottomWidth: 1,
      borderColor: "#EFECEC",
      height: 110,
    },
    body: {
      height: height - 110,
      width: width,
    },
  });
};
