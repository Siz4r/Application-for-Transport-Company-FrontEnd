import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import classes from "./App.module.css";
import { BootstrapAuthentication } from "./core/wrappers/BootstrapAuthentication";
import { RouterPathsKeys } from "./types";
import { Employee } from "./view/Employees/EmployeeDetails/Employee";
import { Employees } from "./view/Employees/Employees";
import ForgotPassword from "./view/ForgotPassword/ForgotPassword";
import { MyProfile } from "./view/MyProfile/MyProfile";
import { SignIn } from "./view/SignIn/SignIn";

function App() {
  return (
    <BootstrapAuthentication>
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
            <Route
              path={RouterPathsKeys.EMPLOYEE + ":id"}
              element={<Employee />}
            />
          </Routes>
        </Router>
      </div>
    </BootstrapAuthentication>
  );
}

export default App;
