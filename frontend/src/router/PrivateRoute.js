import React from "react";
import { Navigate } from "react-router-dom";


const PrivateRouter = ({isLoggedIn, children }) => {

  if (isLoggedIn) {
    return children;
  } else {
    console.log("not logged in")
    return <Navigate to="/login" replace />;
  }

};

export default PrivateRouter;
