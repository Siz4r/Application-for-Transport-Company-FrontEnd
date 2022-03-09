import React, { useState } from "react";
import { Button } from "../../components/UI/Button";
import { Link, useNavigate } from "react-router-dom";
import { RouterPathsKeys } from "../../types";
import classes from "./SignIn.module.css";
import { loginWithCredentials } from "../../store/SignIn/api";
import { useTypedDispatch } from "../../core/hooks/TypedDispatch/useTypedDispatch";
import { parseErrorToString } from "../../core/parseErrorToString";
import "bootstrap/dist/css/bootstrap.min.css";

type Props = {};

export const SignIn = (props: Props) => {
  const login = useTypedDispatch<typeof loginWithCredentials, void>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username && password) {
      setIsLoading(true);
      try {
        const result = await login(
          loginWithCredentials({ username, password })
        );
        if (result.error) {
          throw result.payload;
        }
      } catch (error) {
        parseErrorToString(error, setFormError);
      }
      setIsLoading(false);
    }

    navigate(RouterPathsKeys.MY_PROFILE);
  };

  return (
    <div className={classes.container}>
      <h2>Sign in</h2>
      <form className={classes.inputForm} onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Login"
          onChange={(event) => setUsername(event.target.value)}
          required
          disabled={isLoading}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
          required
          disabled={isLoading}
        />
        {formError ? <p color="red">{formError}</p> : null}
        <Button disabled={isLoading}>Login</Button>
        <Link
          to={RouterPathsKeys.FORGOT_PASSWORD}
          className={classes.linkForgotPassword}
        >
          Forgot password
        </Link>
      </form>
    </div>
  );
};
