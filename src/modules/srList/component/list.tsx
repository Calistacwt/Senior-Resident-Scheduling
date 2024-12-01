import { srList } from "@/types/srList";
import { formatDate } from "@/utils/formatter";

interface SRProps {
  SRData: srList[];
}

const List: React.FC<SRProps> = ({ SRData }) => {
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
            {/* <th className="gap-3 px-4 py-3 text-2xs font-semibold text-form-text">
              CALL DATES
            </th> */}
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

              <td className="p-4 font-medium  ">
                <button className="bg-sidebar-active  text-white font-medium text-2xs p-2 rounded-md">
                  Information
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
