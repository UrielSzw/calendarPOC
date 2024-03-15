import { MONTHS } from "../Global/global";

export const formatDate = (date: Date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  return `${day}-${month}-${year}`;
};

export const formatDateToYYYYMMDD = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const timeToblocks = (time: string) => {
  const hours = Number(time.slice(0, 2));
  const minutes = Number(time.slice(3, 5));

  let totalBlocks: number = 0;

  switch (minutes) {
    case 15:
      totalBlocks = totalBlocks + 1;
      break;
    case 30:
      totalBlocks = totalBlocks + 2;
      break;
    case 45:
      totalBlocks = totalBlocks + 3;
      break;
  }

  totalBlocks = totalBlocks + hours * 4;

  return totalBlocks;
};

export const calcEventHeight = (start: string, end: string) => {
  const blockToStart = timeToblocks(start);
  const blockToEnd = timeToblocks(end);

  return blockToEnd - blockToStart;
};

export const getMonthName = (date: Date) => {
  return MONTHS[date.getMonth()];
};
