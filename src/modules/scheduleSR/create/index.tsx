// external library
import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

// types
import { srSchedule } from "@/types/dashboard";

// services
import { createSRSchedule, getSRSchedule } from "@/services/dashboard";
import { getSeniorDoctorData } from "@/services/seniorDoctorList";
import { getRoomData } from "@/services/room";

// component
import ScheduleSRForm from "../component/scheduleSRForm";
import Card from "../component/card";


const ScheduleSR = () => {
  const navigate = useNavigate();

  // state to store fetched clinic schedule
  const [scheduleData, setScheduleData] = useState([]);

  // state to store senior doctor data -- dropdown
  const [seniorDoctorData, setseniorDoctorData] = useState([]);

  // state to store room data --- dropdown
  const [roomData, setRoomData] = useState([]);
  
  // state to track success and failed badges
  const [isRegisteredSuccessfully, setIsRegisteredSuccessfully] = useState(false);
  const [isRegisteredFailed, setIsRegisteredFailed] = useState(false);

  // badge fade out
  const [fadeOutFailed, setFadeOutFailed] = useState(false);

  const [formData, setFormData] = useState<srSchedule>({
    id: 0,
    date: "",
    dcdScreener: "",
    activity: "",
    room: "",
    srRoom: "",
    session: "",
  });

  // handle form submission
  const handleSubmit = async () => {
    try {
       // API call the create function
      await createSRSchedule({
        ...formData,
        id: "",
      });
      setIsRegisteredSuccessfully(true);

      // redirect page
      setTimeout(() => {
        navigate({ to: `/` });
      }, 1500);
    } catch {
      setIsRegisteredFailed(true);

      // badge fade out
      setFadeOutFailed(false);
      setTimeout(() => {
        setFadeOutFailed(true);
      }, 500);

      // redirect page
      setTimeout(() => {
        navigate({ to: `/scheduleSR` });
      }, 1500);
    }
  };

  // badge fade out
  useEffect(() => {
    if (fadeOutFailed) {
      setTimeout(() => {
        setIsRegisteredFailed(false);
      }, 1500);
    }
  }, [fadeOutFailed]);

  // fetch all srSchedule
  useEffect(() => {
    const fetchSchedule = async () => {
      const data = await getSRSchedule();
      setScheduleData(data);
    };
    fetchSchedule();
  }, []);

  // fetch all senior doctor list
  useEffect(() => {
    const fetchSeniorDoctorData = async () => {
      const data = await getSeniorDoctorData();
      setseniorDoctorData(data);
    };

    fetchSeniorDoctorData();
  }, []);

  // fetch all room list
  useEffect(() => {
    const fetchRooms = async () => {
      const data = await getRoomData();
      setRoomData(data);
    };
    fetchRooms();
  }, []);

  return (
    <div>
      <div className=" mb-3 space-y-1">
        <div className="flex justify-between">
          <div>
            <h1 className="font-bold text-xl">
              Senior Resident Schedule Planner
            </h1>
            <h6 className="text-xs text-dashboard-text">
              Register Senior Resident Doctors Schedule
            </h6>
          </div>

          {/* success badge */}
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
          {/* failed badge */}
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
          <h3 className=" font-bold text-md mb-3 ">Senior Resident Schedule</h3>
          <hr className="border-1 border-background-hr" />
        </div>

        <div className="flex">
          <div className="flex-1 ">
            <ScheduleSRForm
              seniorDoctorData={seniorDoctorData}
              roomData = {roomData}
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
              mode="register"
            />
          </div>
          <div className="flex-2">
            <Card allSRscheduleData={scheduleData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleSR;
