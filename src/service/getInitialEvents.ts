import { CalendarEventType } from "../types/calendar";

export const getInitialEvents = () => {
  const mockEvents: CalendarEventType[] = [
    {
      start: "09:00:00",
      end: "10:30:00",
      startBlocks: 36,
      endBlocks: 42,
      durationBlocks: 6,
      title: "Pepe",
      category: "Personal",
      color: "#6c98e0",
    },
    {
      start: "10:00:00",
      end: "11:00:00",
      startBlocks: 40,
      endBlocks: 44,
      durationBlocks: 4,
      title: "Today's Event",
      category: "Personal",
      color: "#e0cd6c",
    },
    {
      start: "09:30:00",
      end: "16:00:00",
      startBlocks: 38,
      endBlocks: 64,
      durationBlocks: 26,
      title: "Reunión de trabajo",
      category: "Laboral",
      color: "#b680e8",
    },
    {
      start: "14:00:00",
      end: "16:30:00",
      startBlocks: 56,
      endBlocks: 66,
      durationBlocks: 10,
      title: "Clase de yoga",
      category: "Bienestar",
      color: "#80e8b7",
    },
  ];

  const firstDate = new Date();
  firstDate.setDate(firstDate.getDate() - 15);

  const calendar = [];

  new Array(66).fill(0).forEach((_i, index) => {
    const newDate = new Date(firstDate);
    newDate.setDate(firstDate.getDate() + index);

    let events = [];

    if (true) {
      // 50% chance of having an event
      const dayEvents = Math.floor(Math.random() * mockEvents.length + 1);
      for (let i = 0; i < dayEvents; i++) {
        events.push(mockEvents[i]);
      }
    }
    calendar.push({
      date: newDate,
      events: mockEvents,
    });
  });

  return calendar;
};
