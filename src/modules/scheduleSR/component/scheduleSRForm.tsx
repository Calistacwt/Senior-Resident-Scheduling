// external library
import { useNavigate } from "@tanstack/react-router";

// external UI component and icons
import { Dropdown } from "flowbite-react";
import DatePicker from "react-multi-date-picker";

// styles
import "/src/styles/custom-calendar.css";
import "/src/styles/custom-dropdown.css";

// format
import { format } from "date-fns";

// types
import { srSchedule } from "@/types/dashboard";
import { seniorDoctorList } from "@/types/seniorDoctorList";
import { roomList } from "@/types/roomList";
import { useEffect, useState } from "react";

interface ScheduleSRFormProps {
  seniorDoctorData: seniorDoctorList[];
  roomData: roomList[];
  formData: srSchedule;
  setFormData: React.Dispatch<React.SetStateAction<srSchedule>>;
  handleSubmit: (formData: srSchedule) => void;
  handleUpdate?: (formData: srSchedule) => void;
  mode: "register" | "edit";
}
const ScheduleSRForm: React.FC<ScheduleSRFormProps> = ({
  seniorDoctorData,
  roomData,
  formData,
  setFormData,
  handleSubmit,
  handleUpdate,
  mode,
}) => {
  const navigate = useNavigate();

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date: any) => {
    setFormData({ ...formData, date: format(date, "yyyy-MM-dd") });
  };

  const handleSessionChange = (session: string) => {
    setFormData({ ...formData, session });
  };

  const handleDoctorSelect = (doctor: seniorDoctorList) => {
    setFormData({ ...formData, dcdScreener: doctor.name });
  };

  const handleRoomSelect = (room: roomList) => {
    setFormData({ ...formData, room: room.roomNumber });
  };

  const handleSRRoomSelect = (srRoom: roomList) => {
    setFormData({ ...formData, srRoom: srRoom.roomNumber });
  };

  const handleBack = async () => {
    navigate({ to: `/` });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "edit" && typeof handleUpdate === "function") {
      handleUpdate(formData);
    } else if (mode === "register" && typeof handleSubmit === "function") {
      handleSubmit(formData);
    }
  };
 
  useEffect(() => {
    if (mode === "register") {
      const allFieldsFilled =
        formData.date
      setIsSubmitDisabled(!allFieldsFilled);
    } else {
      setIsSubmitDisabled(false);
    }
  }, [formData, mode]);

  return (
    <div className="w-full">
      <form className="space-y-4" onSubmit={handleFormSubmit}>
        <div className="flex space-x-3 items-center mt-6">
          <div className="flex flex-col flex-1 space-y-2">
            <label className="text-xs font-medium text-form-label ">
              Scheduled Date <span className="text-red-500 text-xs">*</span>
            </label>

            <DatePicker
              value={formData.date}
              onChange={handleDateChange}
              sort
              placeholder="Scheduled Date"
              inputClass="custom-placeholder cursor-pointer"
            />
          </div>

          <div className="flex flex-1 flex-col space-y-2 schedule-dropdown-button ">
            <label className="text-xs font-medium text-form-label">
              Session
            </label>

            <Dropdown
              label={
                <span className="text-2xs text-black">
                  {formData.session || "Select Session"}
                </span>
              }
              size="xs"
              color="gray" // arrow
              className=" text-2xs border text-black border-form-label transition-none "
            >
              <Dropdown.Item
                className="text-2xs p-2 hover:bg-gray-200 custom-dropdown-item"
                onClick={() => handleSessionChange("AM")}
              >
                AM
              </Dropdown.Item>
              <Dropdown.Item
                className="text-2xs p-2 hover:bg-gray-200 custom-dropdown-item"
                onClick={() => handleSessionChange("PM")}
              >
                PM
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>

        <div className="flex space-x-3 items-center mt-6">
          <div className="flex flex-col flex-1 space-y-2 schedule-dropdown-button">
            <label className="text-xs font-medium text-form-label">
              Senior Doctor
            </label>

            <Dropdown
              label={
                <span className="text-2xs text-black">
                  {formData.dcdScreener || "Select Senior Doctor"}
                </span>
              }
              size="sm"
              color="gray"
              className="text-2xs border text-black border-form-label transition-none"
            >
              <div className="max-h-36 overflow-y-auto">
                {seniorDoctorData.map((doctor: any) => (
                  <Dropdown.Item
                    key={doctor.id}
                    className="text-2xs p-2 hover:bg-gray-200"
                    onClick={() => handleDoctorSelect(doctor)}
                  >
                    {doctor.name}
                  </Dropdown.Item>
                ))}
              </div>
            </Dropdown>
          </div>

          <div className="flex flex-1 flex-col space-y-2 schedule-dropdown-button  ">
            <label className="text-xs font-medium text-form-label">
              Room 
            </label>

            <Dropdown
              label={
                <span className="text-2xs text-black">
                  {formData.room || "Select Room"}
                </span>
              }
              size="sm"
              color="gray"
              className="text-2xs border text-black border-form-label transition-none"
            >
              <div className="max-h-36 overflow-y-auto">
                {roomData.map((room: any) => (
                  <Dropdown.Item
                    key={room.id}
                    className="text-2xs p-2 hover:bg-gray-200 custom-dropdown-item"
                    onClick={() => handleRoomSelect(room)}
                  >
                    {room.roomNumber}
                  </Dropdown.Item>
                ))}
              </div>
            </Dropdown>
          </div>
        </div>

        <div className="flex flex-1 flex-col space-y-2 schedule-dropdown-button  ">
          <label className="text-xs font-medium text-form-label">
            SR Room 
          </label>

          <Dropdown
            label={
              <span className="text-2xs text-black">
                {formData.srRoom || "Select SR Room"}
              </span>
            }
            size="sm"
            color="gray"
            className="text-2xs border text-black border-form-label transition-none"
          >
            <div className="max-h-36 overflow-y-auto">
              {roomData.map((srRoom: any) => (
                <Dropdown.Item
                  key={srRoom.id}
                  className="text-2xs p-2 hover:bg-gray-200 custom-dropdown-item"
                  onClick={() => handleSRRoomSelect(srRoom)}
                >
                  {srRoom.roomNumber}
                </Dropdown.Item>
              ))}
            </div>
          </Dropdown>
        </div>

        <div className="flex flex-col space-y-2 w-full">
          <label className="text-xs font-medium text-form-label">
            Activity
          </label>
          <input
            type="text"
            name="activity"
            value={formData.activity}
            onChange={handleInputChange}
            placeholder=""
            className="border border-form-label rounded-md w-full p-3 py-5 placeholder:text-2xs text-xs  "
          />
        </div>

        <div className="flex justify-end items-end space-x-4">
          <button
            type="button"
            className="bg-white border  text-black font-medium text-xs p-2 rounded-md"
            onClick={handleBack}
          >
            Back
          </button>

          <button
            className={`${
              isSubmitDisabled
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-sidebar-active"
            } text-white font-medium text-xs p-2 rounded-md`}
            type="submit"
            disabled={isSubmitDisabled}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default ScheduleSRForm;
