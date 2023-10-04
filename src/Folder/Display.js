import { AddEmp } from "./AddEmp";
import AllEmp from "./AllEmp";

const Display = ({ page }) => {
  // console.log("Display" + page);
  return (
    <div>
      {page === "AddEmp" ? (
        <>
          <AddEmp />
        </>
      ) : page === "AllEmp" ? (
        <>
          <AllEmp />
        </>
      ) : null}
    </div>
  );
};
export default Display;
