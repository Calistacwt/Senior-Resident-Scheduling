import { useEffect, useState } from "react";
import SeniorResidentForm from "../component/seniorResidentForm";
import { getSRDataById } from "@/services/srList";
import { srList } from "@/types/srList";
import { useNavigate, useParams } from "@tanstack/react-router";
import { updateSRInfo } from "@/services/registerSR";

const UpdateSRInfo = () => {
  const navigate = useNavigate();
  const [isUpdatedSuccessfully, setIsUpdatedSuccessfully] = useState(false); // Success state

  const [formData, setFormData] = useState({
    postingPeriod: { startDate: new Date(), endDate: new Date() },
    name: "",
    mobile: "",
    email: "",
    MCR: "",
    noSession: "",
    remarks: "",
    callDates: [],
    leaveDates: [],
  });

  const { id } = useParams({ from: "/seniorResidentForm/$id/edit" });
  const [srData, setSrData] = useState<srList | null>(null);

  const handleUpdate = async (updatedData: srList) => {
    try {
      // Call the update function
      await updateSRInfo(id, updatedData);
      setIsUpdatedSuccessfully(true);
      setTimeout(() => {
        navigate({ to: `/srList` });
      }, 1200);
    } catch (error) {
      console.error("Failed to update SR data:", error);
    }
  };

  useEffect(() => {
    const fetchSRData = async () => {
      const data = await getSRDataById(id);
      setSrData(data);

      if (data) {
        const callDates = Array.isArray(data.callDates) ? data.callDates : [];
        const leaveDates = Array.isArray(data.leaveDates)
          ? data.leaveDates
          : [];

        setFormData({
          postingPeriod: {
            startDate: new Date(data.postingPeriod.startDate),
            endDate: new Date(data.postingPeriod.endDate),
          },
          name: data.name || "",
          mobile: data.mobile || "",
          email: data.email || "",
          MCR: data.MCR || "",
          noSession: data.noSession || "",
          remarks: data.remarks || "",
          callDates: callDates,
          leaveDates: leaveDates,
        });
      }
    };

    fetchSRData();
  }, [id]);

  return (
    <div>
      <div className=" mb-3 space-y-1">
        <div className="flex justify-between">
          <div>
            <h1 className="font-bold text-xl">
              Senior Resident Doctor Profile Update
            </h1>
            <h6 className="text-xs text-dashboard-text">
              Update the information of Senior Resident Doctors
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

      <div className="bg-white  p-8 rounded-xl mt-5">
        <div>
          <h3 className=" font-bold text-md mb-3 ">
            Details of Senior Resident Doctor
          </h3>
          <hr className="border-1 border-background-hr" />
        </div>

        <div className="flex space-x-14">
          <div className="flex-1 ">
            <SeniorResidentForm
              formData={formData}
              setFormData={setFormData}
              postingPeriod={formData.postingPeriod}
              handleUpdate={handleUpdate}
              handleSubmit={handleUpdate}
              mode="edit"
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

export default UpdateSRInfo;
