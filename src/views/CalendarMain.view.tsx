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
import {
  getEventsInBetweenDatesBackwards,
  getEventsInBetweenDatesForward,
  getNextEvents,
  getPreviousEvents,
} from "../service/getMoreEvents";
import { delay } from "../service/delay";

const AMOUNT_NEW_DATES = 30;
const TODAY_INDEX = 15;

type FetchBetweenType = {
  index: number;
  fetch: boolean;
};

export const CalendarViewMain = () => {
  const styles = getStyles();
  const { scrollPosition } = useScrollPosition();
  const { width } = Dimensions.get("screen");

  const flashListRef = useRef(null);
  const reachedStart = useRef<boolean>(false);
  const [calendarData, setCalendarData] = useState<CalendarItemType[]>([]);
  const [today, setToday] = useState<CalendarItemType>({
    date: null,
    events: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Estado para controlar las funciones de fetchInBetweenDates
  const fetchBetween = useRef<FetchBetweenType>({
    index: 0,
    fetch: false,
  });

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

  const fetchInBetweenDatesForward = async (
    initialDate: Date,
    endDateParam: Date
  ) => {
    setIsLoading(true);

    const lastDateToSeacrh = new Date(initialDate);
    lastDateToSeacrh.setDate(lastDateToSeacrh.getDate() + 1);

    const { inBetweenEvents, indexToScroll, endDate } =
      getEventsInBetweenDatesForward(lastDateToSeacrh, endDateParam);

    const totalIndex = calendarData.length + indexToScroll;

    await delay(2000);

    fetchBetween.current = {
      index: totalIndex,
      fetch: true,
    };

    setCalendarData((prevData) => {
      return [...prevData, ...inBetweenEvents];
    });

    setLastCurrentDate(endDate);
  };

  const fetchInBetweenDatesBackwards = async (
    initialDate: Date,
    endDateParam: Date
  ) => {
    setIsLoading(true);

    const { inBetweenEvents, indexToScroll, startDate } =
      getEventsInBetweenDatesBackwards(initialDate, endDateParam);

    await delay(2000);

    fetchBetween.current = {
      index: indexToScroll,
      fetch: true,
    };

    setFirstCurrentDate(startDate);

    setCalendarData((prevData) => {
      return [...inBetweenEvents, ...prevData];
    });
  };

  const scrollToToday = () => {
    // flashListRef.current?.scrollToIndex({
    //   index: todayIndex,
    //   animated: true,
    // });

    flashListRef.current?.scrollToItem({
      item: today,
      animated: true,
    });
  };

  const scrollToSpecificIndex = (index: number) => {
    flashListRef.current?.scrollToIndex({
      index,
      animated: true,
    });
  };

  const scrollToIndexByDate = (date: Date) => {
    const calendarIndex = calendarData.findIndex(
      (calendar) => calendar.date.toDateString() === date.toDateString()
    );

    if (calendarIndex > -1) {
      scrollToSpecificIndex(calendarIndex);
    } else {
      if (date > lastCurrentDate) {
        fetchInBetweenDatesForward(lastCurrentDate, date);
      } else if (date < firstCurrentDate) {
        fetchInBetweenDatesBackwards(firstCurrentDate, date);
      }
    }
  };

  useEffect(() => {
    const { calendar, firstDate, lastDate } = getInitialEvents();
    setCalendarData(calendar);
    setFirstCurrentDate(firstDate);
    setLastCurrentDate(lastDate);
    setToday(calendar[TODAY_INDEX]);
  }, []);

  useEffect(() => {
    if (fetchBetween.current.fetch) {
      setTimeout(() => {
        scrollToSpecificIndex(fetchBetween.current.index);
        setIsLoading(false);
      }, 1000);

      fetchBetween.current = {
        index: fetchBetween.current.index,
        fetch: false,
      };
    }
  }, [calendarData]);

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
      <CalendarTop
        scrollToTodayIndex={scrollToToday}
        scrollToIndexByDate={scrollToIndexByDate}
      />

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
            initialScrollIndex={TODAY_INDEX}
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
