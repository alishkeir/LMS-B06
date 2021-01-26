import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
const HomePage = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [Class, setClass] = useState([]);
  const [total, setTotal] = useState("");
  const stdURL = "http://127.0.0.1:8000/api/auth/students?section=all";
  const adminURL = "http://127.0.0.1:8000/api/auth/teachers";
  const classURL = "http://127.0.0.1:8000/api/auth/classes?recent=true";

  useEffect(async () => {
    await axios.get(stdURL).then((res) => {
      setStudents(res.data);
    });
  }, [stdURL]);

  useEffect(async () => {
    await axios.get(adminURL).then((res) => {
      setAdmins(res.data);
      setTotal(res.data.meta.total);
    });
  }, [adminURL]);

  useEffect(async () => {
    await axios.get(classURL).then((res) => {
      setClasses(res.data);
      setClass(res.data.data);
    });
  }, [classURL]);

  // console.log(admins);
  // console.log(classes);
  // console.log(students);
  const showClasses = Class.map((result) => {
    return (
      <tr key={result.id}>
        <td>{result.id}</td>
        <td>{result.className}</td>

        <td>
          <Link to={`/classes/view/${result.id}`}>
            <Button className="btn btn-success" size="sm">
              View
            </Button>
          </Link>
        </td>
      </tr>
    );
  });
  const Total = () => {
    if (classes.total === 0) {
      return (
        <div className="mt-5" style={{ textAlign: "center", minWidth: 100 }}>
          <h3>No Classes Yet !!</h3>{" "}
        </div>
      );
    }
  };

  return (
    <>
      <div className="card-deck mb-4">
        <div
          className="card text-white bg-danger m-auto"
          style={{ minWidth: "18rem", maxWidth: "18rem" }}
        >
          <div className="card-header" style={{ textAlign: "center" }}>
            Number of Admins
          </div>
          <div className="card-body" style={{ textAlign: "center" }}>
            <h3 className="card-title m-4">{total}</h3>
          </div>
        </div>

        <div
          className="card text-white bg-success m-auto"
          style={{ minWidth: "18rem", maxWidth: "18rem" }}
        >
          <div className="card-header" style={{ textAlign: "center" }}>
            Number of Classes
          </div>
          <div className="card-body" style={{ textAlign: "center" }}>
            <h3 className="card-title m-4">{classes.total}</h3>
          </div>
        </div>

        <div
          className="card text-white bg-primary m-auto"
          style={{ minWidth: "18rem", maxWidth: "18rem" }}
        >
          <div className="card-header" style={{ textAlign: "center" }}>
            Number of Students
          </div>
          <div className="card-body" style={{ textAlign: "center" }}>
            <h3 className="card-title m-4">{students.total}</h3>
          </div>
        </div>
      </div>
      <h4 className="ml-3">Recent Classes:</h4>
      {/* {showClasses} */}
      <Table stripped="true" hover className="mb-0">
        <thead>
          <tr>
            <th>Class ID</th>
            <th>Class Name</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>{showClasses}</tbody>
      </Table>
      {Total()}
    </>
  );
};

export default withRouter(HomePage);
