import UpdateSchedule from "./component/updateSchedule";

const ScheduleSR = () => {
  return (
    <div>
      <div className=" mb-3 space-y-1">
        <h1 className="font-bold text-xl">Senior Resident Schedule Planner</h1>
        <h6 className="text-xs text-dashboard-text">
          List of DCD Senior doctors supervising SR in NC clinics
        </h6>
      </div>

      <UpdateSchedule />
    </div>
  );
};

export default ScheduleSR;
