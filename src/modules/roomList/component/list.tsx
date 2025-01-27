import { roomList } from "@/types/roomList";
import { FaTrash } from "react-icons/fa";
import { Dropdown } from "flowbite-react";
import "/src/styles/custom-dropdown.css";

interface SeniorDoctorProps {
  roomData: roomList[];
  onDelete: (id: number) => void;
}

const List: React.FC<SeniorDoctorProps> = ({ roomData, onDelete }) => {

  const sortedRoomData = [...roomData].sort((a, b) => b.id - a.id);

  
  return (
    <div className="bg-background">
      <table className="w-full bg-white mt-3">
        <thead className="text-left bg-background">
          <tr>
            <th className="gap-3 px-4 py-3 text-2xs font-semibold w-1/2 text-form-text">
              ID
            </th>
            <th className="gap-3 px-4 py-3 text-2xs font-semibold w-1/2 text-form-text">
              ROOM NUMBER
            </th>
            <th className="gap-3 px-4 py-3 text-2xs font-semibold w-1/2 text-form-text">
              DETAILS
            </th>
          </tr>
        </thead>

        <tbody className="w-full border-y border-outline bg-white rounded-2xl">
          {sortedRoomData.map((room) => (
            <tr key={room.id} className="border-b border-dashboard-border">
              <td className="p-4 font-medium text-2xs xl:text-xs">
                {room.id}
              </td>
              <td className="p-4 font-medium text-2xs xl:text-xs">
                {room.roomNumber}
              </td>

              <td className="p-4 font-medium text-2xs xl:text-xs flex gap-2 custom-dropdown-button">
                <Dropdown
                  label={
                    <span className="text-2xs mr-2 text-white">Actions</span>
                  }
                  color="white"
                  size="xs"
                  className="text-white font-medium rounded-md transition-none"
                >
                  <Dropdown.Item
                    onClick={() => onDelete(room.id)}
                    className="flex items-center p-2 hover:bg-gray-200"
                  >
                    <FaTrash className="mr-2 text-xs text-gray-500" />
                    <span className="text-xs text-black">Delete</span>
                  </Dropdown.Item>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
