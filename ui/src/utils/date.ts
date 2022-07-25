import {
  endOfWeek,
  format,
  isToday,
  isTomorrow,
  isYesterday,
  parseISO,
  startOfWeek,
  intervalToDuration,
} from "date-fns";

export const DEFAULT_DATE_FORMAT = "dd.MM.yyyy";

export function getDateObject(input: any): Date {
  const type = typeof input;
  if (type === "string") {
    return parseISO(input);
  }

  if (type === "number") {
    return new Date(input);
  }

  return <Date>input;
}

export const getStartOfWeek = (
  date: Date,
  weekStart?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | undefined
) => startOfWeek(date, { weekStartsOn: weekStart });

export const getEndOfWeek = (
  date: Date,
  weekStart?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | undefined
) => endOfWeek(date, { weekStartsOn: weekStart });

export function formatDate(input?: string | Date, formatType?: string) {
  if (!input) {
    return undefined;
  }
  return formatType
    ? format(getDateObject(input), formatType)
    : format(getDateObject(input), DEFAULT_DATE_FORMAT);
}

export function setDateTime(date: Date, hourMinute: string): Date {
  const parts = hourMinute.split(":");
  return new Date(
    date.setHours(parseInt(parts[0], 10), parseInt(parts[1], 10), 0)
  );
}

export function toRestDate(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function toRestDateTime(date: Date): string {
  return format(date, "yyyy-MM-dd'T'HH:mm:ss");
}

export function toTimeString(restDateTime: string): string {
  return format(parseISO(restDateTime), "HH:mm");
}

export function toDate(value: any): Date {
  if (typeof value === "number") {
    // value is epoch seconds
    return new Date(Math.trunc(value * 1000));
  }

  if (Array.isArray(value)) {
    return new Date(value[0], value[1] - 1, value[2], 0, 0, 0, 0);
  }
  return parseISO(value?.toString());
}

export function toEpochSeconds(date: Date): number {
  return date.getTime() / 1000;
}

export function timeToMinutes(time: string): number {
  const parts = time.split(":");
  const hour = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  return hour * 60 + minutes;
}

export const getWhen = (date: Date, formatStr: string) => {
  if (isToday(date)) {
    return "Today";
  }

  if (isTomorrow(date)) {
    return "Tomorrow";
  }

  if (isYesterday(date)) {
    return "Yesterday";
  }

  return formatDate(date, formatStr);
};

export const convertMinsToHM = (minutes: number) => {
  const timeString = minutes / 60;
  const date = new Date(0, 0);
  date.setMinutes(+timeString * 60);
  const hm = date.toTimeString().slice(0, 5).split(":");
  return `${+hm[0]}hrs ${Number(hm[1]) > 0 ? `${+hm[1]}mins` : ""}`;
};

export const convertDigitalMinsToHM = (minutes: number) => {
  const m = Math.floor(minutes % 60).toString();
  const h = Math.floor((minutes / 60) % 60).toString();
  return `${h.padStart(2, "0")}:${m.padStart(2, "0")} h`;
};

export const getLastWeek = () => {
  const date = new Date();
  return new Date(date.setDate(date.getDate() - 7));
};

export const getRangeDate = (
  start: string,
  end: string,
  formatStr?: string
) => {
  const dateStart = formatDate(start, formatStr);
  const dateEnd = formatDate(end, formatStr);
  return `${dateStart} - ${dateEnd}`;
};

export const convert12hTo24h = (time: string, meridian?: string) => {
  const localMeridian = meridian || time.split(" ")[1];
  const hr = time.split(":")[0];
  const min = time.split(":")[1];
  if (localMeridian) {
    const newHr =
      localMeridian.toUpperCase() === "PM" && Number(hr) !== 12
        ? Number(hr) + 12
        : hr;
    return `${newHr}:${min.split(" ")[0]}`;
  }
  return `${hr}:${min}`;
};

export const convert24hTo12h = (time: string, addMeridian?: boolean) => {
  const hr = time.split(":")[0];
  const min = time.split(":")[1];

  const newHr = Number(hr) > 12 ? Number(hr) - 12 : hr;

  return addMeridian
    ? `${newHr.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}:${min} ${Number(hr) >= 12 ? "PM" : "AM"}`
    : `${newHr.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}:${min}`;
};

export const getDifferenceInInterval = (start: Date, end: Date) =>
  intervalToDuration({ start: new Date(start), end: new Date(end) });
