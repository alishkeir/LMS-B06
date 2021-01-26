import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, DropdownButton, Dropdown, Table } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import Pagination from "react-js-pagination";

const TeachersPage = () => {
  // All Teachers states
  const [teachers, setTeachers] = useState([]);
  const [showTeachers, setShowTeachers] = useState(true);
  //

  // All name Filtered states
  const [showNameTeachers, setShowNameTeachers] = useState(false);
  const [nameTeachers, setNameTeachers] = useState([]);

  // Pagination
  const [pagination, setPagination] = useState([]);
  const [showPaginaton, setShowPagination] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  // api urls
  const url = `http://localhost:8000/api/auth/teachers?page=${pageNumber}`;
  const filterUrl = `http://localhost:8000/api/auth/teachers?page=${pageNumber}&name=true`;
  const [error, setError] = useState();

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setTeachers(res.data.data);
        setPagination(res.data.meta);
        setShowPagination(true);
      })
      .catch((e) => {
        if (e.response.data.message === "Token has expired") {
          setError("YOU MUST BE LOGGED IN TO VIEW");
        }
      });
    axios
      .get(filterUrl)
      .then((res) => {
        setNameTeachers(res.data.data);
      })
      .catch((e) => {});
    return () => {
      setTeachers([]);
      setNameTeachers([]);
      setPagination([]);
      setShowPagination(false);
    };
  }, [url, filterUrl]);

  const deleteTeacher = async (id) => {
    const deleteUrl = `http://localhost:8000/api/auth/teachers/${id}`;
    await axios.delete(deleteUrl);
    await axios.get(url).then((res) => {
      setTeachers(res.data.data);
    });
    await axios.get(filterUrl).then((res) => {
      setNameTeachers(res.data.data);
    });
  };

  const showAllTeachers = teachers.map((teacher) => {
    return (
      <tr key={teacher.id}>
        <td>{teacher.id}</td>
        <td>{teacher.username}</td>
        <td>{teacher.email}</td>
        <td></td>
        <td>
          <Link to={`/teachers/edit/${teacher.id}`}>
            <Button variant="outline-warning" className=" mr-2" size="sm">
              Edit
            </Button>
          </Link>

          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => {
              if (window.confirm("Delete this Admin?"))
                deleteTeacher(teacher.id);
            }}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  });

  const showAllNameTeachers = nameTeachers.map((teacher) => {
    return (
      <tr key={teacher.id}>
        <td>{teacher.id}</td>
        <td>{teacher.username}</td>
        <td>{teacher.email}</td>
        <td></td>
        <td>
          <Link to={`/teachers/edit/${teacher.id}`}>
            <Button variant="outline-warning" className="btn-sm mr-2">
              Edit
            </Button>
          </Link>
          <Button
            variant="outline-danger"
            className="btn-sm"
            onClick={() => {
              if (window.confirm("Delete this Teacher?"))
                deleteTeacher(teacher.id);
            }}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  });

  const filterAll = () => {
    setShowTeachers(true);
    setShowNameTeachers(false);
  };
  const filterAlpha = () => {
    setShowTeachers(false);
    setShowNameTeachers(true);
  };

  return (
    <>
      {error ? <p className="text-center text-danger">{error}</p> : null}
      <Card className="text-center" style={{ minWidth: "411.2px" }}>
        <Card.Header className="bg-secondary text-white">
          <h4>Admins Manager</h4>
        </Card.Header>
        <Card.Body>
          <Link to={"/teachers/add"}>
            <Button variant="primary">Create </Button>
          </Link>
        </Card.Body>
      </Card>
      <Table stripped="true" hover>
        <thead>
          <tr>
            <th></th>
            <th>
              <DropdownButton
                size="sm"
                id="dropdown-basic-button"
                title="Filter"
                // className="mt-4"
                variant="secondary"
              >
                <Dropdown.Item onClick={filterAll} tag={Link} to="/teachers">
                  All Teachers
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={filterAlpha}
                  tag={Link}
                  to="/teachers?name=true"
                >
                  Alphabetically
                </Dropdown.Item>
              </DropdownButton>
            </th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <th>id</th>
            <th>Username</th>
            <th>Email</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {showTeachers ? showAllTeachers : null}
          {showNameTeachers ? showAllNameTeachers : null}
        </tbody>
      </Table>
      {showPaginaton ? (
        <Pagination
          innerClass="mt-2 pagination justify-content-center"
          activePage={pagination.current_page}
          totalItemsCount={pagination.total}
          itemsCountPerPage={pagination.per_page}
          itemClass="page-item"
          linkClass="page-link"
          onChange={(pageNumber) => {
            setPageNumber(pageNumber);
          }}
        />
      ) : null}
    </>
  );
};

export default withRouter(TeachersPage);
