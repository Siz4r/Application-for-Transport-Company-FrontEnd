import { Link } from "react-router-dom";
import { useLogout } from "../../core/hooks/Logout/useLogout";
import { RouterPathsKeys } from "../../types";
import classes from "./NavBar.module.css";

export const NavBar = () => {
  const loginOut = useLogout();

  return (
    <div className={classes.container}>
      <Link to={RouterPathsKeys.ORDER} className={classes.link}>
        Orders
      </Link>
      <Link to={RouterPathsKeys.EMPLOYEE} className={classes.link}>
        Employees
      </Link>
      <Link to={RouterPathsKeys.CLIENT} className={classes.link}>
        Clients
      </Link>
      <Link to={RouterPathsKeys.SIGN_IN} className={classes.link}>
        Chat
      </Link>
      <Link to={RouterPathsKeys.SIGN_IN} className={classes.link}>
        Your files
      </Link>
      <Link to={RouterPathsKeys.COMPANY} className={classes.link}>
        Companys
      </Link>
      <Link to={RouterPathsKeys.SIGN_IN} className={classes.link}>
        Create new account
      </Link>
      <Link to={RouterPathsKeys.MY_PROFILE} className={classes.link}>
        Your profile
      </Link>
      <Link
        to={RouterPathsKeys.SIGN_IN}
        className={classes.link}
        onClick={() => loginOut.logout()}
      >
        Log out
      </Link>
    </div>
  );
};
