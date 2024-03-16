import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
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
import { getNextEvents, getPreviousEvents } from "../service/getMoreEvents";
import { delay } from "../service/delay";

const AMOUNT_NEW_DATES = 30;

export const CalendarViewMain = () => {
  const styles = getStyles();
  const { scrollPosition } = useScrollPosition();
  const { width } = Dimensions.get("screen");

  const flashListRef = useRef(null);
  const reachedStart = useRef<boolean>(false);
  const [calendarData, setCalendarData] = useState([]);
  const [todayIndex, setTodayIndex] = useState(15);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Estados para llevar la primera y ultima fecha que traer el back para saber desde cual pedir mas fechas de ser necesario
  const [firstCurrentDate, setFirstCurrentDate] = useState(new Date());
  const [lastCurrentDate, setLastCurrentDate] = useState(new Date());

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<CalendarItemType>) => (
      <CalendarColumn {...item} index={index} scrollPosition={scrollPosition} />
    ),
    [scrollPosition]
  );

  const fetchNextDates = async () => {
    const { nextEvents, lastDate } = getNextEvents(
      lastCurrentDate,
      AMOUNT_NEW_DATES
    );

    await delay(2000);

    setCalendarData((prevData) => {
      return [...prevData, ...nextEvents];
    });
    setLastCurrentDate(lastDate);
  };

  const fetchPreviousDates = async () => {
    setIsLoading(true);
    const { previousEvents, firstDate } = getPreviousEvents(
      firstCurrentDate,
      AMOUNT_NEW_DATES
    );

    await delay(2000);

    setCalendarData((prevData) => {
      return [...previousEvents, ...prevData];
    });
    setFirstCurrentDate(firstDate);
    reachedStart.current = false;

    flashListRef.current?.scrollToIndex({
      index: AMOUNT_NEW_DATES,
      animated: false,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    const { calendar, firstDate, lastDate } = getInitialEvents();
    setCalendarData(calendar);
    setFirstCurrentDate(firstDate);
    setLastCurrentDate(lastDate);
  }, []);

  // const getItemLayout = (_data, index) => ({
  //   length: width,
  //   offset: width * index,
  //   index,
  // });

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems && viewableItems.length) {
      const index = viewableItems[0]?.index;
      if (index === 0 && !reachedStart.current) {
        reachedStart.current = true;
        fetchPreviousDates();
      }
    }
  };

  // const onScroll = useCallback(
  //   (event: NativeSyntheticEvent<NativeScrollEvent>) => {
  //     const slideSize = event.nativeEvent.layoutMeasurement.width;
  //     const index = event.nativeEvent.contentOffset.x / slideSize;
  //     const roundIndex = Math.round(index);
  //     console.log("roundIndex:", roundIndex);
  //   },
  //   []
  // );

  return (
    <View style={styles.wrapper}>
      <CalendarTop />

      {isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      )}

      <View style={styles.body}>
        {calendarData?.length > 0 && (
          <FlashList
            ref={flashListRef}
            horizontal
            pagingEnabled
            data={calendarData}
            renderItem={renderItem}
            estimatedItemSize={width}
            initialScrollIndex={todayIndex}
            onEndReached={() => fetchNextDates()}
            onEndReachedThreshold={5}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 50,
            }}
            // onScroll={onScroll}
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
    loading: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "rgba(0,0,0,0.2)",
      zIndex: 10,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  });
};
