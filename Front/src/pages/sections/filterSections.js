import React, { useEffect, useState } from "react";
import axios from "axios";
import "./sections.css";

const FilterSections = () => {
  const sectionUrl = `http://127.0.0.1:8000/api/auth/sections?class=all`;
  const [sections, setSections] = useState([]);

  useEffect(() => {
    axios.get(sectionUrl).then((res) => {
      setSections(res.data);
      // console.log(res);
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
    <div>
      <select name="a" className="btn btn- btn-warning ">
        <option value="all">All Sections</option>
        {showStections}
      </select>
    </div>
  );
};
export default FilterSections;
