import Searchbar from "./component/searchbar";
import List from "./component/list";

const srList = () => {
  return (
    <><div className="m-3">
      <div className=" mb-3 space-y-1">
        <h1 className="font-bold text-xl">Senior Resident's List</h1>
        <h6 className="text-xxs text-[#5C5C5C]">
          List of Senior Residents in KK Woman's and Children's Hospital
        </h6>
      </div>
      <Searchbar
        onSearch={function (value: string): void {
          console.log(value);
        } } />
    </div>
    <div>
        <List />
      </div>
    </>
  );
};

export default srList;
