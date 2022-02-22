import React, { CSSProperties } from "react";
import classes from "./DataWrapper.module.css";

type Props = {
  children: React.ReactNode;
  style: CSSProperties;
};

export const DataWrapper = (props: Props) => {
  return (
    <div className={classes.container} style={props.style}>
      {props.children}
    </div>
  );
};
