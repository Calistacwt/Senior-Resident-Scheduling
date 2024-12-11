import { format } from "date-fns";

// Function to check if a date is a post-call day
export const isPostCall = (date: Date, callDates: string[]): boolean => {
  const nextDay = new Date(date);
  nextDay.setDate(date.getDate() - 1); 
  const formattedNextDay = format(nextDay, "yyyy-MM-dd");

  // Check if the next day is a post-call date
  return callDates.includes(formattedNextDay);
};

// Function to check if a date is a leave day for a given session
export const isLeaveDay = (
  date: Date,
  session: string,
  leaveDates: string[],
): boolean => {
  const formattedDate = format(date, "yyyy-MM-dd");
  const formattedLeaveDate = `${formattedDate} ${session}`;
  return leaveDates.includes(formattedLeaveDate);
};


