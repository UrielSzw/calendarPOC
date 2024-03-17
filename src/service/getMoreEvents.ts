import { MOCK_EVENTS } from "../Global/global";
import { CalendarEventType, CalendarItemType } from "../types/calendar";

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

// Función para obtener eventos entre dos fechas hacia adelante
export const getEventsInBetweenDatesForward = (
  startDate: Date,
  endDate: Date
) => {
  const datesWithEventsForward = [];

  const endDatePlusTwenty = new Date(endDate);
  endDatePlusTwenty.setDate(endDatePlusTwenty.getDate() + 20); // Agregar 20 días a la fecha de fin

  // Iterar para obtener las fechas con eventos entre la fecha de inicio y la fecha de fin + 20 días
  for (
    let currentDate = new Date(startDate);
    currentDate <= endDatePlusTwenty;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    // Obtener eventos para la fecha actual
    datesWithEventsForward.push({
      date: new Date(currentDate),
      events: MOCK_EVENTS,
    });
  }

  // Encontrar el índice de la fecha de fin
  const indexToScroll = datesWithEventsForward.length - 21;

  return {
    inBetweenEvents: datesWithEventsForward,
    indexToScroll,
    endDate: endDatePlusTwenty,
  };
};

// Función para obtener eventos entre dos fechas hacia atrás
export const getEventsInBetweenDatesBackwards = (
  startDate: Date,
  endDate: Date
) => {
  const datesWithEventsBackwards = [];

  const endDateMinusTwenty = new Date(endDate);
  endDateMinusTwenty.setDate(endDateMinusTwenty.getDate() - 20); // Restar 20 días a la fecha de inicio

  // Iterar para obtener las fechas con eventos entre la fecha de inicio - 20 días y la fecha de fin
  for (
    let currentDate = new Date(startDate);
    currentDate >= endDateMinusTwenty;
    currentDate.setDate(currentDate.getDate() - 1)
  ) {
    // Obtener eventos para la fecha actual
    datesWithEventsBackwards.unshift({
      date: new Date(currentDate),
      events: MOCK_EVENTS,
    });
  }

  // Encontrar el índice de la fecha de fin
  const indexToScroll = 19;

  return {
    inBetweenEvents: datesWithEventsBackwards,
    indexToScroll,
    startDate: endDateMinusTwenty,
  };
};
