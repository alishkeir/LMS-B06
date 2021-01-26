import React from "react";
import { Route, Redirect } from "react-router-dom";

const Protected = ({ isAuth: isAuth, component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				if (isAuth) {
					return <Component />;
				} else {
					return (
						<Redirect
							to={{ pathname: "/login", state: { from: props.location } }}
						/>
					);
				}
			}}
		></Route>
	);
};

export default Protected;
