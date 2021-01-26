import React, { Component } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link, Redirect, withRouter } from "react-router-dom";
import axios from "axios";
import AllSections from "../sections/allSections";

class UpdateStudent extends Component {
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
      dateOfBirth: "",
      redirect: false,
      id: this.props.match.params.id,
      // oldFirstName: "",
      // oldLastName: "",
      // oldEmail: "",
      // oldPhoneNumber: "",
      // oldDateOfBirth: "",
    };
  }
  componentDidMount() {
    const Url = `http://127.0.0.1:8000/api/auth/students/${this.state.id}`;
    axios.get(Url).then((res) => {
      // setStudents(res.data);
      // console.log(res.data);
      // console.log(this.props.match.params.phoneNumber)
      this.setState({
        oldFirstName: res.data.firstName,
        oldLastName: res.data.lastName,
        oldEmail: res.data.email,
        oldPhoneNumber: res.data.phoneNumber,
        oldDateOfBirth: res.data.dateOfBirth,
      });
    });
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
    // console.log(this.props.match.params.id)
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
    // console.log(e.target.value);
    // console.log("test");
  }

  onChangeImage(e) {
    this.setState({ image: e.target.files[0] });
  }

  onSubmit(e) {
    //  const d=new Date();
    //   n = d.toISOString(newYear);
    e.preventDefault();
    // console.log(this.state.dateOfBirth);
    // let {id} = useParams();

    const url = `http://localhost:8000/api/auth/students/${this.state.id}?_method=PUT`;
    const body = new FormData();
    if (this.state.image !== "") {
      body.append("image", this.state.image);
    }
    if (this.state.firstName !== "") {
      body.append("firstName", this.state.firstName);
    }
    if (this.state.lastName !== "") {
      body.append("lastName", this.state.lastName);
    }
    if (this.state.email !== "") {
      body.append("email", this.state.email);
    }
    if (this.state.dateOfBirth !== "") {
      body.append("dateOfBirth", this.state.dateOfBirth);
    }
    if (this.state.phoneNumber !== "") {
      body.append("phoneNumber", this.state.phoneNumber);
    }
    if (this.state.sectionID !== "") {
      body.append("sectionID", this.state.sectionID);
    }
    axios.post(url, body).then(
      () => this.setState({ redirect: true })
      // console.log
    );

    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      image: "",
      dateOfBirth: "",
      sectionID: "",
    });
  }
  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to={`/students/view/${this.state.id}`} />;
    }
    return (
      <>
        <Card className="text-center">
          <Card.Header>
            <h4>Edit a Student</h4>
          </Card.Header>
          <Card.Body>
            <Link to={`/students/view/${this.state.id}`}>
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
              placeholder={this.state.oldFirstName}
            />
          </div>

          <div className="form-group">
            <label>Last Name:</label>
            <input
              className="form-control"
              type="text"
              maxLength="255"
              onChange={this.onChangelastName}
              placeholder={this.state.oldLastName}
            />
          </div>

          <div className="form-group">
            <label>Email:</label>

            <input
              className="form-control"
              type="email"
              onChange={this.onChangeEmail}
              maxLength="255"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              title="someone@example.com"
              placeholder={this.state.oldEmail}
            />
          </div>

          <div className="form-group">
            <label>Phone Number:</label>
            <input
              className="form-control"
              type="text"
              maxLength="255"
              minLength="8"
              onChange={this.onChangephoneNumber}
              pattern="[0-9]{8,}"
              placeholder={this.state.oldPhoneNumber}
              title="8 digits or more"
            />
          </div>

          <div className="form-group">
            <label>Date Of Birth:</label>
            <input
              name="dateOfBirth"
              className="form-control"
              type="date"
              onChange={this.onChangedateOfBirth}
              // defaultValue={this.state.oldDateOfBirth}
            />
          </div>

          <div
            className="form-group"
            onChange={(e) => this.onChangeSection(e)}
            placeholder={this.state.sectionID}
          >
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
              onChange={(e) => this.onChangeImage(e)}
            />
          </div>

          <div className="form-group">
            <Button className="btn btn-primary" type="submit">
              Update
            </Button>
          </div>
        </Form>
      </>
    );
  }
}

export default withRouter(UpdateStudent);
