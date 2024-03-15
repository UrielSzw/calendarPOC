import { useEffect, useRef, useState } from "react";
import { Dimensions, View, ScrollView, StyleSheet } from "react-native";
import { CalendarEventType } from "../../types/calendar";
import { useScrollPosition } from "../../Context/CalendarContext.provider";
import { CalendarBody } from "../CalendarBody.component";
import { CalendarHeader } from "../CalendarHeader.component";
import { formatDateToYYYYMMDD } from "../../service/utils";
import { ROW_HEIGHT } from "../../Global/global";

type Props = {
  events: CalendarEventType[];
  date: Date;
  index: number;
  scrollPosition: number;
};

export const CalendarColumn: React.FC<Props> = ({ events, date, index }) => {
  const styles = getStyles();
  const { height } = Dimensions.get("screen");
  const { scrollPosition, setScrollPosition } = useScrollPosition();

  const scrollViewRef = useRef(null);
  const [currentTimePosition, setCurrentTimePosition] = useState(0);
  const [isToday, setIsToday] = useState(false);

  const handleScroll = (event: any) => {
    const newPosition = event.nativeEvent.contentOffset.y;
    setScrollPosition(newPosition);
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: scrollPosition, animated: false });
    }
  }, [scrollPosition]);

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const hour = now.getHours();
      const minutes = now.getMinutes();
      const totalMinutes = hour * 60 + minutes;
      const minuteHeight = (ROW_HEIGHT * 4) / 60;
      setCurrentTimePosition(totalMinutes * minuteHeight);
      setIsToday(formatDateToYYYYMMDD(date) === formatDateToYYYYMMDD(now));
    };

    updateCurrentTime(); // Actualizar posición inicial
    const interval = setInterval(updateCurrentTime, 60000); // Actualizar cada minuto

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.wrapper}>
      <CalendarHeader date={date} />
      <ScrollView
        style={styles.bodyScroll}
        scrollEventThrottle={16}
        ref={scrollViewRef}
        onMomentumScrollEnd={handleScroll}
        showsVerticalScrollIndicator={false}
      >
        <CalendarBody events={events} date={date} />

        {isToday && (
          <View
            style={[styles.currentTimeIndicator, { top: currentTimePosition }]}
          >
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: "red",
                position: "absolute",
                top: -5,
                left: -6,
              }}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const getStyles = () => {
  const { height, width } = Dimensions.get("screen");

  return StyleSheet.create({
    wrapper: {
      width: width,
      minHeight: height - 80,
    },
    bodyScroll: {
      flex: 1,
    },
    currentTimeIndicator: {
      position: "absolute",
      top: 10,
      width: width - 50,
      height: 2,
      backgroundColor: "red",
      right: 0,
    },
  });
};
