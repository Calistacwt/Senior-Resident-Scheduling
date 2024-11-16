const card = () => {
  const pmRoom = "-"; // Replace with dynamic room value as needed

  return (
    <div className="bg-background w-full p-4 rounded-sm">
      <div>
        <img
          src="./assets/images/KKHLogo_transparent.svg"
          alt="KKH logo"
          className="w-36"
        />
      </div>

      <hr className="border-2 border-dashboard-active" />

      <div className="mt-3 ">
        <div className="flex space-x-6 p-3">
          <div className="flex space-x-5 justify-center mt-2">
            <div>
              <img
                src="./assets/images/calenderIcon.svg"
                alt="calenderIcon"
                className="w-6"
              />
            </div>
            <div className="font-bold">1 July, 2024</div>
          </div>

          <div className="flex flex-col space-y-7">
            {/* AM Session */}
            <div className="flex justify-center items-center space-x-4">
              <div className="bg-badge-am rounded-2xl text-badge-sessionText flex items-center px-2 p-2">
                <p className="font-semibold text-xs">AM Session</p>
              </div>

              <div>
                <p className="font-semibold text-sm">Dr Rashmi</p>
                <p className="font-medium text-card-text text-xs">
                  Observe triage clinic
                </p>
              </div>

              <div className="bg-dashboard-room text-white font-semibold flex justify-center items-center rounded-md p-1 px-2 text-sm">
                <p>Rm 17</p>
              </div>
            </div>

            {/* PM Session */}
            <div
              className={`flex ${
                pmRoom === "-"
                  ? "justify-center space-x-4"
                  : "items-center space-x-4"
              }`}
            >
              <div className="bg-badge-pm rounded-2xl text-badge-sessionText flex items-center px-2 p-2">
                <p className="font-semibold text-xs">PM Session</p>
              </div>

              {pmRoom === "-" ? (
                <div className="flex space-x-9">
                  {/* AVAILABLE SLOT styling */}
                  <div className="bg-form-availSlotBg text-form-availSlotColor flex justify-center items-center px-2">
                    <p className="font-medium text-2xs">AVAILABLE SLOT</p>
                  </div>

                  {/* Placeholder for empty room */}
                  <div className="bg-dashboard-room text-white font-semibold flex justify-center items-center rounded-md p-1 px-6 text-sm">
                    <p>-</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-semibold text-sm">Dr Rashmi</p>
                    <p className="font-medium text-card-text text-xs">
                      Observe triage clinic
                    </p>
                  </div>

                  <div className="bg-dashboard-room text-white font-semibold flex justify-center items-center rounded-md p-1 px-2 text-sm">
                    <p>{pmRoom}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <hr className="border border-form-linehr" />
    </div>
  );
};

export default card;
