import { useEffect, useState } from "react";
import Calendar from "./component/calendar";
import { getSRSchedule } from "@/services/dashboard";
import { getSRData } from "@/services/srList";

const Dashboard = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [_SRData, setSRData] = useState([]);

  const [callDates, setCallDates] = useState<string[]>([]);
  const [leaveDates, setLeaveDates] = useState<string[]>([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      const data = await getSRSchedule();
      setScheduleData(data);
    };

    fetchSchedule();
  }, []);

  useEffect(() => {
    const fetchSRData = async () => {
      const data = await getSRData();

      // Find the entry with the latest `endDate`
      const latestSR = data.reduce((latest: any, current: any) => {
        const latestEndDate = new Date(latest.postingPeriod.endDate);
        const currentEndDate = new Date(current.postingPeriod.endDate);

        return currentEndDate > latestEndDate ? current : latest;
      });

      setSRData(latestSR);
      setCallDates(latestSR.callDates);
      setLeaveDates(latestSR.leaveDates);
    };
    fetchSRData();
  }, []);

  return (
    <div className="m-3">
      <div className="flex justify-between">
        <div className=" mb-3 space-y-1">
          <h1 className="font-bold text-xl">
            Senior Resident's Calendar Schedule
          </h1>
          <h6 className="text-xs text-dashboard-text">
            A Calendar Overview for Senior Resident Commitments
          </h6>
        </div>

        <div>
          <button className="text-xs text-black rounded p-1.5 font-semibold border-sidebar-border border flex space-x-2 justify-center items-center">
            <img
              src="/assets/images/export.svg"
              alt="KKH Logo"
              className="rounded-md cursor-pointer w-5"
            />
            <div>
              <p>Export</p>
            </div>
          </button>
        </div>
      </div>

      <div id="calendar-content">
        <Calendar
          scheduleData={scheduleData}
          callDates={callDates}
          leaveDates={leaveDates}
        />
      </div>
    </div>
  );
};

export default Dashboard;
