import { useState } from "react";
import InfoCard from "../component/infoCard";
import SeniorResidentForm from "../component/seniorResidentForm";
import { useNavigate } from "@tanstack/react-router";
import { formatDate } from "@/utils/formatter";
import { registerSRInfo } from "@/services/registerSR";

const RegisterSR = () => {
  const navigate = useNavigate();
  const [callDates, setCallDates] = useState([]);

  const [postingPeriod, _setPostingPeriod] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const [formData, setFormData] = useState({
    postingPeriod: { startDate: new Date(), endDate: new Date() },
    name: "",
    mobile: "",
    email: "",
    MCR: "",
    noSession: "",
    remarks: "",
    callDates: "",
  });

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formattedCallDates = callDates.map((date) => formatDate(date));
      await registerSRInfo({
        ...formData,
        postingPeriod: {
          startDate: postingPeriod.startDate.toISOString(),
          endDate: postingPeriod.endDate.toISOString(),
        },
        callDates: formattedCallDates,
      });
      navigate({ to: `/srList` });
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div>
      <div className=" mb-3 space-y-1">
        <h1 className="font-bold text-xl">
          Senior Resident Doctor Registration
        </h1>
        <h6 className="text-xs text-dashboard-text">
          Entry of Senior Resident Doctor Information
        </h6>
      </div>

      <div className="bg-white  p-8 rounded-xl mt-5">
        <div>
          <h3 className=" font-bold text-md mb-3 ">
            Senior Resident Doctor Profile
          </h3>
          <hr className="border-1 border-background-hr" />
        </div>

        <div className="flex space-x-14">
          <div className="flex-1 ">
            <SeniorResidentForm
              formData={formData}
              setFormData={setFormData}
              callDates={callDates}
              setCallDates={setCallDates}
              handleSubmit={handleSubmit}
            />
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
