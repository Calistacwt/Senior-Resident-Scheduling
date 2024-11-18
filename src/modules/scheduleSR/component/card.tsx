const Card = () => {
  return (
    <div className="bg-background rounded-lg mt-10 p-3">
      <div className="">
        <img
          src="./assets/images/KKHLogo_transparent.svg"
          alt="KKH logo"
          className="w-36"
        />
      </div>

      <hr className="border-2 border-dashboard-active" />

      <div className="mt-3">
        <div className="flex space-x-6 p-3">
          <div className="flex space-x-5  mt-2">
            <div>
              <img
                src="./assets/images/calenderIcon.svg"
                alt="calenderIcon"
                className="w-6"
              />
            </div>
            <div className="font-bold text-xs xl:text-sm">1 July, 2024</div>
          </div>

          <div className="flex flex-col space-y-7  ">
            <div className="flex justify-center items-center space-x-4">
              <div className=" bg-badge-am rounded-2xl text-badge-sessionText flex items-center px-2 p-2 text-2xs xl:text-xs">
                <p className="font-semibold">AM Session</p>
              </div>

              <div>
                <p className="font-semibold text-xs xl:text-sm">Dr Rashmi</p>
                <p className="font-medium text-card-text text-2xs xl:text-xs">
                  Observe triage clinic
                </p>
              </div>

              <div className=" bg-dashboard-room text-white font-semibold flex justify-center items-center rounded-md p-1 px-2 text-2xs xl:text-xs">
                <p>Rm 17</p>
              </div>
            </div>

            <div className="flex justify-center items-center space-x-4">
              <div className=" bg-badge-pm rounded-2xl text-badge-sessionText flex items-center px-2 p-2 text-2xs xl:text-xs">
                <p className="font-semibold">PM Session</p>
              </div>

              <div>
                <p className="font-semibold text-xs xl:text-sm">Dr Rashmi</p>
                <p className="font-medium text-card-text text-2xs xl:text-xs">
                  Observe triage clinic
                </p>
              </div>

              <div className=" bg-dashboard-room text-white font-semibold flex justify-center items-center rounded-md p-1 px-2 text-2xs xl:text-xs">
                <p>Rm 25</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="border border-form-hr" />

      <div className="mt-3">
        <div className="flex space-x-6 p-3">
          <div className="flex space-x-5  mt-2">
            <div>
              <img
                src="./assets/images/calenderIcon.svg"
                alt="calenderIcon"
                className="w-6"
              />
            </div>
            <div className="font-bold text-xs xl:text-sm">2 July, 2024</div>
          </div>

          <div className="flex flex-col space-y-7  ">
            <div className="flex justify-center items-center space-x-4">
              <div className=" bg-badge-am rounded-2xl text-badge-sessionText flex items-center px-2 p-2 text-2xs xl:text-xs">
                <p className="font-semibold">AM Session</p>
              </div>

              <div>
                <p className="font-semibold text-xs xl:text-sm">Dr Rashmi</p>
                <p className="font-medium text-card-text text-2xs xl:text-xs">
                  Observe triage clinic
                </p>
              </div>

              <div className=" bg-dashboard-room text-white font-semibold flex justify-center items-center rounded-md p-1 px-2 text-2xs xl:text-xs">
                <p>Rm 17</p>
              </div>
            </div>

            <div className="flex justify-center items-center space-x-4">
              <div className=" bg-badge-pm rounded-2xl text-badge-sessionText flex items-center px-2 p-2 text-2xs xl:text-xs">
                <p className="font-semibold">PM Session</p>
              </div>

              <div>
                <p className="font-semibold text-xs xl:text-sm">Dr Rashmi</p>
                <p className="font-medium text-card-text text-2xs xl:text-xs">
                  Observe triage clinic
                </p>
              </div>

              <div className=" bg-dashboard-room text-white font-semibold flex justify-center items-center rounded-md p-1 px-2 text-2xs xl:text-xs">
                <p>Rm 25</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="border border-form-hr" />

      <div className="mt-3">
        <div className="flex space-x-6 p-3">
          <div className="flex space-x-5 mt-2">
            <div className="">
              <img
                src="./assets/images/calenderIcon.svg"
                alt="calenderIcon"
                className="w-6"
              />
            </div>
            <div className="font-bold text-xs xl:text-sm">3 July, 2024</div>
          </div>

          <div className="flex flex-col space-y-7  ">
            <div className="flex justify-center items-center space-x-4">
              <div className=" bg-badge-am rounded-2xl text-badge-sessionText flex items-center px-2 p-2 text-2xs xl:text-xs">
                <p className="font-semibold">AM Session</p>
              </div>

              <div>
                <p className="font-semibold text-xs xl:text-sm">Dr Rashmi</p>
                <p className="font-medium text-card-text text-2xs xl:text-xs">
                  Observe triage clinic
                </p>
              </div>

              <div className=" bg-dashboard-room text-white font-semibold flex justify-center items-center rounded-md p-1 px-2 text-2xs xl:text-xs">
                <p>Rm 17</p>
              </div>
            </div>

            <div className="flex justify-center items-center space-x-4">
              <div className=" bg-badge-pm rounded-2xl text-badge-sessionText flex items-center px-2 p-2 text-2xs xl:text-xs">
                <p className="font-semibold">PM Session</p>
              </div>

              <div>
                <p className="font-semibold text-xs xl:text-sm">Dr Rashmi</p>
                <p className="font-medium text-card-text text-2xs xl:text-xs">
                  Observe triage clinic
                </p>
              </div>

              <div className=" bg-dashboard-room text-white font-semibold flex justify-center items-center rounded-md p-1 px-2 text-2xs xl:text-xs">
                <p>Rm 25</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="border border-form-hr" />
    </div>
  );
};

export default Card;
