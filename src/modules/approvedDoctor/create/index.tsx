import ApprovedDoctor from "../component/approvedDoctorForm";

const RegisterApprovedDoctor = () => {
  return (
    <div>
      <div className=" mb-3 space-y-1">
        <h1 className="font-bold text-xl">Senior Doctor Registration</h1>
        <h6 className="text-xs text-dashboard-text">
          Entry of DCD Senior Doctor Information who oversee NC clinics and
          supervise SRs
        </h6>
      </div>

      <div className="bg-white  p-8 rounded-xl mt-5">
        <div>
          <h3 className=" font-bold text-md mb-3 ">Register Senior Doctor</h3>
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

export default RegisterApprovedDoctor;
