import RegistrationForm from "./component/registrationForm";
import InfoCard from "./component/infoCard";

const ScheduleSR = () => {
  return (
    <div>
      <div className=" mb-3 space-y-1">
        <h1 className="font-bold text-xl">Senior Resident Registration</h1>
        <h6 className="text-xxs text-[#5C5C5C]">
          Entry of Senior Resident Doctor Information
        </h6>
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-4">
        <RegistrationForm />
        <InfoCard />
      </div>
    </div>
  );
};

export default ScheduleSR;
