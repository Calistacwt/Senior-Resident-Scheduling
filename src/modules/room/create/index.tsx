import { useNavigate } from "@tanstack/react-router";
import RoomForm from "../component/roomForm";
import { useState } from "react";
import { registerRoom } from "@/services/room";

const Room = () => {
  const navigate = useNavigate();
  const [isRegisteredSuccessfully, setIsRegisteredSuccessfully] =
    useState(false); // Success state

  const [formData, setFormData] = useState({
    type: "",
    number: "",
    floor: "",
    activity: "",
  });

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await registerRoom({
        ...formData,
        id: 0,
      });
      setIsRegisteredSuccessfully(true); // Set success state
      setTimeout(() => {
        navigate({ to: `/roomForm` });
      }, 1500); // Redirect after showing success badge
    } catch (error) {
      console.error("Registration failed", error);
    }
  };
  return (
    <div>
      <div className=" mb-3 space-y-1">
        <h1 className="font-bold text-xl">Room Registration</h1>
        <h6 className="text-xs text-dashboard-text">Entry of New Room</h6>
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
      <div className="bg-white  p-8 rounded-xl mt-5">
        <div>
          <h3 className=" font-bold text-md mb-3 ">Register New Room</h3>
          <hr className="border-1 border-background-hr" />
        </div>

        <div>
          <div>
            <RoomForm
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

export default Room;
