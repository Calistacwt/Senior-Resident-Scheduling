import UpdateSchedule from "./component/updateForm";

const ScheduleSR = () => {
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
            <UpdateSchedule />
          </div>

          {/* <div className="flex-2">
            <Card />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ScheduleSR;
