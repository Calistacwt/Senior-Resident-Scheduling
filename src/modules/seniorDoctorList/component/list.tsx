import { seniorDoctorList } from "@/types/seniorDoctorList";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Dropdown } from "flowbite-react";
import { useNavigate } from "@tanstack/react-router";
import "/src/styles/custom-dropdown.css";

interface SeniorDoctorProps {
  seniorDoctorData: seniorDoctorList[];
  onDelete: (id: number) => void;
}

const List: React.FC<SeniorDoctorProps> = ({ seniorDoctorData, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = (sdData: seniorDoctorList) => {
    navigate({
      to: `/seniorDoctorForm/${sdData.id}/edit`,
      params: { id: sdData.id },
    });
  };

  return (
    <div className="bg-background">
      <table className="w-full bg-white mt-3">
        <thead className="text-left bg-background">
          <tr>
            <th className="gap-3 px-4 py-3 text-2xs font-semibold text-form-text">
              ID
            </th>
            <th className="gap-3 px-4 py-3 text-2xs font-semibold text-form-text">
              NAME
            </th>
            <th className="gap-3 px-4 py-3 text-2xs font-semibold text-form-text">
              MOBILE
            </th>
            <th className="gap-3 px-4 py-3 text-2xs font-semibold text-form-text">
              EMAIL
            </th>
            <th className="gap-3 px-4 py-3 text-2xs font-semibold text-form-text">
              REMARKS
            </th>
            <th className="gap-3 px-4 py-3 text-2xs font-semibold text-form-text">
              DETAILS
            </th>
          </tr>
        </thead>

        <tbody className="w-full border-y border-outline bg-white rounded-2xl">
          {seniorDoctorData.map((doctor) => (
            <tr key={doctor.id} className="border-b border-dashboard-border">
              <td className="p-4 font-medium text-2xs xl:text-xs">
                {doctor.id}
              </td>
              <td className="p-4 font-medium text-2xs xl:text-xs">
                {doctor.name}
              </td>
              <td className="p-4 font-medium text-2xs xl:text-xs">
                {doctor.mobile}
              </td>
              <td className="p-4 font-medium text-2xs xl:text-xs">
                {doctor.email}
              </td>
              <td className="p-4 font-medium text-2xs xl:text-xs">
                {doctor.remarks}
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
                    onClick={() => handleEdit(doctor)}
                    className="flex items-center p-2 hover:bg-gray-200"
                  >
                    <FaEdit className="mr-2 text-sm text-gray-500" />
                    <span className="text-xs text-black">Edit</span>
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => onDelete(doctor.id)}
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
