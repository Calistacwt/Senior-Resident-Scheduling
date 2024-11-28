import { useNavigate } from "@tanstack/react-router";
import ApprovedDoctorForm from "../component/approvedDoctorForm";
import { useState } from "react";
import { registerApprovedDocotrInfo } from "@/services/approvedDrList";

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
    e.preventDefault();

    try {
      await registerApprovedDocotrInfo({
        ...formData,
      });
      setIsRegisteredSuccessfully(true); // Set success state
      setTimeout(() => {
        navigate({ to: `/approvedDoctor` });
      }, 1500); // Redirect after showing success badge
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div>
      <div className=" mb-3 space-y-1">
        <h1 className="font-bold text-xl">Senior Doctor Registration</h1>
        <h6 className="text-xs text-dashboard-text">
          Entry of DCD Senior Doctor Information who oversee NC clinics and
          supervise SRs
        </h6>
      </div>

      {/* Success Badge */}
      {isRegisteredSuccessfully && (
        <div className="bg-badge-am text-black p-2 rounded-md mb-4">
          Registration Successful!
        </div>
      )}

      <div className="bg-white  p-8 rounded-xl mt-5">
        <div>
          <h3 className=" font-bold text-md mb-3 ">Register Senior Doctor</h3>
          <hr className="border-1 border-background-hr" />
        </div>

        <div>
          <div>
            <ApprovedDoctorForm
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterApprovedDoctor;
