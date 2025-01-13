import { useEffect, useState } from "react";
import SeniorDoctorForm from "../component/seniorDoctorForm";

import { useNavigate, useParams } from "@tanstack/react-router";
import {
  getSeniorDoctorDataById,
  updateSeniorDoctorInfo,
} from "@/services/seniorDoctorList";
import { seniorDoctorList } from "@/types/seniorDoctorList";

const UpdateSeniorDoctor = () => {
  const navigate = useNavigate();

  const [isUpdatedSuccessfully, setIsUpdatedSuccessfully] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    remarks: "",
  });

  const { id } = useParams({ from: "/seniorDoctorForm/$id/edit" });
  const [seniorDoctorData, setSeniorDoctorData] =
    useState<seniorDoctorList | null>(null);

  // Handle Form Submission
  const handleUpdate = async (updatedData: seniorDoctorList) => {
    try {
      // Call the update function
      await updateSeniorDoctorInfo(id, updatedData);
      setIsUpdatedSuccessfully(true);
      setTimeout(() => {
        navigate({ to: `/seniorDoctorList` });
      }, 1200);
    } catch (error) {
      console.error("Failed to update Senior Doctor data:", error);
    }
  };

  // fetch senior doctor by ID
  useEffect(() => {
    const fetchSRData = async () => {
      const data = await getSeniorDoctorDataById(id);
      setSeniorDoctorData(data);

      if (data) {
        setFormData({
          name: data.name || "",
          mobile: data.mobile || "",
          email: data.email || "",
          remarks: data.remarks || "",
        });
      }
    };

    fetchSRData();
  }, [id]);

  return (
    <div className="m-2">
      <div className="mb-3 space-y-1">
        <div className="flex justify-between">
          <div>
            <h1 className="font-bold text-xl">Senior Doctor Registration</h1>
            <h6 className="text-xs text-dashboard-text">
              Registration of DCD Senior Doctors Information for NC Clinics and
              SR Supervision
            </h6>
          </div>

          {/* Success Badge */}
          {isUpdatedSuccessfully && (
            <div className="bg-badge-am font-semibold text-xs text-badge-success p-2 rounded-md mb-4 flex  items-center space-x-2">
              <div>
                <img
                  src="/assets/images/success.png"
                  alt="Success Icon"
                  className="w-3 rounded-full"
                />
              </div>
              <div>Updated Successfully!</div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl mt-5">
        <div>
          <h3 className="font-bold text-md mb-3">
            Register Overseeing Senior Doctor
          </h3>
          <hr className="border-1 border-background-hr" />
        </div>

        <div>
          <div>
            <SeniorDoctorForm
              formData={formData}
              setFormData={setFormData}
              handleUpdate={handleUpdate}
              handleSubmit={handleUpdate}
              mode="edit"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSeniorDoctor;
