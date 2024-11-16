// import Popup from "reactjs-popup";

const RegistrationForm = () => {
  return (
    <form action="">
      {/* max-w-lg mx-auto */}
      <div className="border bg-white p-1 lg:p-10">
        <div className="border bg-white  border-green-600">
          <h3 className="border font-bold text-md mb-3 2 border-red-600">
            Details of Senior Resident
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

              {/* <Popup
                trigger={
                  <button
                    type="button"
                    className="border rounded-md w-full shadow-md focus:border-indigo-500 p-1 text-left"
                  >
                    Select Date
                  </button>
                }
                position="right center"
                closeOnDocumentClick
                children={undefined}
              ></Popup> */}
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
                  src="./assets/images/avatar.svg"
                  alt="Senior Resident Icon"
                  className="w-10 h-10 rounded-full mr-5"
                />
                <input
                  className="border  rounded-md w-full  shadow-md  focus:border-indigo-500 p-1"
                  placeholder="Enter Senior Resident Name"
                ></input>
              </div>
            </div>

            {/* MCR */}
            <div className="flex mb-8">
              <div className="flex-1 space-y-2">
                <label
                  htmlFor="MCR"
                  className="text-sm font-medium text-updateSR-label"
                >
                  MCR
                </label>
                <input
                  className="border  rounded-md w-full  shadow-md  focus:border-indigo-500 p-1"
                  placeholder="Enter MCR"
                ></input>
              </div>

              {/*space in between */}
              <div className="flex-1"></div>

              {/* MobileNumber */}
              <div className="flex-1 space-y-2">
                <label
                  htmlFor="Mobile"
                  className="text-sm font-medium text-updateSR-label"
                >
                  Mobile
                </label>
                <input
                  className="border  rounded-md w-full  shadow-md  focus:border-indigo-500 p-1"
                  placeholder="Enter Mobile Number"
                ></input>
              </div>
            </div>

            {/* Email */}
            <div className="flex-1 space-y-2 mb-4">
              <label
                htmlFor="Email"
                className="text-sm font-medium text-updateSR-label"
              >
                Email
              </label>
              <input
                className="border  rounded-md w-full  shadow-md  focus:border-indigo-500 p-1"
                placeholder="Enter Email Address"
              ></input>
            </div>

            {/* Call Dates */}
            <div className="flex mb-8">
              <div className="flex-1 space-y-2 ">
                <label
                  htmlFor="CallDates"
                  className="text-sm font-medium text-updateSR-label"
                >
                  Call Dates
                </label>
                <select className="border text-updateSR-label rounded-md w-full  shadow-md  focus:border-indigo-500 p-1">
                  <option
                    disabled
                    selected
                    value=""
                    hidden
                    className="text-updateSR-placeholder"
                  >
                    Select Date
                  </option>
                  <option className="text-black">Room 11</option>
                  <option className="text-black">Room 12</option>
                  <option className="text-black">Room 13</option>
                </select>
              </div>

              {/*space in between */}
              <div className="flex-1"></div>
              {/* Leave */}
              <div className="flex-1 space-y-2 ">
                <label
                  htmlFor="SR Room"
                  className="text-sm font-medium text-updateSR-label"
                >
                  Leave
                </label>

                <select className="border text-updateSR-label rounded-md w-full  shadow-md  focus:border-indigo-500 p-1">
                  <option
                    disabled
                    selected
                    value=""
                    hidden
                    className="text-updateSR-placeholder"
                  >
                    Select Date
                  </option>
                  <option className="text-black">Room 11</option>
                  <option className="text-black">Room 12</option>
                  <option className="text-black">Room 13</option>
                </select>
              </div>
            </div>

            {/* DCD */}
            <div className="flex-1 space-y-2 mb-4">
              <label
                htmlFor="DCD"
                className="text-sm font-medium text-updateSR-label"
              >
                No. of DCD sessions after deducting leaves and workshop
              </label>
              <input
                className="border  rounded-md w-full  shadow-md  focus:border-indigo-500 p-1"
                placeholder="No. of sessions"
              ></input>
            </div>

            {/* Remarks */}
            <div className="space-y-2 mb-5">
              <label
                htmlFor="Remarks"
                className="text-sm font-medium text-updateSR-label"
              >
                Remarks
              </label>
              <textarea
                className="border  rounded-md w-full  shadow-md  focus:border-indigo-500 p-1"
                placeholder="Remarks"
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
      </div>
    </form>
  );
};
export default RegistrationForm;
