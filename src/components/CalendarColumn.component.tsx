import { useEffect, useRef } from "react";
import { Dimensions, View, ScrollView, StyleSheet } from "react-native";
import { CalendarEventType } from "../types/calendar";
import { useScrollPosition } from "../Context/CalendarContext.provider";
import { CalendarBody } from "./CalendarBody.component";
import { CalendarHeader } from "./CalendarHeader.component";

type Props = {
  events: CalendarEventType[];
  date: Date;
  index: number;
  scrollPosition: number;
};

export const CalendarColumn: React.FC<Props> = ({ events, date, index }) => {
  const styles = getStyles();
  const { scrollPosition, setScrollPosition } = useScrollPosition();

  const scrollViewRef = useRef(null);

  const handleScroll = (event: any) => {
    const newPosition = event.nativeEvent.contentOffset.y;
    setScrollPosition(newPosition);
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: scrollPosition, animated: false });
    }
  }, [scrollPosition]);

  return (
    <View style={styles.wrapper}>
      <CalendarHeader date={date} />
      <ScrollView
        style={styles.bodyScroll}
        scrollEventThrottle={16}
        ref={scrollViewRef}
        onMomentumScrollEnd={handleScroll}
      >
        <CalendarBody events={events} date={date} />
      </ScrollView>
    </View>
  );
};

const getStyles = () => {
  const { height, width } = Dimensions.get("screen");

  return StyleSheet.create({
    wrapper: {
      width: width,
      minHeight: height - 110,
    },
    bodyScroll: {
      flex: 1,
    },
  });
};
