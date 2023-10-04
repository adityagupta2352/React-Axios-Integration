import React, { useState } from "react";
import Display from "../Folder/Display";

const buttonStyles = {
  margin: "10px",
  backgroundColor: "#007bff",
  color: "white", 
  padding: "10px 20px", 
  border: "none",
  borderRadius: "4px",
  cursor: "pointer", 
};

const MainComponent = () => 
{
  const handle = (page) => {
    setCurrentPage(page);
  };

  const [currentPage, setCurrentPage] = useState(null);

  return (
    <div className="App-header1">
      <button
        style={buttonStyles}
        onClick={() => handle("AllEmp")}
      >
        Get All Employee
      </button>
      <button
        style={buttonStyles}
        onClick={() => handle("AddEmp")}
      >
        Add Employee
      </button>
      <Display page={currentPage} />
    </div>
  );
}

export default MainComponent;
