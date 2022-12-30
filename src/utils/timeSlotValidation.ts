import { addMinutes, isAfter, isBefore, isEqual } from "date-fns";

export const isWeekDayTime = (timeValue: string): boolean => {
  const startDateToCompare = new Date("01-01-2011 09:00");
  const endDateToCompare = new Date("01-01-2011 20:00");
  const dateTimeValue = new Date(`01-01-2011 ${timeValue}`);

  return (
    (isAfter(dateTimeValue, startDateToCompare) ||
      isEqual(dateTimeValue, startDateToCompare)) &&
    (isBefore(dateTimeValue, endDateToCompare) ||
      isEqual(dateTimeValue, endDateToCompare))
  );
};

export const isWeekEndTime = (timeValue: string): boolean => {
  const startDateToCompare = new Date("01-01-2011 10:00");
  const endDateToCompare = new Date("01-01-2011 22:00");
  const dateTimeValue = new Date(`01-01-2011 ${timeValue}`);

  return (
    (isAfter(dateTimeValue, startDateToCompare) ||
      isEqual(dateTimeValue, startDateToCompare)) &&
    (isBefore(dateTimeValue, endDateToCompare) ||
      isEqual(dateTimeValue, endDateToCompare))
  );
};

export const validateTime = (
  timeValue: string,
  sessionType: string
): string => {
  let errorMessage = "";
  if (sessionType.toLowerCase() === "weekday" && !isWeekDayTime(timeValue)) {
    errorMessage = "Sessions can only be from 9AM - 8PM on WeekDays";
  }
  if (sessionType.toLowerCase() === "weekend" && !isWeekEndTime(timeValue)) {
    errorMessage = "Sessions can only be from 10AM - 10PM on WeekEnds";
  }

  return errorMessage;
};

export const validateTimeSlot = (
  startsAt: string,
  endsAt: string,
  timeSlot: string
): string => {
  let errorMessage = "";
  const startsAtValue = new Date(`01-01-2011 ${startsAt}`);
  const endsAtValue = new Date(`01-01-2011 ${endsAt}`);

  if (timeSlot) {
    const result = addMinutes(startsAtValue, parseInt(timeSlot));

    if (!isEqual(result, endsAtValue)) {
      errorMessage = `The Selected time interval must be a ${timeSlot} minute duration`;
    }
  }

  return errorMessage;
};
