import InfoCard from "./component/infoCard";
import RegisterForm from "./component/registerForm";

const RegisterSR = () => {
  return (
    <div>
      <div className=" mb-3 space-y-1">
        <h1 className="font-bold text-xl">Senior Resident Registration</h1>
        <h6 className="text-xs text-dashboard-text">
          Entry of Senior Resident Doctor Information
        </h6>
      </div>

      <div className="bg-white  p-8 rounded-xl mt-5">
        <div>
          <h3 className=" font-bold text-md mb-3 ">
            Details of Senior Resident Doctor
          </h3>
          <hr className="border-1 border-background-hr" />
        </div>

        <div className="flex space-x-14">
          <div className="flex-1 ">
            <RegisterForm />
          </div>
          <div className="flex-1">
            <InfoCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterSR;
