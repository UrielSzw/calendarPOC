import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View } from "react-native";
import { CalendarViewMain } from "./src/views/CalendarMain.view";
import { CalendarProvider } from "./src/Context/CalendarContext.provider";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ height: 25 }} />
      <CalendarProvider>
        <CalendarViewMain />
      </CalendarProvider>
    </GestureHandlerRootView>
  );
}
