import React from "react";
import classes from "./ForgotPassword.module.css";
import { Button } from "../../components/UI/Button";

type Props = {};

const ForgotPassword = (props: Props) => {
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className={classes.container}>
      <h3>Forgot password</h3>
      <form className={classes.inputForm} onSubmit={submitHandler}>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Repeat Email" />
        <Button>Restart password</Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
