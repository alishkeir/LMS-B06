import React, { useState, useContext } from "react";
import { IoPersonCircleSharp } from "react-icons/io5";
import UserContext from "./UserContext";
import styled from "styled-components";
import { ListGroup } from "react-bootstrap";
import axios from "axios";
import cookie from "js-cookie";

const Nav = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 3.5rem;
  background: #f0f2f4;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 10;
`;

const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  const { token, setToken } = useContext(UserContext);
  const [hover, setHover] = useState("");

  return (
    <Nav>
      {hover ? (
        <IoPersonCircleSharp
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          size="2.5rem"
          color="#333"
          style={{
            marginRight: "2.5rem",
            cursor: "pointer",
            filter: "brightness(250%)",
          }}
          onClick={() => {
            setToggle(!toggle);
          }}
        />
      ) : (
        <IoPersonCircleSharp
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          size="2.5rem"
          color="#333"
          style={{
            marginRight: "2.5rem",
            cursor: "pointer",
          }}
          onClick={() => {
            setToggle(!toggle);
          }}
        />
      )}
      {toggle ? (
        <ListGroup
          style={{ position: "absolute", top: "3.5rem", right: "1rem" }}
        >
          <ListGroup.Item
            className="list-group-item-secondary"
            action
            onClick={() => {
              axios
                .post("http://localhost:8000/api/auth/logout")
                .then((res) => {
                  // console.log(res.data);
                })
                .catch((e) => {
                  console.log(e.response);
                });
              cookie.remove("token");
              setToken(null);
            }}
          >
            Logout
          </ListGroup.Item>
        </ListGroup>
      ) : null}
    </Nav>
  );
};

export default NavBar;
