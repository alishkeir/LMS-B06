import { useState, useMemo, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import UserContext from "./components/UserContext";
import Protected from "./components/Protected";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import NavBar from "./components/NavBar";
import TeachersPage from "./pages/TeachersPage";
import HomePage from "./pages/HomePage";
import TeacherAdd from "./pages/TeachersAdd";
import TeacherEdit from "./pages/TeacherEdit";
import LoginPage from "./pages/LoginPage";
import cookie from "js-cookie";
import axios from "axios";
import jwt from "jsonwebtoken";
import AllStudents from "./pages/students/allStudents";
import AddStudent from "./pages/students/addStudent";
import UpdateStudent from "./pages/students/updateStudent";
import ViewStudent from "./pages/students/viewStudent";
import ViewClass from "./pages/classes/viewClasses";
import AllClasses from "./pages/classes/allClasses";


const Main = styled.main`
  width: 80%;
  margin: 5rem auto 0;
  padding-left: 4rem;
`;


const AppContainer = () => {
  const [token, setToken] = useState(null);
  const providerValue = useMemo(() => ({ token, setToken }), [token, setToken]);
  axios.defaults.headers.common["Authorization"] = "bearer " + token;
  const jwtSecret =
    "vVzS1CqdWDc9YdVzBKj32WD0JwWdeGUxepO7d0GV6nPN1T9RyWYDKcOPEGmBykaN";

  useEffect(() => {
    if (cookie.get("token")) {
      setToken(cookie.get("token"));
    }
  }, []);

  if (token) {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        cookie.remove("token");
        setToken(null);
      } else {
        if (decoded.iss !== "http://localhost:8000/api/auth/login") {
          cookie.remove("token");
          setToken(null);
        }
      }
    });
  }

  return (
    <>
      <UserContext.Provider value={providerValue}>
        <Router>
          <Switch>
            <Route
              exact={true}
              path="/login"
              component={(props) => <LoginPage isAuth={token} />}
            />
            <Main>
              <Sidebar />
              <NavBar />

              <Protected
                isAuth={token}
                exact={true}
                path="/home"
                component={(props) => <HomePage />}
              />

              <Protected
                isAuth={token}
                exact={true}
                path="/Teachers/Add"
                component={(props) => <TeacherAdd />}
              />

              <Protected
                isAuth={token}
                exact={true}
                path="/Teachers/Edit/:id"
                component={(props) => <TeacherEdit />}
              />
              <Protected
                isAuth={token}
                exact={true}
                path="/Teachers"
                component={(props) => <TeachersPage />}
              />
              <Protected
                isAuth={token}
                exact={true}
                path="/students"
                component={(props) => <AllStudents />}
              />

              <Protected
                isAuth={token}
                exact={true}
                path="/students/add"
                component={(props) => <AddStudent />}
              />

              <Protected
                isAuth={token}
                exact={true}
                path="/students/edit/:id"
                component={(props) => <UpdateStudent />}
              />

              <Protected
                isAuth={token}
                exact={true}
                path="/students/view/:id"
                component={(props) => <ViewStudent />}
              /> 

              {/* <Protected
                isAuth={token}
                exact={true}
                path="/sections"
                component={(props) => <AllSections />}
              /> */}

           

              <Protected
                isAuth={token}
                exact={true}
                path="/Classes"
                component={(props) => <AllClasses />}
              />

              <Protected
                isAuth={token}
                exact={true}
                path="/classes/view/:id"
                component={(props) => <ViewClass />}
              /> 


              <Protected
                isAuth={token}
                exact={true}
                path="/"
                component={(props) => <HomePage />}
              />
              <Redirect from="/*" to="/" />
            </Main>
          </Switch>
        </Router>
      </UserContext.Provider>
    </>
  );
};

export default AppContainer;
