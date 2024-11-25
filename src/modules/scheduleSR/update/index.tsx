import Card from "../component/card";
import UpdateSchedule from "../component/updateForm";
import { useEffect, useState } from "react";
import { getSRSchedule } from "@/services/dashboard";

const ScheduleSRUpdate = () => {
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    const fetchSRInfo = async () => {
      const data = await getSRSchedule();
      console.log(data);
      setScheduleData(data);
    };

    fetchSRInfo();
  }, []);

  return (
    <div>
      <div className=" mb-3 space-y-1">
        <h1 className="font-bold text-xl">Senior Resident Schedule Planner</h1>
        <h6 className="text-xs text-dashboard-text">
          List of DCD Senior doctors supervising SR in NC clinics
        </h6>
      </div>

      <div className="bg-white  p-8 rounded-xl mt-5">
        <div>
          <h3 className=" font-bold text-md mb-3 ">
            Senior Resident Scheduling
          </h3>
          <hr className="border-1 border-background-hr" />
        </div>

        <div className="flex space-x-14">
          <div className="flex-1 ">
            <UpdateSchedule scheduleData={scheduleData} />
          </div>

          <div className="flex-2">
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleSRUpdate;
