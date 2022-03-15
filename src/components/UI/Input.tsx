import React from "react";
import classes from "./Input.module.css";

type Props = {
  labelText: string;
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FormEvent) => void;
  hasError: boolean;
};

export const Input = (props: Props) => {
  let inputStyleClass = props.hasError
    ? `${classes.invalid}`
    : `${classes.correct}`;

  return (
    <div className={classes.container}>
      <label htmlFor={props.id}>
        <h2>{props.labelText}</h2>
      </label>
      <input
        className={inputStyleClass}
        type={props.type}
        placeholder={props.placeholder}
        id={props.id}
        value={props.value}
        onBlur={props.onBlur}
        onChange={props.onChange}
      />
    </div>
  );
};
