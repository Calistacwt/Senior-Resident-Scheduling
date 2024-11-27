const InfoCard = ({ formData }: any) => {
  const { seniorResident, mcr, mobile, email, dcd, remarks, postingPeriod } =
    formData;
  return (
    <div className="bg-background rounded-lg mt-10 p-6">
      <div className="flex justify-between items-center space-x-5">
        <div>
          <img
            src="./assets/images/KKHLogo_transparent.svg"
            alt="KKH logo"
            className="w-36"
          />
        </div>

        <div>
          <h3 className="font-semibold text-sm">Senior Resident Details</h3>
        </div>
      </div>

      <hr className="border border-sidebar-border" />

      <div className="flex flex-col space-y-6 p-4">
        <div className="flex-1 space-y-2">
          <label className="text-card-text font-semibold text-xs">
            Posting Period
          </label>
          <p className="font-semibold text-xs">06 May 2024 - 02 June 2024</p>
        </div>

        <div className="flex justify-between flex-col xl:flex-row space-y-5 xl:space-y-0  ">
          <div className="space-y-2 ">
            <label className="text-card-text font-semibold text-xs">
              Senior Resident
            </label>
            <p className="font-semibold text-xs">{seniorResident || "-"}</p>
          </div>
          <div className="space-y-2">
            <label className="text-card-text font-semibold text-xs">MCR</label>
            <p className="font-semibold text-xs">{mcr || "-"}</p>
          </div>

          <div className="space-y-2">
            <label className="text-card-text font-semibold text-xs">
              Mobile
            </label>
            <p className="font-semibold text-xs">{mobile || "-"}</p>
          </div>

          <div className="space-y-2">
            <label className="text-card-text font-semibold text-xs">
              Email
            </label>
            <p className="font-semibold text-xs">{email || "-"}</p>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          <label className="text-card-text font-semibold text-xs">
            Call Dates
          </label>
          <p className="font-semibold text-xs">06 May 2024 - 02 June 2024</p>
        </div>

        <div className="flex-1 space-y-2">
          <label className="text-card-text font-semibold text-xs">Leaves</label>
          <p className="font-semibold text-xs">06 May 2024 - 02 June 2024</p>
        </div>

        <div className="flex-1 space-y-2">
          <label className="text-card-text font-semibold text-xs">
            No of DCD sessions after deducting leave and workshop
          </label>
          <p className="font-semibold text-xs">{dcd || "-"}</p>
        </div>

        <div className="flex-1  space-y-2">
          <label className="text-card-text font-semibold text-xs">
            Remarks
          </label>
          <p className="font-semibold text-xs">{remarks || "-"}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
