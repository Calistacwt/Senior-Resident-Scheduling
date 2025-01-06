import { useEffect, useState } from "react";
import SeniorResidentForm from "../component/seniorResidentForm";
import { useNavigate } from "@tanstack/react-router";
import { registerSRInfo } from "@/services/registerSR";
import { format } from "date-fns";
import { LeaveDate } from "@/types/srList";

const RegisterSR = () => {
  const navigate = useNavigate();
  const [callDates, setCallDates] = useState([]);
  const [leaveDates, setLeaveDates] = useState<LeaveDate[]>([]);
  const [isRegisteredSuccessfully, setIsRegisteredSuccessfully] =
    useState(false); // Success state
  const [isRegisteredFailed, setIsRegisteredFailed] = useState(false); // Failed state
  const [fadeOutFailed, setFadeOutFailed] = useState(false); // State to trigger fade-out effect

  const [formData, setFormData] = useState({
    postingPeriod: { startDate: "", endDate: "" },
    name: "",
    mobile: "",
    email: "",
    MCR: "",
    noSession: "",
    remarks: "",
    callDates: "",
    leaveDates: [],
  });

  // Handle Form Submission
  const handleSubmit = async () => {
    try {
      const formattedCallDates = callDates.map((date) =>
        format(new Date(date), "yyyy-MM-dd")
      );

      const formattedLeaveDates = leaveDates.map((item) => ({
        date: format(new Date(item.date), "yyyy-MM-dd"),
        session: item.session,
      }));

      // Format posting period dates
      const formattedPostingPeriod = {
        startDate: format(
          new Date(formData.postingPeriod.startDate),
          "yyyy-MM-dd"
        ),
        endDate: format(new Date(formData.postingPeriod.endDate), "yyyy-MM-dd"),
      };

      await registerSRInfo({
        ...formData,
        postingPeriod: formattedPostingPeriod,
        callDates: formattedCallDates,
        leaveDates: formattedLeaveDates,
        id: "",
      });
      setIsRegisteredSuccessfully(true);
      setTimeout(() => {
        navigate({ to: `/srList` });
      }, 1500);
    } catch (error) {
      console.error("Registration failed", error);
      setIsRegisteredFailed(true);

      setFadeOutFailed(false);

      setTimeout(() => {
        setFadeOutFailed(true);
      }, 500);

      setTimeout(() => {
        navigate({ to: `/seniorResidentForm/` });
      }, 1500);
    }
  };

    useEffect(() => {
      if (fadeOutFailed) {
        setTimeout(() => {
          setIsRegisteredFailed(false);
        }, 1500);
      }
    }, [fadeOutFailed]);
  

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
          {isRegisteredFailed && (
            <div className="bg-badge-error font-semibold text-xs text-badge-errorText p-2 rounded-md mb-4 flex  items-center space-x-2">
              <div>
                <img
                  src="/assets/images/error.png"
                  alt="Error Icon"
                  className="w-3 rounded-full"
                />
              </div>
              <div>Registration Failed!</div>
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
              setCallDates={setCallDates}
              setLeaveDates={setLeaveDates}
              handleSubmit={handleSubmit}
              mode="register"
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
