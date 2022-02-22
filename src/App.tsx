import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import classes from "./App.module.css";
import { RouterPathsKeys } from "./types";
import { Employee } from "./view/Employees/EmployeeDetails/Employee";
import { Employees } from "./view/Employees/Employees";
import ForgotPassword from "./view/ForgotPassword/ForgotPassword";
import { MyProfile } from "./view/MyProfile/MyProfile";
import { SignIn } from "./view/SignIn/SignIn";

function App() {
  return (
    <div className={classes.App}>
      <Router>
        <Routes>
          <Route path={RouterPathsKeys.SIGN_IN} element={<SignIn />} />
          <Route
            path={RouterPathsKeys.FORGOT_PASSWORD}
            element={<ForgotPassword />}
          />
          <Route path={RouterPathsKeys.MY_PROFILE} element={<MyProfile />} />
          <Route path={RouterPathsKeys.EMPLOYEES} element={<Employees />} />
          <Route path={RouterPathsKeys.EMPLOYEE} element={<Employee />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
