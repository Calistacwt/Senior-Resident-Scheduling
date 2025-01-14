import { useNavigate } from "@tanstack/react-router";
import SeniorDoctorForm from "../component/seniorDoctorForm";
import { useState } from "react";
import { registerSeniorDoctorInfo } from "@/services/seniorDoctorList";

const RegisterApprovedDoctor = () => {
  const navigate = useNavigate();
  const [isRegisteredSuccessfully, setIsRegisteredSuccessfully] =
    useState(false); // Success state

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    remarks: "",
  });

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      await registerSeniorDoctorInfo({
        ...formData,
        id: 0,
      });
      setIsRegisteredSuccessfully(true); // Set success state
      setTimeout(() => {
        navigate({ to: `/seniorDoctorList` });
      }, 1500); // Redirect after showing success badge
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="m-2">
      <div className=" mb-3 space-y-1">
        <div className="flex justify-between">
          <div>
            <h1 className="font-bold text-xl">Senior Doctor Registration</h1>
            <h6 className="text-xs text-dashboard-text">
              Registration of DCD Senior Doctors Information for NC Clinics and
              SR Supervision
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
            Register Overseeing Senior Doctor
          </h3>
          <hr className="border-1 border-background-hr" />
        </div>

        <div>
          <div>
            <SeniorDoctorForm
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
              mode="register"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterApprovedDoctor;
