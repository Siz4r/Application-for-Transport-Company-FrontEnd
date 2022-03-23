import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FormModal } from "../../components/Modals/FormModal";
import { ModalInput } from "../../components/Modals/ModalInput";
import { useClients } from "../../core/hooks/Clients/useClients";
import useInput from "../../core/hooks/Inputs/useInputs";
import { AuthenticatedView } from "../../core/wrappers/AuthenticatedView";
import { RouterPathsKeys } from "../../types";
import {
  correctTextInput,
  hasOnlyNumbers,
  isNotEmpty,
} from "../MyProfile/MyProfile";
import classes from "./Clients.module.css";

export const Clients = () => {
  const { clientsLoading, clients } = useClients({
    fetchOnMount: true,
  });

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

  const formIsValid =
    firstNameIsValid && phoneNumberIsValid && emailIsValid && lastNameIsValid;

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (formIsValid) {
    }
  };

  return (
    <AuthenticatedView>
      <div className="container">
        <div className="row m-2 d.flex flex-row-reverse">
          {!clientsLoading && clients.length < 1 ? (
            <p style={{ fontSize: "5vh" }}>You don't have any clients!</p>
          ) : (
            <ul className="list-group">
              {clients.map((e) => (
                <li key={e.id} className="list-group-item">
                  <div className="row my-2">
                    <div className="col-4">
                      <div className="row">
                        <img
                          src="https://res.cloudinary.com/siz4rimag/image/upload/v1644853870/443-4432362_fabric-fabric-icon-png-transparent-png_1_1_uv5fgp.png"
                          style={{ maxWidth: 200 }}
                          alt=""
                        />
                        <div className="col-4 align-self-center text-center m-4">
                          <h4>
                            {e.firstName} {e.lastName}
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 align-self-center">
                      <Link
                        to={RouterPathsKeys.CLIENT + e.id}
                        className={classes.link}
                      >
                        Client Details
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <FormModal formId="addCompany" buttonBody="Register a client">
            <form id="addCompany" onSubmit={submitHandler}>
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
        </div>
      </div>
    </AuthenticatedView>
  );
};
