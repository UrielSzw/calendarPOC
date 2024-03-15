import {
  CalendarEventType,
  FormattedCalendarEventType,
  RowsType,
} from "../types/calendar";

const calcOverlap = (
  start: number,
  end: number,
  startOther: number,
  endOther: number
) => {
  return (
    (startOther <= end && endOther >= start) ||
    (start <= endOther && end >= startOther)
  );
};

const mergeRows = (existingRows: RowsType, newRows: RowsType) => {
  const mergedRows = { ...existingRows };

  for (let key in newRows) {
    if (newRows[key]) {
      mergedRows[key] = true;
    }
  }

  return mergedRows;
};

const updateRows = (rows: RowsType, num: number) => {
  let updatedRows = { ...rows };
  let foundIndex = null;
  let maxIndex = 9;

  // Buscar el primer índice con valor "false"
  for (let key in updatedRows) {
    const index = parseInt(key);
    if (!updatedRows[key]) {
      foundIndex = index;
      break;
    }
  }

  // Si se encuentra un índice con valor "false"
  if (foundIndex !== null) {
    // Modificar los valores de true o false
    for (let i = foundIndex; i < foundIndex + num; i++) {
      if (updatedRows[i] === undefined) {
        break; // No hay más índices en el objeto
      }
      updatedRows[i] = true;
    }

    // Restaurar los valores de las claves anteriores a "false"
    for (let i = 1; i < foundIndex; i++) {
      updatedRows[i] = false;
    }
    // Establecer las claves posteriores afectadas a "false"
    for (let i = foundIndex + num; i <= maxIndex; i++) {
      if (updatedRows[i]) {
        updatedRows[i] = false;
      }
    }
  }

  return updatedRows;
};

const countFalse = (rows: RowsType) => {
  let count = 0;
  for (const key in rows) {
    if (rows.hasOwnProperty(key) && rows[key] === false) {
      count++;
    }
  }
  return count;
};

const ROWS = 9;

export const formatEvents = (
  events: CalendarEventType[]
): FormattedCalendarEventType[] => {
  let rowsUsed = [];

  const formattedEvents: FormattedCalendarEventType[] = events.map(
    (event, index) => {
      const otherEvents = [...events];

      otherEvents.splice(index, 1);

      const start = event.startBlocks;
      const end = event.endBlocks;

      let overlaps = 1;
      let rows = {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
      };

      let eventsOverlaped = [];

      otherEvents.forEach((otherEvent) => {
        const startOther = otherEvent.startBlocks;
        const endOther = otherEvent.endBlocks;

        const overlap = calcOverlap(start, end, startOther, endOther);

        if (overlap) {
          // overlaps++;

          const otherIndex = events.findIndex(
            (arr) => arr.title === otherEvent.title
          );

          // Si el indice es mayor a otro, agrego overlap
          if (index > otherIndex) {
            eventsOverlaped.push(otherEvent);
            overlaps++;

            rows = mergeRows(rows, rowsUsed[otherIndex]);

            // Si el indice es menor a otro y hay eventos overlap con indice menor
          } else if (eventsOverlaped.length) {
            const eventsOverlapedLength = eventsOverlaped.length;
            let overlapsCounter = 0;

            eventsOverlaped.map((eventOver) => {
              const startOver = eventOver.startBlocks;
              const endOver = eventOver.endBlocks;

              const overlap = calcOverlap(
                startOther,
                endOther,
                startOver,
                endOver
              );

              if (overlap) {
                overlapsCounter++;
              }
            });

            // Si el evento con indice mayor tiene overlap con todos los eventos overlap con indice menor
            if (eventsOverlapedLength === overlapsCounter) {
              overlaps++;
            }
            // Caso de que no tenga eventos overlap con indice menor
          } else {
            overlaps++;
          }
        }
      });

      // Si no tiene eventos overlap con indice menor, le asigno las rows disponibles desde la 1
      if (!eventsOverlaped.length) {
        const rowsToUse = Math.floor(ROWS / overlaps);
        rows = updateRows(rows, rowsToUse);

        // Si tiene overlaps con indice menor, se las resto asi distribuyo el espacio restante
      } else {
        // overlaps = 3 - 2
        // rows (7,8,9)
        const totalOverlaps = overlaps - eventsOverlaped.length;
        const rowsToUse = Math.floor(countFalse(rows) / totalOverlaps);

        rows = updateRows(rows, rowsToUse);
      }

      rowsUsed.push(rows);

      return {
        ...event,
        overlaps,
        rows,
      };
    }
  );

  return formattedEvents;
};
