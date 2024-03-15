export type CalendarItemType = {
  date: Date;
  events: CalendarEventType[];
};

export type CalendarEventType = {
  start: string;
  end: string;
  startBlocks: number;
  endBlocks: number;
  durationBlocks: number;
  title: string;
  category: string;
  color: string;
};

export type FormattedCalendarEventType = CalendarEventType & {
  overlaps: number;
  rows: RowsType;
};

export type RowsType = {
  1: boolean;
  2: boolean;
  3: boolean;
  4: boolean;
  5: boolean;
  6: boolean;
  7: boolean;
  8: boolean;
  9: boolean;
};
