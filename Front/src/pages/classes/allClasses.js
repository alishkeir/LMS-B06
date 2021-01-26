import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Form, Col, Button, CardDeck } from "react-bootstrap";
// import modalClasses from "./modalClasses";
//import Modal from "react-modal";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import { Confirm } from "react-st-modal";

// Modal.setAppElement("#root")
const AllClasses = () => {
  const [pagination, setPagination] = useState([]);
  const [showPaginaton, setShowPagination] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [classes, setClasses] = useState([]);
  const filterURL = `http://127.0.0.1:8000/api/auth/classes?page=${pageNumber}&recent=false`;
  const [className, setClassName] = useState("");

  const onAdd = (e) => {
    e.preventDefault();

    const url = "http://localhost:8000/api/auth/classes/";
    const body = new FormData();
    body.append("className", className);
    axios.post(url, body).then(() => {
      setClassName("");
    });
    axios.get(filterURL).then((res) => {
      setClasses(res.data.data);
      setPagination(res.data);
    });
  };
  const handleChange = (e) => {
    setClassName(e.target.value);
  };

  const deleteClass = async (id) => {
    const deleteUrl = `http://localhost:8000/api/auth/classes/${id}`;
    try {
      await axios.delete(deleteUrl);
      await axios.get(filterURL).then((res) => {
        setClasses(res.data.data);
        setPagination(res.data);
        if (res.data.total == 0) {
          setShowPagination(false);
        }
      });
    } catch (e) {
      alert("Can't delete class that contains sections.");
    }
  };

  useEffect(() => {
    axios.get(filterURL).then((res) => {
      setClasses(res.data.data);
      setPagination(res.data);
      console.log(pagination.total);
      if (res.data.total == 0) {
        setShowPagination(false);
      }
    });
  }, [filterURL]);

  const showClasses = classes.map((result) => {
    return (
      <Card
        className="card bg-light mb-4"
        key={result.id}
        // className="mb-3 "
        style={{ minWidth: "18rem", maxWidth: "18rem" }}
      >
        <Card.Header style={{ textAlign: "center" }}>
          {result.className}
        </Card.Header>
        <Card.Body style={{ textAlign: "center" }}>
          <Link to={`/classes/view/${result.id}`}>
            <Button className="btn btn-success m-3" size="sm">
              View
            </Button>
          </Link>

          <Button
            variant="danger"
            className="m-3"
            size="sm"
            onClick={async () => {
              const isConfirm = await Confirm(
                "Are you sure you want to delete this Class ?"
              );
              if (isConfirm) {
                deleteClass(result.id);
              }
            }}
          >
            Delete
          </Button>
        </Card.Body>
      </Card>
    );
  });
  return (
    <>
      <Card className="text-center mb-3">
        <Card.Header>
          <h4>Classes Manager</h4>
        </Card.Header>
      </Card>
      <Form onSubmit={onAdd} className="ml-3">
        <label>
          <h4>Add Class</h4>
        </label>
        <Form.Row>
          <Col xs={3}>
            <input
              type="text"
              className="form-control col-sm"
              onChange={handleChange}
              placeholder="Class Name"
            />
          </Col>
          <Col>
            <Button type="submit" className="btn btn-primary">
              add
            </Button>
          </Col>
        </Form.Row>
      </Form>
      <div className="Classs-display mb-3">
        <h4 className="mt-4 ml-3">{pagination.total} - Available Classes </h4>
        {/*how many Classs submitted*/}
        <CardDeck className="mt-3 m-auto">{showClasses}</CardDeck>
      </div>

      {showPaginaton ? (
        <Pagination
          // innerClass="mt-2 pagination"
          innerClass="pagination justify-content-center"
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
export default AllClasses;
