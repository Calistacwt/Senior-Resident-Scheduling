const InfoCard = () => {
  return (
    <div className="border bg-white p-2 lg:p-10  border-red-600">
      <div className="bg-gray-100 p-2 border border-green-600">
        <div className="flex justify-between mb-3">
          <div className="box-content h-30 w-40 p-2">
            <img
              src="./assets/images/KKHLogoPNG.svg"
              className="object-fit-contain"
            ></img>
          </div>
          <div className="p-2 content-center">
            <h3 className="font-bold text-md mb-3 2">
              Senior Resident Details
            </h3>
          </div>
          {/* <div className="p-2">Flex item</div> */}
        </div>

        <hr className="border border-updateSR-hr" />

        <div className="mt-3 text-sm font-medium">
          <p>Posting Period</p>
          <p>-</p>

          <div className="flex justify-between mb-3 ">
            <p className=" flex-1 text-start">Senior Resident</p>
            <p className=" flex-1 text-start content-center">MCR</p>
            <p className="flex-1 text-start content-center">Mobile</p>
            <p className="flex-1 text-start content-center">Email</p>
          </div>

          <div className="flex justify-between mb-3">
            <p className="flex-1 text-start">-</p>
            <p className="flex-1 text-start">-</p>
            <p className="flex-1 text-start">-</p>
            <p className="flex-1 text-start">-</p>
          </div>

          <p>Call Dates</p>
          <p>-</p>
          <p>Leave</p>
          <p>-</p>
          <p>No of DCD sessions after deducting leave and workshop</p>
          <p>-</p>
          <p>Remarks</p>
          <p>-</p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
