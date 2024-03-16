import { MOCK_EVENTS } from "../Global/global";
import { CalendarEventType } from "../types/calendar";

export const getNextEvents = (date: Date, count: number) => {
  const nextDatesWithEvents = [];

  let lastDate: Date;

  // Iterar 'count' veces para obtener las próximas fechas con eventos
  for (let i = 0; i < count; i++) {
    const currentDate = new Date(date); // Crear una copia de la fecha actual
    currentDate.setDate(date.getDate() + i + 1); // Avanzar 'i' días

    // Obtener eventos para la fecha actual
    let eventsForDate: CalendarEventType[] = MOCK_EVENTS;

    if (i + 1 === count) {
      lastDate = currentDate;
    }

    nextDatesWithEvents.push({ date: currentDate, events: eventsForDate });
  }

  return {
    nextEvents: nextDatesWithEvents,
    lastDate,
  };
};

export const getPreviousEvents = (date: Date, count: number) => {
  const previousDatesWithEvents = [];

  let firstDate: Date;

  // Iterar 'count' veces para obtener las fechas anteriores con eventos
  for (let i = 1; i <= count; i++) {
    const currentDate = new Date(date); // Crear una copia de la fecha actual
    currentDate.setDate(date.getDate() - i); // Retroceder 'i' días

    // Obtener eventos para la fecha actual
    let eventsForDate: CalendarEventType[] = MOCK_EVENTS;

    if (i === count) {
      firstDate = currentDate;
    }

    previousDatesWithEvents.unshift({
      date: currentDate,
      events: eventsForDate,
    });
  }

  return {
    previousEvents: previousDatesWithEvents,
    firstDate,
  };
};
