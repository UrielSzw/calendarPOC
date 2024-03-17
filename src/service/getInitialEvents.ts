import { MOCK_EVENTS } from "../Global/global";
import { CalendarItemType } from "../types/calendar";

export const getInitialEvents = () => {
  const firstDate = new Date();
  firstDate.setDate(firstDate.getDate() - 15);

  const calendar: CalendarItemType[] = [];

  let lastDate: Date;

  new Array(66).fill(0).forEach((_i, index, array) => {
    const newDate = new Date(firstDate);
    newDate.setDate(firstDate.getDate() + index);

    let events = [];

    const dayEvents = Math.floor(Math.random() * MOCK_EVENTS.length + 1);

    for (let i = 0; i < dayEvents; i++) {
      events.push(MOCK_EVENTS[i]);
    }

    if (index + 1 === array.length) {
      lastDate = newDate;
    }

    calendar.push({
      date: newDate,
      events,
    });
  });

  return {
    calendar,
    firstDate,
    lastDate,
  };
};
