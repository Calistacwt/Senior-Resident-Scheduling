import RoomForm from "../component/roomForm";

const Room = () => {
  return (
    <div>
      <div className=" mb-3 space-y-1">
        <h1 className="font-bold text-xl">Room Registration</h1>
        <h6 className="text-xs text-dashboard-text">Entry of New Room</h6>
      </div>

      <div className="bg-white  p-8 rounded-xl mt-5">
        <div>
          <h3 className=" font-bold text-md mb-3 ">Register New Room</h3>
          <hr className="border-1 border-background-hr" />
        </div>

        <div>
          <div>
            <RoomForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
