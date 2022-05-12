import React, { useState } from "react";
import { Button } from "../../components/UI/Button";
import { Link, useNavigate } from "react-router-dom";
import { RouterPathsKeys } from "../../types";
import classes from "./SignIn.module.css";
import { loginWithCredentials } from "../../store/SignIn/api";
import { useTypedDispatch } from "../../core/hooks/TypedDispatch/useTypedDispatch";
import { parseErrorToString } from "../../core/parseErrorToString";
import "bootstrap/dist/css/bootstrap.min.css";

export const SignIn = () => {
  const login = useTypedDispatch<typeof loginWithCredentials, void>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
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

        if (loginWithCredentials.rejected.match(result)) {
          throw result.payload;
        }
        setIsCancelled(true);

        setIsLoading(false);
        navigate(RouterPathsKeys.MY_PROFILE);
      } catch (error) {
        parseErrorToString(error, setFormError);
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={classes.container}>
      <h2>Logowanie</h2>
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
          placeholder="Hasło"
          onChange={(event) => setPassword(event.target.value)}
          required
          disabled={isLoading}
        />
        <Button disabled={isLoading} isCancelled={isCancelled}>
          Zaloguj sie
        </Button>
        {formError ? (
          <p color="red" className="mt-2 mb-0 w-100 text-center">
            {formError}
          </p>
        ) : null}
      </form>
    </div>
  );
};
