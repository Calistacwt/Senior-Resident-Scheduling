import UpdateSchedule from "./component/updateSchedule";

const ScheduleSR = () => {
  return (
    <div>
      <div className=" mb-3 space-y-1">
        <h1 className="font-bold text-xl">Senior Resident Schedule Planner</h1>
        <h6 className="text-xxs text-[#5C5C5C]">
          List of DCD Senior doctors supervising SR in NC clinics
        </h6>
      </div>

      <UpdateSchedule />
    </div>
  );
};

export default ScheduleSR;
