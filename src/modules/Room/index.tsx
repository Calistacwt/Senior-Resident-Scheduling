import RoomForm from "./component/room";

const Room = () => {
  return (
    <div>
      <div className=" mb-3 space-y-1">
        <h1 className="font-bold text-xl">Register new room</h1>
        <h6 className="text-xs text-dashboard-text">
          A room form designed for nurses to manage room-related tasks.
        </h6>
      </div>

      <div className="bg-white  p-8 rounded-xl mt-5">
        <div>
          <h3 className=" font-bold text-md mb-3 ">Register new room</h3>
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
