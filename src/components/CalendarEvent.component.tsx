import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { ROWS, ROW_HEIGHT } from "../Global/global";
import { RowsType } from "../types/calendar";

export const CalendarEvent = ({ event }) => {
  const { width } = Dimensions.get("screen");
  const rowWidth = (width - 50) / ROWS;

  const getTrueKeys = (rows: RowsType) => {
    const trueKeys = [];
    for (const key in rows) {
      if (rows.hasOwnProperty(key) && rows[key] === true) {
        trueKeys.push(parseInt(key));
      }
    }
    return trueKeys.length;
  };

  const getFirstTrueIndex = (rows: RowsType) => {
    for (const key in rows) {
      if (rows.hasOwnProperty(key) && rows[key] === true) {
        return parseInt(key) - 1;
      }
    }
    return 0;
  };

  const styles = StyleSheet.create({
    wrapper: {
      backgroundColor: event.color,
      position: "absolute",
      right: rowWidth * getFirstTrueIndex(event.rows),
      top: ROW_HEIGHT * event.startBlocks,
      width: rowWidth * getTrueKeys(event.rows),
      height: ROW_HEIGHT * event.durationBlocks,
      borderRadius: 8,
      padding: 6,
    },
    title: {
      color: "white",
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{event.title}</Text>
    </View>
  );
};
