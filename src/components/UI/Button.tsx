import React, { useState } from "react";
import classes from "./Button.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

type Props = {
  children: React.ReactNode;
  isCancelled: boolean;
  disabled?: boolean;
};

export const Button = (props: Props) => {
  const [style, setStyle] = useState(`${classes.but} align-self-center`);

  const onClickHandler = () => {
    setStyle(`${classes.but} ${classes.bump}`);

    setTimeout(() => {
      if (props.isCancelled) {
        setStyle(`${classes.but}`);
      }
    }, 300);
  };

  return (
    <button
      className={style}
      onClick={onClickHandler}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};
