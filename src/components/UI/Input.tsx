import React from "react";
import classes from "./Input.module.css";

type Props = {
  labelText: string;
  id: string;
  type: string;
  placeholder: string;
  value: string | number;
};

export const Input = (props: Props) => {
  return (
    <div className={classes.container}>
      <label htmlFor={props.id}>{props.labelText}</label>
      <input
        type={props.type}
        placeholder={props.placeholder}
        id={props.id}
        value={props.value}
      />
    </div>
  );
};
