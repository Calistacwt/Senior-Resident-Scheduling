export type srList = {
  id: string;
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
  // leaveDates: string[];
  leaveDates: { date: string; session: string }[]; 
};


export type LeaveDate = {
  date: string;
  session: string;
};
