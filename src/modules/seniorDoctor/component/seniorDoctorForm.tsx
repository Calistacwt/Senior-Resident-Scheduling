import "react-datepicker/dist/react-datepicker.css";
import "/src/styles/custom-calendar.css";
import { useNavigate } from "@tanstack/react-router";

const SeniorDoctorForm = ({ formData, setFormData, handleSubmit }: any) => {
  const navigate = useNavigate();

  const handleBack = async () => {
    navigate({ to: `/` });
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="w-full">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="mt-4 flex items-center space-x-4">
          <div>
            <img
              src="./assets/images/avatar.png"
              alt="Senior Resident Icon"
              className="w-11 rounded-full"
            />
          </div>

          <div className="flex flex-col space-y-2 w-full">
            <label className="text-xs font-medium text-form-label">
              Senior Doctor
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter Senior Doctor Name"
              className="border border-form-label rounded-md w-full text-xs p-2 placeholder:text-2xs placeholder-form-placeholder"
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col flex-1 space-y-2 ">
            <label className="text-xs font-medium text-form-label">
              Mobile
            </label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder="Enter Mobile Number"
              className="border border-form-label rounded-md w-full text-xs p-2 placeholder-form-placeholder placeholder:text-2xs"
            />
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <label className="text-xs font-medium text-form-label">Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter Email"
            className="border border-form-label rounded-md w-full text-xs p-2 placeholder-form-placeholder placeholder:text-2xs "
          />
        </div>

        <div className="flex flex-col space-y-2 w-full">
          <label className="text-xs font-medium text-form-label">Remarks</label>
          <input
            type="text"
            name="remarks"
            value={formData.remarks}
            onChange={handleInputChange}
            placeholder=""
            className="border border-form-label rounded-md w-full text-xs p-3 py-5  "
          />
        </div>

        {/* Button */}
        <div className="flex justify-end items-end space-x-4">
          {/* Back Button */}
          <button
            type="button"
            onClick={handleBack}
            className="bg-white border  text-black font-medium text-xs p-2 rounded-md px-3"
          >
            Back
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-sidebar-active  text-white font-medium text-xs p-2 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default SeniorDoctorForm;
