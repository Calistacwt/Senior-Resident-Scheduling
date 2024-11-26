export type registerSR = {
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
};

export type detailsSR = {
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
};
