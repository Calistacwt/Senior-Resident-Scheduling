const RoomForm = () => {
  return (
    <div className="w-full">
      <form className="space-y-4">
        {/* Room Type */}
        <div className="space-y-2 mt-4">
          <label className="text-xs font-medium text-form-label">
            Room Type
          </label>

          <select
            className="text-black text-2xs xl:text-xs border rounded-md w-full border-form-label focus:border-indigo-500 p-2.5"
            defaultValue=""
          >
            <option disabled value="" hidden className="text-form-placeholder">
              Select type of room
            </option>
            <option className="text-black">01 July 2024 - 31 July 2024</option>
          </select>
        </div>

        {/* Room Number */}
        <div className="mt-4 flex items-center space-x-4">
          <div className="flex flex-col space-y-2 w-full">
            <label className="text-xs font-medium text-form-label">
              Room Number
            </label>

            <select
              className="text-black text-2xs xl:text-xs border rounded-md w-full border-form-label focus:border-indigo-500 p-2.5"
              defaultValue=""
            >
              <option value="" hidden className="text-form-placeholder">
                Select Room
              </option>
              <option className="text-black">Senior 2</option>
            </select>
          </div>
        </div>

        {/* Floor Number */}
        <div className="space-y-2 mt-4">
          <label className="text-xs font-medium text-form-label">
            Floor Number
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
            placeholder=""
            className="border border-form-label rounded-md w-full p-3  "
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
export default RoomForm;
