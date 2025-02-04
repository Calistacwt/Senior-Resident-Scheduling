import { format } from "date-fns";

// Function to check if a date is a post-call day
export const isPostCall = (
  date: Date,
  callDates: string[],
  leaveDates: { date: string; session: string }[],
): boolean => {
  const nextDay = new Date(date);
  nextDay.setDate(date.getDate() - 1);
  const formattedNextDay = format(nextDay, "yyyy-MM-dd");

  // Check if the next day is a post-call date and also if it's a leave day
  const isLeave = leaveDates.some((leave) => leave.date === formattedNextDay);

  // If it's a leave day, return false for post-call
  if (isLeave) {
    return false;
  }

  // Otherwise, check if the next day is a post-call date
  return callDates.includes(formattedNextDay);
};