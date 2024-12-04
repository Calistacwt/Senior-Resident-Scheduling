import { useState } from "react";
import SeniorResidentForm from "../component/seniorResidentForm";
import { useNavigate } from "@tanstack/react-router";
import { formatDate } from "@/utils/formatter";
import { registerSRInfo } from "@/services/registerSR";

const RegisterSR = () => {
  const navigate = useNavigate();
  const [callDates, setCallDates] = useState([]);
  const [leaveDates, setLeaveDates] = useState([]);
  const [isRegisteredSuccessfully, setIsRegisteredSuccessfully] =
    useState(false); // Success state

  const [formData, setFormData] = useState({
    postingPeriod: { startDate: "", endDate: "" },
    name: "",
    mobile: "",
    email: "",
    MCR: "",
    noSession: "",
    remarks: "",
    callDates: "",
    leaveDates: "",
  });

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formattedCallDates = callDates.map((date) => formatDate(date));

      // Combine date and AM/PM into a single string
      const formattedLeaveDates = leaveDates.map(
        (item: any) => `${item.date} ${item.session}`,
      );

      await registerSRInfo({
        ...formData,
        callDates: formattedCallDates,
        leaveDates: formattedLeaveDates,
        id: 0,
      });
      setIsRegisteredSuccessfully(true);
      setTimeout(() => {
        navigate({ to: `/srList` });
      }, 1500);
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="m-2">
      <div className=" mb-3 space-y-1">
        <div className="flex justify-between">
          <div>
            <h1 className="font-bold text-xl">
              Senior Resident Doctor Registration
            </h1>
            <h6 className="text-xs text-dashboard-text">
              Entry of Senior Resident Doctor Information
            </h6>
          </div>
          {/* Success Badge */}
          {isRegisteredSuccessfully && (
            <div className="bg-badge-am font-semibold text-xs text-badge-success p-2 rounded-md mb-4 flex  items-center space-x-2">
              <div>
                <img
                  src="/assets/images/success.png"
                  alt="Success Icon"
                  className="w-3 rounded-full"
                />
              </div>
              <div>Registration Successful!</div>
            </div>
          )}
        </div>
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
              leaveDates={leaveDates}
              setLeaveDates={setLeaveDates}
              handleSubmit={handleSubmit}
            />
          </div>
          {/* <div className="flex-1">
            <InfoCard />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default RegisterSR;
