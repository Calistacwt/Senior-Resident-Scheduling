// external library
import { useNavigate } from "@tanstack/react-router";

// external UI component and icons
import { Dropdown } from "flowbite-react";
import { FaEdit, FaTrash } from "react-icons/fa";

// types
import { srList } from "@/types/srList";

// utils
import { formatDate } from "@/utils/formatter";

// styles
import "/src/styles/custom-dropdown.css";

interface SRProps {
  SRData: srList[];
  onDelete: (id: string) => void;
}

const List: React.FC<SRProps> = ({ SRData, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = (srData: srList) => {
    navigate({
      to: `/seniorResidentForm/${srData.id}/edit`,
      params: { id: srData.id },
    });
  };

  const sortedSRData = [...SRData].sort((latest, oldest) => {
    const endDateA = latest.postingPeriod?.endDate
      ? new Date(latest.postingPeriod.endDate).getTime()
      : 0;
    const endDateB = oldest.postingPeriod?.endDate
      ? new Date(oldest.postingPeriod.endDate).getTime()
      : 0;

    return endDateB - endDateA;
  });

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
          {sortedSRData.map((SRData, index) => (
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
                    className="flex items-center p-2  hover:bg-gray-200"
                  >
                    <FaEdit className="mr-2 text-sm text-gray-500" />
                    <span className="text-xs text-black">Edit</span>
                  </Dropdown.Item>

                  <Dropdown.Item
                    onClick={() => onDelete(SRData.id)}
                    className="flex items-center p-2  hover:bg-gray-200"
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
