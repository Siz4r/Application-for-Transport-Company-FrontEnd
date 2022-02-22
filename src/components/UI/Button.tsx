import React, { useState } from "react";
import classes from "./Button.module.css";

type Props = {
  children: React.ReactNode;
  disabled?: boolean;
};

export const Button = (props: Props) => {
  const [style, setStyle] = useState(`${classes.but}`);

  const onClickHandler = (event: React.MouseEvent) => {
    setStyle(`${classes.but} ${classes.bump}`);

    setTimeout(() => {
      setStyle(`${classes.but}`);
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
