const RegisterForm = () => {
  return (
    <div className="w-full">
      <form className="space-y-4">
        <div className="space-y-2 mt-4">
          <label className="text-xs font-medium text-form-label">
            Posting Period
          </label>

          <select
            className="text-black text-2xs xl:text-xs border rounded-md w-full border-form-label focus:border-indigo-500 p-2.5"
            defaultValue="" // Set the initial value here
          >
            <option disabled value="" hidden className="text-form-placeholder">
              Select Date
            </option>
            <option className="text-black">01 July 2024 - 31 July 2024</option>
          </select>
        </div>

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
              Senior Resident
            </label>

            <select
              className="text-black text-2xs xl:text-xs border rounded-md w-full border-form-label focus:border-indigo-500 p-2.5"
              defaultValue=""
            >
              <option
                disabled
                value=""
                hidden
                className="text-form-placeholder"
              >
                Select Senior Resident
              </option>
              <option className="text-black">Senior 2</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col flex-1 mr-3 space-y-2">
            <label className="text-xs font-medium text-form-label">MCR</label>
            <input
              type="text"
              placeholder="Enter MCR"
              className="border border-form-label rounded-md w-full text-xs p-2 "
            />
          </div>

          <div className="flex flex-col flex-1 space-y-2 ">
            <label className="text-xs font-medium text-form-label">
              Mobile
            </label>
            <input
              type="text"
              placeholder="Enter Mobile Number"
              className="border border-form-label rounded-md w-full text-xs p-2 "
            />
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <label className="text-xs font-medium text-form-label">Email</label>
          <input
            type="text"
            placeholder="Enter Email"
            className="border border-form-label rounded-md w-full text-xs p-2 "
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col flex-1 mr-3 space-y-2 ">
            <label className="text-xs font-medium text-form-label">
              Call Dates
            </label>
            <select className="text-black text-2xs xl:text-xs border rounded-md w-full border-form-label focus:border-indigo-500 p-2.5">
              <option
                disabled
                selected
                value=""
                hidden
                className="text-form-placeholder"
              >
                Select Senior Doctor
              </option>
              <option>Senior 1</option>
              <option>Senior 2</option>
            </select>
          </div>

          <div className="flex flex-col flex-1 space-y-2 ">
            <label className="text-xs font-medium text-form-label">Leave</label>

            <select className="text-black text-2xs xl:text-xs border rounded-md w-full border-form-label focus:border-indigo-500 p-2.5">
              <option
                disabled
                selected
                value=""
                hidden
                className="text-form-placeholder"
              >
                Select Date
              </option>
              <option>Room 17</option>
              <option>Room 18</option>
            </select>
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <label className="text-xs font-medium text-form-label">
            No. of DCD sessions after deducting leaves and workshop
          </label>
          <input
            type="text"
            placeholder="No. of sessions"
            className="border border-form-label rounded-md w-full text-xs p-2 "
          />
        </div>

        <div className="flex flex-col space-y-2 w-full">
          <label className="text-xs font-medium text-form-label">Remarks</label>
          <input
            type="text"
            placeholder=""
            className="border border-form-label rounded-md w-full text-xs p-3 py-5  "
          />
        </div>

        <div className="flex justify-end items-end space-x-4">
          <button className="bg-white border  text-black font-medium text-xs p-2 rounded-md px-3">
            Back
          </button>

          <button className="bg-sidebar-active  text-white font-medium text-xs p-2 rounded-md">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default RegisterForm;
