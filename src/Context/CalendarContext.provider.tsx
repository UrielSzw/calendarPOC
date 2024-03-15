import React, { createContext, useState, useContext } from "react";

const ScrollPositionContext = createContext(null);

export const useScrollPosition = () => useContext(ScrollPositionContext);

export const CalendarProvider = ({ children }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  return (
    <ScrollPositionContext.Provider
      value={{ scrollPosition, setScrollPosition }}
    >
      {children}
    </ScrollPositionContext.Provider>
  );
};
