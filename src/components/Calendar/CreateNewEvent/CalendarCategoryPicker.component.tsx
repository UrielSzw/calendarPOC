import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CalendarCategory } from "../../../types/calendar";

type Props = {
  options: CalendarCategory[];
  value: CalendarCategory;
  setValue: (option: CalendarCategory) => void;
  showPicker: boolean;
  setShowPicker: (value: boolean) => void;
};

export const CalendarCategoryPicker: React.FC<Props> = ({
  options,
  value,
  setValue,
  showPicker,
  setShowPicker,
}) => {
  const styles = getStyles();

  const handleOptionSelected = (option: CalendarCategory) => {
    setValue(option);
    setShowPicker(false);
  };

  return (
    <Modal visible={showPicker} transparent>
      <TouchableOpacity
        style={styles.background}
        onPress={() => setShowPicker(false)}
      >
        <View style={styles.wrapper}>
          <ScrollView style={styles.scroll}>
            <View>
              {options?.length &&
                options.map((option: CalendarCategory, index: number) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleOptionSelected(option)}
                    style={[
                      styles.option,
                      {
                        backgroundColor:
                          value.name === option.name
                            ? "rgba(239,236,236,0.3)"
                            : "transparent",
                      },
                    ]}
                  >
                    <Text>{option.name}</Text>

                    <View
                      style={{
                        width: 15,
                        height: 15,
                        borderWidth: 1,
                        borderColor: option.color,
                        backgroundColor:
                          value.name === option.name
                            ? option.color
                            : "transparent",
                        borderRadius: 2,
                      }}
                    />
                  </TouchableOpacity>
                ))}
            </View>
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const getStyles = () => {
  const { height, width } = Dimensions.get("screen");

  return StyleSheet.create({
    background: {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 50,
    },
    wrapper: {
      width: "100%",
      height: height * 0.3,
      backgroundColor: "white",
      borderRadius: 12,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 12,
      elevation: 5,
    },
    scroll: {
      flexGrow: 1,
    },
    option: {
      width: "100%",
      flexDirection: "row",
      padding: 15,
      paddingHorizontal: 30,
      gap: 10,
      borderBottomWidth: 1,
      borderColor: "#EFECEC",
      alignItems: "center",
      justifyContent: "space-between",
    },
  });
};
