import React from "react";
import { Button } from "../../components";
import classes from "./NewPassword.module.css";

type Props = {};

const NewPassword = (props: Props) => {
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className={classes.container}>
      <h3>New password</h3>
      <form className={classes.inputForm} onSubmit={submitHandler}>
        <input type="text" placeholder="New Password" />
        <input type="password" placeholder="Repeat new password" />
        <Button>Set new password</Button>
      </form>
    </div>
  );
};

export default NewPassword;
