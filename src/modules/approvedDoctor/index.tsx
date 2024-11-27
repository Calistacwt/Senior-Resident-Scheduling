import ApprovedDoctor from "./component/approvedDoctorList";

const List = () => {
  return (
    <div>
      <div className=" mb-3 space-y-1">
        <h1 className="font-bold text-xl">Register senior doctor</h1>
        <h6 className="text-xs text-dashboard-text">
          A form listing DCD senior doctors who oversee NC clinics and can
          supervise SRs.
        </h6>
      </div>

      <div className="bg-white  p-8 rounded-xl mt-5">
        <div>
          <h3 className=" font-bold text-md mb-3 ">Register senior doctor</h3>
          <hr className="border-1 border-background-hr" />
        </div>

        <div>
          <div>
            <ApprovedDoctor />
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
