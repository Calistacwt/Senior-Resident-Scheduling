import Calendar from "./component/calendar";

const Dashboard = () => {
  return (
    <div className="m-3">
      <div className=" mb-3 space-y-1">
        <h1 className="font-bold text-xl">
          Senior Resident's Calendar Schedule
        </h1>
        <h6 className="text-xxs text-[#5C5C5C]">
          A Calendar Overview for Senior Resident Commitments
        </h6>
      </div>

      <Calendar />
    </div>
  );
};

export default Dashboard;
