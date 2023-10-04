import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees, deleteEmployee } from "../Slices/mainSlice";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import "./App1.css";

const AllEmp = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.main.employee);

  const [show, setShow] = useState(false);
  const [updateEmployee, setUpdateEmployee] = useState({});

  const handleClose = () => {
    setShow(false);
    setUpdateEmployee({});
  };

  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDelete = (empId) => {
    dispatch(deleteEmployee(empId));
  };

  const handleUpdate = (employee) => {
    setUpdateEmployee(employee);
    handleShow();
  };

  const handleUpdateSave = () => {
    if (updateEmployee.empId) {
      axios.put(`http://localhost:8080/company/employees/${updateEmployee.empId}`, updateEmployee)
        .then((response) => {
          console.log("Employee updated successfully:", response.data);
          dispatch(fetchEmployees());
        })
        .catch((error) => {
          console.error("Error updating employee:", error);
        });

      handleClose();
    }
  };

  return (
    <div className="App-header1">
      <h2>Employee Data</h2>
      {employees.map((employee) => (
        <div key={employee.empId} className="employee-item">
          <div>
            <span style={{ color: "#0074CC" }}>ID: {employee.empId}</span>
            <span style={{ color: "#0074CC" }}>Name: {employee.empName}</span>
            <span style={{ color: "#0074CC" }}>Joining Date: {employee.empDateofJoin}</span>
            <span style={{ color: "#0074CC" }}>Salary: {employee.salary}</span>
          </div>
          <div>
            <button className="delete-button" onClick={() => handleDelete(employee.empId)}>Delete</button>
            <button className="delete-button" onClick={() => handleUpdate(employee)}>Update</button>
          </div>
        </div>
      ))}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={updateEmployee ? updateEmployee.empName : ""}
              onChange={(e) => setUpdateEmployee({ ...updateEmployee, empName: e.target.value })}
            />
            <label>Salary</label>
            <input
              type="text"
              value={updateEmployee ? updateEmployee.salary : ""}
              onChange={(e) => setUpdateEmployee({ ...updateEmployee, salary: e.target.value })}
            />
            <label>Joining Date</label>
            <input
              type="date"
              value={updateEmployee ? updateEmployee.empDateofJoin : ""}
              onChange={(e) => setUpdateEmployee({ ...updateEmployee, empDateofJoin: e.target.value })}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AllEmp;
