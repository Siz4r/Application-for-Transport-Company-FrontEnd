import "react-bootstrap";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FormModal } from "../../components/Modals/FormModal";
import { ModalInput } from "../../components/Modals/ModalInput";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { useCompanies } from "../../core/hooks/Company/useCompanies";
import useInput from "../../core/hooks/Inputs/useInputs";
import { AuthenticatedView } from "../../core/wrappers/AuthenticatedView";
import { RouterPathsKeys } from "../../types";
import {
  correctTextInput,
  hasOnlyNumbers,
  isNotEmpty,
} from "../MyProfile/MyProfile";
import { useSelectUser } from "../../core/hooks/SelectUser/useSelectUser";

export const Companies = () => {
  const { companies, createCompany, companiesLoading } = useCompanies({
    fetchOnMount: true,
  });

  const navigate = useNavigate();
  const { role } = useSelectUser();

  if (role === "Employees") {
    navigate(RouterPathsKeys.MY_PROFILE);
  }

  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput(correctTextInput, "");
  const {
    value: cityValue,
    isValid: cityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
  } = useInput(correctTextInput, "");
  const {
    value: streetValue,
    isValid: streetIsValid,
    hasError: streetHasError,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
  } = useInput(isNotEmpty, "");

  const {
    value: buildingNumberValue,
    isValid: buildingNumberIsValid,
    hasError: buildingNumberHasError,
    valueChangeHandler: buildingNumberChangeHandler,
    inputBlurHandler: buildingNumberBlurHandler,
  } = useInput(hasOnlyNumbers, "");

  const {
    value: postalCodeValue,
    isValid: postalCodeIsValid,
    hasError: postalCodeHasError,
    valueChangeHandler: postalCodeChangeHandler,
    inputBlurHandler: postalCodeBlurHandler,
  } = useInput(isNotEmpty, "");

  const formIsValid =
    postalCodeIsValid &&
    nameIsValid &&
    buildingNumberIsValid &&
    streetIsValid &&
    cityIsValid;

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (formIsValid) {
      try {
        createCompany({
          name: nameValue,
          buildingNumber: parseInt(buildingNumberValue),
          postalCode: postalCodeValue,
          street: streetValue,
          city: cityValue,
        });
      } catch (error) {}
    }
  };

  return (
    <AuthenticatedView>
      <div className="container text-center">
        {!companiesLoading ? (
          companies.length !== 0 ? (
            <div className="row m-2 d.flex flex-row-reverse">
              <ul className="list-group">
                {companies.map((c) => (
                  <li className="list-group-item" key={c.id}>
                    <div className="row my-2 align-items-center">
                      <div className="col-2">
                        <img
                          src="https://res.cloudinary.com/siz4rimag/image/upload/v1646418562/443-4432362_fabric-fabric-icon-png-transparent-png_1_xkyvh4.png"
                          alt=""
                          className="img-fluid"
                          style={{ maxHeight: 183 }}
                        />
                      </div>
                      <div className="col-2 text-center">
                        <h2 className="my-3">{c.name}</h2>
                        <h5 className="text-secondary m-0 p-0">
                          {c.address.street} {c.address.buildingNumber}
                        </h5>
                        <h5 className="text-secondary m-0 p-0">
                          {c.address.postalCode} {c.address.city}
                        </h5>
                      </div>
                      <div className="col-4 text-center">
                        <Link
                          to={RouterPathsKeys.COMPANY + c.id}
                          className="text-primary"
                        >
                          <h1>Company Details</h1>
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <h2>You have no registered companys!</h2>
          )
        ) : (
          <LoadingSpinner />
        )}
        {role === "Admins" && (
          <FormModal formId="addCompany" buttonBody="Add company">
            <form id="addCompany" onSubmit={submitHandler}>
              <Form.Group>
                <Form.Label className="mt-2">Name:</Form.Label>
                <ModalInput
                  type="text"
                  placeholder="Name"
                  value={nameValue}
                  onChange={nameChangeHandler}
                  onBlur={nameBlurHandler}
                  hasError={nameHasError}
                />
                <Form.Label className="mt-2">City:</Form.Label>
                <ModalInput
                  type="text"
                  placeholder="City"
                  value={cityValue}
                  onChange={cityChangeHandler}
                  onBlur={cityBlurHandler}
                  hasError={cityHasError}
                />

                <Form.Label className="mt-2">Postal Code:</Form.Label>
                <ModalInput
                  type="text"
                  placeholder="Postal Code"
                  value={postalCodeValue}
                  onChange={postalCodeChangeHandler}
                  onBlur={postalCodeBlurHandler}
                  hasError={postalCodeHasError}
                />

                <Form.Label className="mt-2">Street:</Form.Label>
                <ModalInput
                  type="text"
                  placeholder="Street"
                  value={streetValue}
                  onChange={streetChangeHandler}
                  onBlur={streetBlurHandler}
                  hasError={streetHasError}
                />

                <Form.Label className="mt-2">Building number:</Form.Label>
                <ModalInput
                  type="number"
                  placeholder="Building number"
                  value={buildingNumberValue}
                  onChange={buildingNumberChangeHandler}
                  onBlur={buildingNumberBlurHandler}
                  hasError={buildingNumberHasError}
                />
              </Form.Group>
            </form>
          </FormModal>
        )}
      </div>
    </AuthenticatedView>
  );
};
