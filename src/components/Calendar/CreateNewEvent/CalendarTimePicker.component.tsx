import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

type Props = {
  show: boolean;
  setShow: (value: boolean) => void;
  date: Date;
  onChange: any;
  id: string;
};

export const CalendarTimePicker: React.FC<Props> = ({
  show,
  setShow,
  date,
  onChange,
  id,
}) => {
  const styles = getStyles();

  return (
    <Modal visible={show} transparent>
      <TouchableOpacity
        style={styles.background}
        onPress={() => setShow(false)}
      >
        <TouchableWithoutFeedback>
          <View style={styles.pickerBox}>
            <View>
              <DateTimePicker
                value={date}
                key={id}
                id={id}
                mode="time"
                display="spinner"
                onChange={onChange}
              />
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShow(false)}
            >
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

const getStyles = () => {
  const { width } = Dimensions.get("screen");

  return StyleSheet.create({
    background: {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 10,
    },
    pickerBox: {
      backgroundColor: "white",
      borderRadius: 12,
      alignItems: "center",
      gap: 15,
      padding: 5,
      width: width * 0.8,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 12,
      elevation: 5,
    },
    button: {
      padding: 10,
    },
    buttonText: {
      color: "#FF7648",
      fontSize: 18,
    },
  });
};
