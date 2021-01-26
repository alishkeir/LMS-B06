import React, { useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { useHistory, Link, withRouter } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const TeachersAdd = () => {
	const history = useHistory();
	const url = "http://localhost:8000/api/auth/teachers";
	const [error, setError] = useState("");

	const addSubmit = async (username, email, password) => {
		try {
			await axios.post(url, { username, email, password }).then((res) => {
				if (res.data.errors) {
					if (
						res.data.errors[0] === "The username has already been taken." &&
						res.data.errors[1] === "The email has already been taken."
					) {
						return setError("username and email have already been taken");
					} else if (
						res.data.errors[0] === "The username has already been taken."
					) {
						return setError("Username has already been taken");
					} else if (
						res.data.errors[0] === "The email has already been taken."
					) {
						return setError("The email has already been taken");
					}
				} else {
					return history.push("/teachers");
				}
			});
		} catch (error) {
			// console.log(error)
		}
	};
	return (
		<>
			<Card className="text-center">
				<Card.Header>
					<h4>Add New Admin</h4>
				</Card.Header>
				<Card.Body>
					<Link to={"/teachers"}>
						<Button variant="warning">Back</Button>
					</Link>
				</Card.Body>
			</Card>
			<Formik
				initialValues={{ username: "", email: "", password: "" }}
				onSubmit={(values, { setSubmitting }) => {
					const { username, email, password } = values;
					setSubmitting(false);
					addSubmit(username, email, password);
				}}
				validationSchema={Yup.object({
					username: Yup.string()
						.max(15, "Must be 15 characters or less")
						.required("Username is required"),
					email: Yup.string()
						.email("Invalid email address")
						.required("Email is required"),
					password: Yup.string()
						.min(3, "Must be 3 characters or more")
						.max(15, "Must be 15 characters or less")
						.required("Password is required"),
				})}
			>
				{(formik, isSubmitting) => (
					<Form className="w-50 mx-auto mt-5">
						{error ? <p className="text-danger">{error}</p> : null}
						<div className="form-group">
							<label htmlFor="username">Username</label>
							<Field
								name="username"
								className={
									formik.touched.username && formik.errors.username
										? "form-control is-invalid"
										: "form-control"
								}
								type="text"
							/>
							{formik.touched.username && formik.errors.username ? (
								<div className="invalid-feedback">{formik.errors.username}</div>
							) : null}
						</div>

						<div className="form-group">
							<label htmlFor="email">Email Address</label>
							<Field
								name="email"
								className={
									formik.touched.email && formik.errors.email
										? "form-control is-invalid"
										: "form-control"
								}
								type="email"
							/>
							{formik.touched.email && formik.errors.email ? (
								<div className="invalid-feedback">{formik.errors.email}</div>
							) : null}
						</div>

						<div className="form-group">
							<label htmlFor="password">password</label>
							<Field
								name="password"
								className={
									formik.touched.password && formik.errors.password
										? "form-control is-invalid"
										: "form-control"
								}
								type="password"
							/>
							{formik.touched.password && formik.errors.password ? (
								<div className="invalid-feedback">{formik.errors.password}</div>
							) : null}
						</div>

						<div className="form-group">
							<button
								type="submit"
								className="btn btn-primary"
								disabled={isSubmitting}
							>
								{isSubmitting ? "Please wait..." : "Create"}
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default withRouter(TeachersAdd);
