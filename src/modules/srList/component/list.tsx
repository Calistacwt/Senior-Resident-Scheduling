const List = () => {
  // test array for use in the list
  const names = ["Senior1", "Senior2", "Senior3"];

  const mcr = ["M12345E", "M27345E", "M87384E"];

  const mobile = ["+6598764321", "+6591234987", "+6598764321"];

  const email = [
    "senior1@mohh.com.sg",
    "senior2@mohh.com.sg",
    "senior3@mohh.com.sg",
  ];

  const posting = [
    "06 May 2024 - 02 June 2024",
    "01 July 2024 - 31 July 2024",
    "01 August 2024 - 31 August 2024",
  ];

  return (
    <div className="overflow-x-auto bg-background rounded-lg">
      <table className="w-full whitespace-nowrap bg-white mt-3">
        <thead className="text-left bg-background">
          <tr>
            <th className="gap-3 whitespace-nowrap px-4 py-3 text-2xs font-medium">
              NO
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
          {/* <td className="p-4  font-medium text-xs ">01</td>
          <td className="p-4  font-medium text-xs ">Senior 1</td>
          <td className="p-4 font-medium text-xs ">M12345E</td>
          <td className="p-4 font-medium text-xs">+6598764321</td>
          <td className="p-4 font-medium text-xs">senior1@mohh.com.sg</td>
          <td className="p-4 font-medium text-xs ">
            06 May 2024 - 02 June 2024
          </td> */}

          {names.map((name, index) => (
            <tr key={index} className="border-b border-dashboard-border">
              <td className="p-4  font-medium text-xs ">{index + 1}</td>
              <td className="p-4  font-medium text-xs ">{name}</td>
              <td className="p-4  font-medium text-xs ">{mcr[index]}</td>
              <td className="p-4  font-medium text-xs ">{mobile[index]}</td>
              <td className="p-4  font-medium text-xs ">{email[index]}</td>
              <td className="p-4  font-medium text-xs ">{posting[index]}</td>
              <td className="p-4 font-medium text-xs ">
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
