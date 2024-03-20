import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { DAYS } from "../../../Global/global";

type Props = TouchableOpacityProps & {
  date?: Date;
  text1?: string;
  text2?: string;
  selected?: boolean;
};

export const SelectDateButton: React.FC<Props> = ({
  date,
  text1,
  text2,
  selected,
  ...rest
}) => {
  const styles = getStyles();

  return (
    <TouchableOpacity
      style={[
        styles.wrapper,
        { backgroundColor: selected ? "#FF7648" : "#F1F5F9" },
      ]}
      {...rest}
    >
      {date && (
        <View style={styles.textBox}>
          <Text
            style={[styles.textName, { color: selected ? "white" : "#4A4A4A" }]}
          >
            {date.getDate().toString()}
          </Text>
          <Text style={{ color: selected ? "white" : "#4A4A4A" }}>
            {DAYS[date.getDay()].slice(0, 3)}
          </Text>
        </View>
      )}
      {text1 && text2 && (
        <View style={styles.textBox}>
          <Text
            style={[styles.textName, { color: selected ? "white" : "#4A4A4A" }]}
          >
            {text1}
          </Text>
          <Text style={{ color: selected ? "white" : "#4A4A4A" }}>{text2}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const getStyles = () => {
  return StyleSheet.create({
    wrapper: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
    },
    textBox: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    textName: {
      fontSize: 16,
      fontWeight: "700",
    },
  });
};
