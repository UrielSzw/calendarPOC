import { CalendarEventType } from "../types/calendar";

export const ROW_HEIGHT = 20;

export const HOURS = [
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

export const DAYS = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

export const ORDER_DAYS = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

export const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export const ROWS = 9;

export const MOCK_EVENTS: CalendarEventType[] = [
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
