import { srList } from "@/types/srList";
import { formatDate } from "@/utils/formatter";
import { useNavigate } from "@tanstack/react-router";
import { Dropdown } from "flowbite-react";
import "/src/styles/custom-dropdown.css";
import { FaEdit, FaTrash } from "react-icons/fa";
interface SRProps {
  SRData: srList[];
  onDelete: (id: string) => void;
}

const List: React.FC<SRProps> = ({ SRData ,onDelete}) => {
  const navigate = useNavigate();

  const handleEdit = (srData: srList) => {
    // console.log("Edit SR Data:", srData);
    navigate({
      to: `/seniorResidentForm/${srData.id}/edit`,
      params: { id: srData.id },
    });
  };

  return (
    <div className=" bg-background  ">
      <table className="w-full bg-white mt-3">
        <thead className="text-left bg-background">
          <tr>
            <th className=" gap-3 px-4 py-3 text-2xs font-semibold text-form-text">
              SR ID
            </th>

            <th className=" gap-3 px-4 py-3 text-2xs font-semibold text-form-text">
              SR NAME
            </th>
            <th className="gap-3 px-4 py-3 text-2xs font-semibold text-form-text">
              MCR
            </th>
            <th className="gap-3 px-4 py-3 text-2xs font-semibold text-form-text">
              MOBILE
            </th>
            <th className="gap-3 px-4 py-3 text-2xs font-semibold text-form-text">
              EMAIL
            </th>
            <th className="gap-3 px-4 py-3 text-2xs font-semibold text-form-text">
              POSTING PERIOD
            </th>
            <th className="gap-3 px-4 py-3 text-2xs font-semibold text-form-text">
              DETAILS
            </th>
          </tr>
        </thead>

        <tbody className="w-full border-y border-outline bg-white rounded-2xl">
          {SRData.map((SRData, index) => (
            <tr key={index} className="border-b border-dashboard-border">
              <td className="p-4  font-medium text-2xs xl:text-xs ">
                {SRData.id}
              </td>

              <td className="p-4  font-medium text-2xs xl:text-xs ">
                {SRData.name}
              </td>
              <td className="p-4  font-medium text-2xs xl:text-xs">
                {SRData.MCR}
              </td>
              <td className="p-4  font-medium text-2xs xl:text-xs">
                {SRData.mobile}
              </td>
              <td className="p-4  font-medium text-2xs xl:text-xs ">
                {SRData.email}
              </td>

              <td className="p-4 font-medium text-2xs xl:text-xs">
                {SRData.postingPeriod && SRData.postingPeriod.startDate
                  ? formatDate(new Date(SRData.postingPeriod.startDate))
                  : "N/A"}{" "}
                -{" "}
                {SRData.postingPeriod && SRData.postingPeriod.endDate
                  ? formatDate(new Date(SRData.postingPeriod.endDate))
                  : "N/A"}
              </td>

              <td className="p-4 font-medium custom-dropdown-button">
                <Dropdown
                  label={
                    <span className="text-2xs mr-2 text-white">Actions</span>
                  }
                  color="white"
                  size="xs"
                  className="text-white font-medium rounded-md transition-none"
                >
                  <Dropdown.Item
                    onClick={() => handleEdit(SRData)}
                    className="flex items-center"
                  >
                    <FaEdit className="mr-2 text-sm" />
                    <span className="text-xs">Edit</span>
                  </Dropdown.Item>
                  <Dropdown.Item  onClick={() => onDelete(SRData.id)} className="flex items-center">
                    <FaTrash className="mr-2 text-xs" />
                    <span className="text-xs">Delete</span>
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
