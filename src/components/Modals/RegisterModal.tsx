import React, { useState } from "react";
import { Form } from "react-bootstrap";
import useInput from "../../core/hooks/Inputs/useInputs";
import { parseErrorToString } from "../../core/parseErrorToString";
import { RegisterData } from "../../utils/types";
import {
  correctTextInput,
  hasOnlyNumbers,
  isNotEmpty,
} from "../../view/MyProfile/MyProfile";
import { FormModal } from "./FormModal";
import { ModalInput } from "./ModalInput";

type Props = {
  submit: (data: RegisterData) => void;
  buttonBody: string;
};

export const RegisterModal = (props: Props) => {
  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
  } = useInput(correctTextInput, "");
  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
  } = useInput(correctTextInput, "");
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(isNotEmpty, "");
  const {
    value: phoneNumberValue,
    isValid: phoneNumberIsValid,
    hasError: phoneNumberHasError,
    valueChangeHandler: phoneNumberChangeHandler,
    inputBlurHandler: phoneNumberBlurHandler,
  } = useInput(hasOnlyNumbers, "");

  const [userRegistered, setUserRegistered] = useState(false);
  const [formError, setFormError] = useState<undefined | string>(undefined);

  const formIsValid =
    firstNameIsValid && phoneNumberIsValid && emailIsValid && lastNameIsValid;

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formIsValid) {
      try {
        await props.submit({
          firstName: firstNameValue,
          lastName: lastNameValue,
          phoneNumber: phoneNumberValue,
          email: emailValue,
        });
        setUserRegistered(true);
      } catch (error: any) {
        parseErrorToString(error.toString(), setFormError);
      }
    }
  };

  return (
    <React.Fragment>
      {userRegistered && (
        <p className="text-success">User registered succesfully!</p>
      )}
      {formError && <p className="text-danger">{formError}</p>}
      <FormModal formId="form" buttonBody={props.buttonBody}>
        <form id="form" onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label className="mt-2">First Name:</Form.Label>
            <ModalInput
              type="text"
              placeholder="First name"
              value={firstNameValue}
              onChange={firstNameChangeHandler}
              onBlur={firstNameBlurHandler}
              hasError={firstNameHasError}
            />
            <Form.Label className="mt-2">Last Name:</Form.Label>
            <ModalInput
              type="text"
              placeholder="Last Name"
              value={lastNameValue}
              onChange={lastNameChangeHandler}
              onBlur={lastNameBlurHandler}
              hasError={lastNameHasError}
            />

            <Form.Label className="mt-2">Email:</Form.Label>
            <ModalInput
              type="text"
              placeholder="Email"
              value={emailValue}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              hasError={emailHasError}
            />

            <Form.Label className="mt-2">Phonenumber:</Form.Label>
            <ModalInput
              type="text"
              placeholder="Phonenumber"
              value={phoneNumberValue}
              onChange={phoneNumberChangeHandler}
              onBlur={phoneNumberBlurHandler}
              hasError={phoneNumberHasError}
            />
          </Form.Group>
        </form>
      </FormModal>
    </React.Fragment>
  );
};
