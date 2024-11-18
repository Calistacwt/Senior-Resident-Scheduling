import Searchbar from "./component/searchbar";
import List from "./component/list";

const srList = () => {
  return (
    <>
      <div className="m-3">
        <div className=" mb-3 space-y-1">
          <h1 className="font-bold text-xl">Senior Resident's List</h1>
          <h6 className="text-xs text-dashboard-text">
            List of Senior Residents in KK Woman's and Children's Hospital
          </h6>
        </div>

        <Searchbar
          onSearch={function (value: string): void {
            console.log(value);
          }}
        />

        <List />
      </div>
    </>
  );
};

export default srList;
