import { seniorDoctorList } from "@/types/seniorDoctorList";

interface SeniorDoctorProps {
  seniorDoctorData: seniorDoctorList[];
}

const List: React.FC<SeniorDoctorProps> = ({ seniorDoctorData }) => {
  return (
    <div className=" bg-background  ">
      <table className="w-full bg-white mt-3">
        <thead className="text-left bg-background">
          <tr>
            <th className=" gap-3 px-4 py-3 text-2xs font-semibold text-form-text">
              ID
            </th>
            <th className=" gap-3 px-4 py-3 text-2xs font-semibold text-form-text">
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
          </tr>
        </thead>

        <tbody className="w-full border-y border-outline bg-white rounded-2xl">
          {seniorDoctorData.map((seniorDoctorData, index) => (
            <tr key={index} className="border-b border-dashboard-border">
              <td className="p-4  font-medium text-2xs xl:text-xs ">
                {seniorDoctorData.id}
              </td>

              <td className="p-4  font-medium text-2xs xl:text-xs ">
                {seniorDoctorData.name}
              </td>

              <td className="p-4  font-medium text-2xs xl:text-xs">
                {seniorDoctorData.mobile}
              </td>
              <td className="p-4  font-medium text-2xs xl:text-xs ">
                {seniorDoctorData.email}
              </td>

              <td className="p-4  font-medium text-2xs xl:text-xs ">
                {seniorDoctorData.remarks}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
