import React, { useEffect, useState } from "react";
import axios from "axios";
// import { Table } from "react-bootstrap";
import "./sections.css"

const AllSections = () => {
  const sectionUrl = `http://127.0.0.1:8000/api/auth/sections?class=all`;
  const [sections, setSections] = useState([]);

  useEffect(() => {
    axios.get(sectionUrl).then((res) => {
      setSections(res.data);
    });
  }, []);

  const showStections = sections.map((section) => {
    return (
      <option key={section.id} value={section.id}>
        {section.sectionName}
      </option>
    );
  });
  return (
    <select name="a" className="btn btn- btn-info ">
      <option  value="">Select Section</option>
      {showStections}
    </select>
  );
};
export default AllSections;
