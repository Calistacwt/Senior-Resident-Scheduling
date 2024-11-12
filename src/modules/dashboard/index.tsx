import { useEffect, useState } from "react";
import Calendar from "./component/calendar";
import { getSRSchedule } from "@/services/dashboard";

const Dashboard = () => {
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      const data = await getSRSchedule();
      setScheduleData(data);
    };

    fetchSchedule();
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
              <p>Import</p>
            </div>
          </button>
        </div>
      </div>

      <div id="calendar-content">
        <Calendar scheduleData={scheduleData} />
      </div>
    </div>
  );
};

export default Dashboard;
