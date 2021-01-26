import  { createContext } from "react";

const UserContext = createContext(null);

export default UserContext;

// import React, { createContext, useContext } from "react";

// const AuthStateContext = createContext();
// const AuthDispatchContext = createContext();

// export const useAuthState = () => {
// 	const context = useContext(AuthStateContext);
// };

// export const useDispatchzState = () => {
// 	const context = useContext(AuthDispatchContext);
// };

// export default UserContext;
