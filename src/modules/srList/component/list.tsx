const List = () => {
    // test array for use in the list
  const names = ["name1", "name2", "name3"];

  const mcr = ["M12345E", "M27345E", "M87384E"]

  const mobile = ["12345678", "37483928", "28394827"]

  const email = ["senior1@mohh.com.sg", "senior2@mohh.com.sg", "senior3@mohh.com.sg"]

  const posting = ["06 May 2024 - 02 June 2024", "01 July 2024 - 31 July 2024", "01 August 2024 - 31 August 2024"];

  return (
    <div className="overflow-x-auto bg-background">
      <table className="min-w-full bg-white border border-dashboard-border">
        <thead>
          <tr className="bg-background text-sidebar uppercase text-xs lg:text-sm leading-normal">
            <th className="py-3 px-6 text-left">NO</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">MCR</th>
            <th className="py-3 px-6 text-left">Mobile</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Posting Date</th>
            <th className="py-3 px-6 text-left">Details</th>
          </tr> 
        </thead>
        <tbody className="text-dashboard-text text-xs lg:text-sm">
          {names.map((name, index) => (
            <tr
              key={index}
              className="border-b border-dashboard-border hover:bg-sidebar-hover"
            >
              <td className="py-3 px-6 text-left">{index + 1}</td>
              <td className="py-3 px-6 text-left">{name}</td>
              <td className="py-3 px-6 text-left">{mcr[index]}</td>
              <td className="py-3 px-6 text-left">{mobile[index]}</td>
              <td className="py-3 px-6 text-left">{email[index]}</td>
              <td className="py-3 px-6 text-left">{posting[index]}</td>
              <td className="py-3 px-6 text-left">placeholder btn</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
    
};

export default List;
