const UpdateSchedule = () => {
  return (
    <form action="">
      <div className="border bg-white p-2 lg:p-10  border-red-600 w-full">
        <h3 className="border font-bold text-md mb-3 2 border-red-600">
          Senior Resident Scheduling
        </h3>
        <hr className="border border-updateSR-hr" />

        <div className="mt-3 border border-red-600">
          {/* Posting Period */}
          <div className="space-y-2 mb-4">
            <label
              htmlFor="Posting Period"
              className="text-sm font-medium text-updateSR-label"
            >
              Posting Period
            </label>

            <select
              id="Posting Period"
              name="Posting Period"
              className="border rounded-md w-full  shadow-md  focus:border-indigo-500 p-1 "
            >
              --
              <option
                className="border border-black text-updateSR-label "
                disabled
                selected
                value=""
                hidden
              >
                Select Date
              </option>
              --
              <option
                value="01 July 2024 - 31 July 2024"
                className="text-black"
              >
                01 July 2024 - 31 July 2024
              </option>
            </select>
          </div>

          {/* Senior Resident */}
          <div className="space-y-2 mb-4">
            <label
              htmlFor="Senior Resident"
              className=" text-sm font-medium text-updateSR-label "
            >
              Senior Resident
            </label>
            <div className="flex items-center">
              <img
                src="images/SR_Icon.png"
                alt="Senior Resident Icon"
                className="w-10 h-10 rounded-full mr-5"
              />
              <select
                id="Senior Resident"
                name="Senior Resident"
                className="border rounded-md w-full  shadow-md  focus:border-indigo-500 p-1"
              >
                --
                <option
                  disabled
                  selected
                  value=""
                  hidden
                  className="text-updateSR-placeholder"
                >
                  Select Senior Resident
                </option>
                --
                <option className="text-black">Senior 1</option>
                <option className="text-black">Senior 2</option>
                <option className="text-black">Senior 3</option>
              </select>
            </div>
          </div>

          {/* Senior Doctor */}
          <div className="flex mb-8 border border-black">
            <div className="space-y-2">
              <label
                htmlFor="Senior Doctor"
                className="text-sm font-medium text-updateSR-label"
              >
                Senior Doctor
              </label>
              <select
                id="Senior Doctor"
                name="Senior Doctor"
                className="border  rounded-md w-full  shadow-md  focus:border-indigo-500 p-1"
              >
                --
                <option
                  disabled
                  selected
                  value=""
                  hidden
                  className="text-updateSR-placeholder"
                >
                  Select Senior Doctor
                </option>
                --
                <option className="text-black">Dr Rashimi</option>
                <option className="text-black">Dr Padimi</option>
                <option className="text-black">DR Sandra</option>
                <option className="text-black">DR Ellen Tay</option>
              </select>
            </div>

            {/* Session */}
            <div className=" space-y-2 ">
              <label
                htmlFor="Session"
                className="text-sm font-medium text-updateSR-label"
              >
                Session
              </label>
              <select
                id="Session"
                name="Session"
                className="border  rounded-md w-full  shadow-md  focus:border-indigo-500 p-1"
              >
                --
                <option
                  disabled
                  selected
                  value=""
                  hidden
                  className="text-updateSR-placeholder"
                >
                  Select Session
                </option>
                --
                <option className="text-black">Am</option>
                <option className="text-black">Pm</option>
              </select>
            </div>
          </div>

          {/* Available Room */}
          <div className="flex mb-8">
            <div className="flex-1 space-y-2 ">
              <label
                htmlFor="Available Room"
                className="text-sm font-medium text-updateSR-label"
              >
                Available Room
              </label>
              <select
                id="Available Room"
                name="Available Room"
                className="border  rounded-md w-full  shadow-md  focus:border-indigo-500 p-1"
              >
                --
                <option
                  disabled
                  selected
                  value=""
                  hidden
                  className="text-updateSR-placeholder"
                >
                  Select Room
                </option>
                --
                <option className="text-black">Room 11</option>
                <option className="text-black">Room 12</option>
                <option className="text-black">Room 13</option>
              </select>
            </div>

            {/*space in between */}
            {/* <div className="flex-1"></div> */}
            {/* SR Room */}
            <div className="flex-1 space-y-2 ">
              <label
                htmlFor="SR Room"
                className="text-sm font-medium text-updateSR-label"
              >
                SR Room
              </label>

              <select
                id="SR Room"
                name="SR Room"
                className="border  rounded-md w-full  shadow-md  focus:border-indigo-500 p-1"
              >
                <option
                  disabled
                  selected
                  value=""
                  hidden
                  className="text-updateSR-placeholder"
                >
                  Select SR Room
                </option>
                <option className="text-black">Room 11</option>
                <option className="text-black">Room 12</option>
                <option className="text-black">Room 13</option>
              </select>
            </div>
          </div>

          {/* Scheduled Date */}
          <div className="flex-1 space-y-2 mb-4">
            <label
              htmlFor="Scheduled Date"
              className="text-sm font-medium text-updateSR-label"
            >
              Scheduled Date
            </label>
            <select
              id="Scheduled Date"
              name="Scheduled Date"
              className="border  rounded-md w-full  shadow-md  focus:border-indigo-500 p-1"
            >
              <option
                disabled
                selected
                value=""
                hidden
                className="text-updateSR-placeholder"
              >
                Select Date
              </option>
              <option className="text-black">
                01 July 2024 - 31 July 2024
              </option>
            </select>
          </div>

          {/* Activity */}
          <div className="space-y-2 mb-5">
            <label className="text-sm font-medium text-updateSR-label">
              Activity
            </label>
            <textarea
              id="Activity"
              name="Activity"
              className="border  rounded-md w-full  shadow-md  focus:border-indigo-500 p-1"
              placeholder="Write down the activity"
            ></textarea>
          </div>

          {/* back button */}
          <div className="border border-yellow-400 flex justify-end space-x-4 mb-10">
            <button
              type="button"
              className="border border-updateSR-backBtnBorder rounded-sm shadow-md text-updateSR-textBackBtn p-1 w-20"
            >
              Back
            </button>

            {/* submit button */}

            <button
              type="button"
              // className="border  rounded-sm shadow-md bg-updateSR-bgSubmitBtn text-updateSR-textSubmitBtn p-1 w-20" //not done
              className="border  rounded-sm shadow-md bg-updateSR-bgSubmitBtnDone text-updateSR-textSubmitBtn p-1 w-20" //done
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <input type="submit" />
    </form>
  );
};
export default UpdateSchedule;
