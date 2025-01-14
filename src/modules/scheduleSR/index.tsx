import { getSRSchedule } from "@/services/dashboard";
import { useState, useEffect } from "react";
import Card from "./component/card";
import UpdateSchedule from "./component/updateForm";

const ScheduleSR = () => {
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      const data = await getSRSchedule();
      setScheduleData(data);
    };

    fetchSchedule();
  }, []);
  return (
    <div>
      <div className=" mb-3 space-y-1">
        <h1 className="font-bold text-xl">Senior Resident Schedule Planner</h1>
        <h6 className="text-xs text-dashboard-text">
          Update Senior Resident Doctors Schedule
        </h6>
      </div>

      <div className="bg-white  p-8 rounded-xl mt-5">
        <div>
          <h3 className=" font-bold text-md mb-3 ">Senior Resident Schedule</h3>
          <hr className="border-1 border-background-hr" />
        </div>

        <div className="flex">
          <div className="flex-1 ">
            <UpdateSchedule />
          </div>

          <div className="flex-2">
            <Card scheduleData={scheduleData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleSR;
