const UpdateSchedule = () => {
  return (
    <div className="w-full mt-8">
      <form className="space-y-4">
        {/* Posting Period */}
        <div className="space-y-2 mt-4">
          <label className="text-xs font-medium text-form-label">
            Posting Period
          </label>

          <select
            className="text-black text-2xs xl:text-xs border rounded-md w-full border-form-label focus:border-indigo-500 p-2.5"
            defaultValue=""
          >
            <option disabled value="" hidden className="text-form-placeholder">
              Select Date
            </option>
            <option className="text-black">01 July 2024 - 31 July 2024</option>
          </select>
        </div>

        {/* Senior Resident */}
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
              <option value="" hidden className="text-form-placeholder">
                Select Senior Resident
              </option>
              <option className="text-black">Senior 2</option>
            </select>
          </div>
        </div>

        {/* Senior Doctor */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col flex-1 mr-3 space-y-2">
            <label className="text-xs font-medium text-form-label">
              Senior Doctor
            </label>

            <select
              className="text-black text-2xs xl:text-xs border rounded-md w-full border-form-label focus:border-indigo-500 p-2.5"
              defaultValue=""
            >
              <option value="" hidden className="text-form-placeholder">
                Select Senior Doctor
              </option>
              <option className="text-black">Dr Christelle</option>
            </select>
          </div>

          {/* Session */}
          <div className="flex flex-col flex-1 space-y-2 ">
            <label className="text-xs font-medium text-form-label">
              Session
            </label>

            <select
              className="text-black text-2xs xl:text-xs border rounded-md w-full border-form-label focus:border-indigo-500 p-2.5"
              defaultValue=""
            >
              <option value="" hidden className="text-form-placeholder">
                Select Session
              </option>
              <option className="text-black">AM</option>
              <option className="text-black">PM</option>
            </select>
          </div>
        </div>

        {/* Available Room */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col flex-1 mr-3 space-y-2">
            <label className="text-xs font-medium text-form-label">
              Available Room
            </label>

            <select
              className="text-black text-2xs xl:text-xs border rounded-md w-full border-form-label focus:border-indigo-500 p-2.5"
              defaultValue=""
            >
              <option value="" hidden className="text-form-placeholder">
                Select Available Room
              </option>
              <option className="text-black">Senior 2</option>
            </select>
          </div>

          {/* SR Room */}
          <div className="flex flex-col flex-1 space-y-2 ">
            <label className="text-xs font-medium text-form-label">
              SR Room
            </label>

            <select
              className="text-black text-2xs xl:text-xs border rounded-md w-full border-form-label focus:border-indigo-500 p-2.5"
              defaultValue=""
            >
              <option value="" hidden className="text-form-placeholder">
                Select SR Room
              </option>
              <option className="text-black">Senior 2</option>
            </select>
          </div>
        </div>

        {/* Scheduled Date */}
        <div className="space-y-2 mt-4">
          <label className="text-xs font-medium text-form-label">
            Scheduled Date
          </label>

          <select
            className="text-black text-2xs xl:text-xs border rounded-md w-full border-form-label focus:border-indigo-500 p-2.5"
            defaultValue=""
          >
            <option value="" hidden className="text-form-placeholder">
              Select Date
            </option>
            <option className="text-black">Senior 2</option>
          </select>
        </div>

        {/* Activity */}
        <div className="flex flex-col space-y-2 w-full">
          <label className="text-xs font-medium text-form-label">
            Activity
          </label>
          <input
            type="text"
            placeholder="Write down the activity"
            className="border border-form-label rounded-md w-full p-3"
          />
        </div>

        {/* Btn */}
        <div className="flex justify-end items-end space-x-4">
          {/* Back Btn */}
          <button className="bg-white border  text-black font-medium text-xs p-2 rounded-md">
            Back
          </button>

          {/* Submit Btn */}
          <button className="bg-sidebar-active  text-white font-medium text-xs p-2 rounded-md">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default UpdateSchedule;
