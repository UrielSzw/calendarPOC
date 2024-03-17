import { Dimensions, StyleSheet, Text, View } from "react-native";
import { DAYS } from "../../../Global/global";
import { getMonthName } from "../../../service/utils";

type Props = {
  date: Date;
};

export const CalendarHeader: React.FC<Props> = ({ date }) => {
  const styles = getStyles();

  return (
    <View style={styles.header}>
      <View style={styles.dateBox}>
        <Text style={styles.dayText}>{getMonthName(date)}</Text>
        <Text style={styles.dayText}>
          {DAYS[date.getDay()].slice(0, 3).toUpperCase()}
        </Text>
        <Text style={styles.dateText}>{date?.getDate().toString()}</Text>
      </View>
    </View>
  );
};

const getStyles = () => {
  const { width } = Dimensions.get("screen");

  return StyleSheet.create({
    header: {
      width: width,
      height: 75,
      flexDirection: "row",
      borderBottomWidth: 1,
      borderColor: "#EFECEC",
    },
    dateBox: {
      width: 50,
      height: 75,
      justifyContent: "center",
      alignItems: "center",
    },
    dayText: {
      fontSize: 12,
      color: "#BCC1CD",
    },
    dateText: {
      fontSize: 26,
      fontWeight: "700",
    },
  });
};
