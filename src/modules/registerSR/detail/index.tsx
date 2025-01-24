import { useEffect, useState } from "react";
import { getSRDataById } from "@/services/srList";
import { srList } from "@/types/srList";
import SeniorResidentDetails from "../component/seniorResidentDetails";
import { useParams } from "@tanstack/react-router";

const DetailsSRInfo = () => {
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

  const { id } = useParams({ from: "/seniorResidentDetails/$id/detail" });
  const [srData, setSrData] = useState<srList | null>(null);

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
              Senior Resident Doctor Profile Details
            </h1>
            <h6 className="text-xs text-dashboard-text">
              Detailed information of Senior Resident Doctors
            </h6>
          </div>
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
            <SeniorResidentDetails
              formData={formData}
              setFormData={setFormData}
              postingPeriod={formData.postingPeriod}
              SRData={srData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsSRInfo;
