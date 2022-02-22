import React from "react";
import { Link } from "react-router-dom";
import { RouterPathsKeys } from "../../types";
import classes from "./NavBar.module.css";

type Props = {};

export const NavBar = (props: Props) => {
  return (
    <div className={classes.container}>
      <Link to={RouterPathsKeys.SIGN_IN} className={classes.link}>
        Orders
      </Link>
      <Link to={RouterPathsKeys.SIGN_IN} className={classes.link}>
        Employees
      </Link>
      <Link to={RouterPathsKeys.SIGN_IN} className={classes.link}>
        Clients
      </Link>
      <Link to={RouterPathsKeys.SIGN_IN} className={classes.link}>
        Chat
      </Link>
      <Link to={RouterPathsKeys.SIGN_IN} className={classes.link}>
        Your files
      </Link>
      <Link to={RouterPathsKeys.SIGN_IN} className={classes.link}>
        Companys
      </Link>
      <Link to={RouterPathsKeys.SIGN_IN} className={classes.link}>
        Create new account
      </Link>
      <Link to={RouterPathsKeys.MY_PROFILE} className={classes.link}>
        Your profile
      </Link>
      <Link to={RouterPathsKeys.SIGN_IN} className={classes.link}>
        Log out
      </Link>
    </div>
  );
};
