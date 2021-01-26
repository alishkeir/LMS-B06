import React, { Component } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import AllSections from "../sections/allSections";

class AddStudent extends Component {
  constructor(props) {
    super(props);

    this.onChangefirstName = this.onChangefirstName.bind(this);
    this.onChangelastName = this.onChangelastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangephoneNumber = this.onChangephoneNumber.bind(this);
    this.onChangedateOfBirth = this.onChangedateOfBirth.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangeSection = this.onChangeSection.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      image: "",
      sectionID: "",
      dateOfBirth: null,
      redirect: false,
      message: "",
      total: "",
    };
  }

  handleChange(e) {
    let input = this.state.input;

    input[e.target.name] = e.target.value;

    this.setState({
      input,
    });
  }

  onChangefirstName(e) {
    this.setState({ firstName: e.target.value });
  }

  onChangelastName(e) {
    this.setState({ lastName: e.target.value });
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }
  onChangephoneNumber(e) {
    this.setState({ phoneNumber: e.target.value });
  }
  onChangedateOfBirth(e) {
    // console.log(e.target.value);
    this.setState({ dateOfBirth: e.target.value });
  }
  onChangeSection(e) {
    this.setState({ sectionID: e.target.value });

    axios
      .get(`http://localhost:8000/api/auth/students?section=${e.target.value}}`)
      .then((res) => {
        // console.log(res.data);
        this.setState({ total: res.data.total });
        // console.log(this.state.sectionID)
        // console.log(this.state.total);
      });

    // console.log(e.target.value)
  }

  onChangeImage(e) {
    this.setState({ image: e.target.files[0] });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.total < 2) {
      const url = "http://localhost:8000/api/auth/students/";
      const body = new FormData();
      body.append("image", this.state.image);
      body.append("firstName", this.state.firstName);
      body.append("lastName", this.state.lastName);
      body.append("email", this.state.email);
      body.append("dateOfBirth", this.state.dateOfBirth);
      body.append("phoneNumber", this.state.phoneNumber);
      body.append("sectionID", this.state.sectionID);
      axios.post(url, body).then((res) => {
        if (res.data.message) {
          this.setState({
            message: "* " + res.data.message + " *",
          });
        } else {
          this.setState({
            redirect: true,
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            image: "",
            dateOfBirth: "",
            sectionID: "",
          });
        }
      });
    } else {
      alert("Section student Limit Reached");
    }
  }
  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/students" />;
    }
    return (
      <>
        <Card className="text-center">
          <Card.Header>
            <h4>Create a Student</h4>
          </Card.Header>
          <Card.Body>
            <Link to={"/students"}>
              <Button variant="warning">Back</Button>
            </Link>
          </Card.Body>
        </Card>

        <Form onSubmit={this.onSubmit} className="w-50 mx-auto mt-5">
          <div className="form-group">
            <label>First Name:</label>

            <input
              className="form-control"
              type="text"
              onChange={this.onChangefirstName}
              maxLength="255"
              required
              pattern="[A-Za-z].{1,}"
              title="Only letters allowed"
            />
          </div>

          <div className="form-group">
            <label>Last Name:</label>
            <input
              className="form-control"
              type="text"
              maxLength="255"
              required
              onChange={this.onChangelastName}
              pattern="[A-Za-z].{1,}"
              title="Only letters allowed"
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <p style={{ color: "red" }}>{this.state.message}</p>
            <input
              className="form-control"
              type="email"
              onChange={this.onChangeEmail}
              maxLength="255"
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              title="someone@example.com"
            />
          </div>

          <div className="form-group">
            <label>Phone Number:</label>
            <input
              className="form-control"
              type="text"
              maxLength="255"
              required
              minLength="8"
              onChange={this.onChangephoneNumber}
              pattern="[0-9]{8,}"
              title="8 digits or more"
            />
          </div>

          <div className="form-group">
            <label>Date Of Birth:</label>
            <input
              name="dateOfBirth"
              className="form-control"
              type="date"
              required
              onChange={this.onChangedateOfBirth}
            />
          </div>

          <div className="form-group" onChange={(e) => this.onChangeSection(e)}>
            <AllSections />
          </div>

          <div className="form-group">
            <label>Student Image :</label>
            <br />
            <input
              className="submit"
              type="file"
              name="image"
              accept="image/*"
              required
              onChange={(e) => this.onChangeImage(e)}
            />
          </div>

          <div className="form-group">
            <Button className="btn btn-primary" type="submit">
              Create
            </Button>
          </div>
        </Form>
      </>
    );
  }
}

export default AddStudent;
