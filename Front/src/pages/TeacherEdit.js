import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory, useParams, withRouter, Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const TeacherEdit = () => {
	const { id } = useParams();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();
	const url = `http://localhost:8000/api/auth/teachers/${id}`;
	const editUrl = `http://localhost:8000/api/auth/teachers/${id}/edit`;

	const [error, setError] = useState();

	const editSubmit = async (username, email, password) => {
		try {
			await axios.put(url, { username, email, password }).then((res) => {
				history.push("/teachers");
			});
		} catch (error) {
			const res = error.response.data.message;
			if (res.includes("teachers_username_unique")) {
				setError("Username is already taken");
			} else if (res.includes("teachers_email_unique")) {
				setError("Email is already taken");
			}
		}
	};

	useEffect(() => {
		axios.get(editUrl).then((res) => {
			setUsername(res.data.data.username);
			setEmail(res.data.data.email);
			setPassword(res.data.data.password);
		});
	}, [editUrl]);
	return (
		<>
			<Card className="text-center">
				<Card.Header>
					<h4>Edit Admin</h4>
				</Card.Header>
				<Card.Body>
					<Link to={"/teachers"}>
						<Button variant="warning">Back</Button>
					</Link>
				</Card.Body>
			</Card>

			<Formik
				enableReinitialize={true}
				initialValues={{ username: username, email: email, password: "" }}
				onSubmit={(values, { setSubmitting }) => {
					const { username, email, password } = values;
					setSubmitting(false);
					editSubmit(username, email, password);
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
								{isSubmitting ? "Please wait..." : "Save"}
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default withRouter(TeacherEdit);
