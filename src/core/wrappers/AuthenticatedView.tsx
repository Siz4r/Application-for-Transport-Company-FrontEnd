import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../../components/NavBar/NavBar";
import { RouterPathsKeys } from "../../types";
import { isBoolean } from "../../utils/isCheckers/isBooleans";
import { useSelectUser } from "../hooks/SelectUser/useSelectUser";
import classes from "./AuthenticatedView.module.css";

type Props = {
  children: React.ReactNode;
};

export const AuthenticatedView = (props: Props) => {
  const { user, loading } = useSelectUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (loading || isBoolean(user)) {
      navigate(RouterPathsKeys.SIGN_IN);
    }
  }, []);

  if (loading || isBoolean(user)) {
    return null;
  }

  return (
    <div className={classes.container}>
      <NavBar />
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
