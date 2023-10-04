import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "../Slices/mainSlice";
import axios from "axios";

export const AddEmp = () => {
  const dispatch = useDispatch();

  const inputStyle = {
    marginBottom: "10px",
    padding: "5px",
    border: "1px solid #ccc",
    borderRadius: "20px",
    width: "40%",
  };

  const inputStyleForJoin = {
    marginBottom: "10px",
    padding: "5px",
    border: "1px solid #ccc",
    borderRadius: "20px",
    width: "37%",
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "40px",
    cursor: "pointer",
  };

  const [employeeData, setEmployeeData] = useState({
    empName: "",
    salary: "",
    empDateofJoin: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
  }

  async function saveData() {
    const { empName, salary, empDateofJoin } = employeeData;

    if (empName === "" || salary === "" || empDateofJoin === "") {
      alert("Please enter all fields.");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8080/company/employees",
          {
            empName,
            salary: parseInt(salary),
            empDateofJoin,
          }
        );

        // console.log(response);

        if (response.status === 200) {
          dispatch(addEmployee(response.data));
          setEmployeeData({
            empName: "",
            salary: "",
            empDateofJoin: "",
          });

          alert("Employee added successfully!");
        } else {
          alert("Failed to add employee.");
        }
      } catch (error) {
        alert("An error occurred while adding the employee.");
        console.error(error);
      }
    }
  }

  return (
    <div className="App-header1">
      <div className="App-header1">Add Employee</div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          placeholder="Employee Name"
          name="empName"
          style={inputStyle}
          value={employeeData.empName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Salary:</label>
        <input
          type="text"
          placeholder="Salary"
          name="salary"
          style={inputStyle}
          value={employeeData.salary}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Joining Date:</label>
        <input
          type="text"
          placeholder="Date of Joining"
          name="empDateofJoin"
          style={inputStyleForJoin}
          value={employeeData.empDateofJoin}
          onChange={handleChange}
        />
      </div>
      <button onClick={saveData} style={buttonStyle}>
        Save
      </button>
    </div>
  );
};
