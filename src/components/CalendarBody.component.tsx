import { Dimensions, StyleSheet, Text, View } from "react-native";
import { HOURS, ROW_HEIGHT } from "../Global/global";
import {
  CalendarEventType,
  FormattedCalendarEventType,
} from "../types/calendar";
import { useEffect, useState } from "react";
import { formatEvents } from "../service/formatEvents";
import { CalendarEvent } from "./CalendarEvent.component";

type Props = {
  events: CalendarEventType[];
  date: Date;
};

export const CalendarBody: React.FC<Props> = ({ events, date }) => {
  const styles = getStyles();

  const RowsArray = Array.from({ length: 96 }, (_, index) => index + 1);

  const [formattedEvents, setFormattedEvents] = useState<
    FormattedCalendarEventType[]
  >([]);

  useEffect(() => {
    if (events && events.length) {
      const newEvents: FormattedCalendarEventType[] = formatEvents(events);
      setFormattedEvents(newEvents);
    }
  }, []);

  return (
    <View style={styles.body}>
      <View style={styles.hoursColumn}>
        {HOURS.map((hour) => (
          <View style={styles.hoursBox} key={`hour_${hour}`}>
            <Text style={styles.hoursText}>{hour}</Text>
          </View>
        ))}
      </View>
      <View style={styles.calendarColumn}>
        {RowsArray.map((row) => (
          <View
            style={[
              styles.calendarRow,
              {
                borderBottomWidth: row % 4 === 0 ? 1 : 0,
              },
            ]}
            key={`row_${row}`}
          ></View>
        ))}
      </View>

      {formattedEvents?.length ? (
        formattedEvents.map((event, index) => (
          <CalendarEvent key={`event_${event.title}_${index}`} event={event} />
        ))
      ) : (
        <></>
      )}
    </View>
  );
};

const getStyles = () => {
  const { width } = Dimensions.get("screen");

  return StyleSheet.create({
    body: {
      flexDirection: "row",
    },
    hoursColumn: {
      width: 50,
      borderRightWidth: 1,
      borderColor: "#EFECEC",
      paddingTop: ROW_HEIGHT * 4 - 10,
      alignItems: "flex-end",
      paddingRight: 6,
    },
    hoursBox: {
      height: ROW_HEIGHT * 4,
    },
    hoursText: {
      color: "#BCC1CD",
      fontSize: 12,
    },
    calendarColumn: {
      width: width - 50,
    },
    calendarRow: {
      width: "100%",
      borderColor: "#EFECEC",
      height: ROW_HEIGHT,
    },
  });
};
