import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, Redirect } from "react-router-dom";
import { Form, Col, Table, Card, Button } from "react-bootstrap";
import Pagination from "react-js-pagination";
import { Confirm } from "react-st-modal";

const ViewClass = () => {
  // Pagination
  const [pagination, setPagination] = useState([]);
  const [showPaginaton, setShowPagination] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  let params = useParams();
  const url = `http://127.0.0.1:8000/api/auth/classes/${params.id}?page=${pageNumber}`;

  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [sectionName, setSectionName] = useState("");

  useEffect(() => {
    axios.get(url).then((res) => {
      setClasses(res.data.data);
      setPagination(res.data);
    });
  }, [url]);

  const Url = `http://localhost:8000/api/auth/sections?class=${params.id}&page=${pageNumber}`;

  useEffect(() => {
    axios.get(Url).then((res) => {
      setSections(res.data.data);
      setPagination(res.data);
    });
  }, [Url]);

  const onAdd = (e) => {
    e.preventDefault();

    const url = "http://localhost:8000/api/auth/sections/";
    const body = new FormData();
    body.append("sectionName", sectionName);
    body.append("classID", params.id);

    axios.post(url, body).then(() => {
      setSectionName("");
    });
    axios.get(Url).then((res) => {
      setSections(res.data.data);
      setPagination(res.data);
    });
  };
  const handleChange = (e) => {
    setSectionName(e.target.value);
  };

  const deleteSection = async (id) => {
    try {
      const deleteUrl = `http://localhost:8000/api/auth/sections/${id}`;
      await axios.delete(deleteUrl);
      await axios.get(Url).then((res) => {
        setSections(res.data.data);
        setPagination(res.data);
        if (res.data.total === 0) {
          setShowPagination(false);
        }
      });
    } catch (e) {
      alert("Can't delete section that contains students");
    }
  };

  const showSections = sections.map((section) => {
    return (
      <tr key={section.id}>
        <td>{section.id}</td>
        <td>{section.sectionName}</td>
        <td>
          <Button
            variant="danger"
            size="sm"
            onClick={async () => {
              const isConfirm = await Confirm(
                "Are you sure you want to delete this Section ?"
              );
              if (isConfirm) {
                deleteSection(section.id);
              }
            }}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Card className="text-center">
        <Card.Header>
          <h4>Sections Manager</h4>
        </Card.Header>
        <Card.Body>
          <Link to={"/classes"}>
            <Button variant="warning">Back</Button>
          </Link>
        </Card.Body>
      </Card>

      <Form onSubmit={onAdd}>
        <label>
          <h4 className="mt-4">Add Section:</h4>
        </label>
        <Form.Row>
          <Col xs={3}>
            <input
              type="text"
              className="form-control col-sm"
              onChange={handleChange}
              placeholder="Section Name"
            />
          </Col>
          <Col>
            <Button type="submit" className="btn btn-primary">
              add
            </Button>
          </Col>
        </Form.Row>
      </Form>

      <Table className="table table-hover mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>section name </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>{showSections}</tbody>
      </Table>

      {showPaginaton ? (
        <Pagination
        // className="mt-5"
          // innerClass="mt-2 pagination"
          innerClass="pagination justify-content-center mt-5"
          activePage={pagination.current_page}
          totalItemsCount={pagination.total}
          itemsCountPerPage={pagination.per_page}
          itemClass="page-item"
          linkClass="page-link"
          nextPageText="next"
          prevPageText="prev"
          onChange={(pageNumber) => {
            setPageNumber(pageNumber);
          }}
        />
      ) : null}
    </>
  );
};

export default ViewClass;
