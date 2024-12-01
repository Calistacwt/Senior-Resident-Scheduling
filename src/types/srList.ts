export type srList = {
  id: number;
  name: string;
  mobile: string;
  email: string;
  MCR: string;
  noSession: string;
  remarks: string;
  postingPeriod: {
    startDate: string;
    endDate: string;
  };
  callDates: string[];
  leaveDates: string[];
};
