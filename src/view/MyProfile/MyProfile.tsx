import classes from "./MyProfile.module.css";

import { AuthenticatedView } from "../../core/wrappers/AuthenticatedView";
import { Input } from "../../components/UI/Input";
import { useSelectUser } from "../../core/hooks/SelectUser/useSelectUser";
import { isBoolean } from "../../utils/isCheckers/isBooleans";
import { User } from "../../store/SignIn/types";
import useInput from "../../core/hooks/Inputs/useInputs";
import { useTypedDispatch } from "../../core/hooks/TypedDispatch/useTypedDispatch";
import { updateUserData } from "../../store/SignIn/api";
import { useState } from "react";
import { parseErrorToString } from "../../core/parseErrorToString";

export const isNotEmpty = (value: string) => value.trim().length > 2;
export const hasOnlyNumbers = (value: string) => /^\d+$/.test(value);
export const hasOnlyLetters = (value: string) =>
  !/[^a-zżźółćśęąń]/i.test(value);
export const correctTextInput = (value: string) =>
  isNotEmpty(value) && hasOnlyLetters(value);

const defaultAddressValues = {
  city: "",
  postalCode: "",
  street: "",
  buildingNumber: 0,
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  id: "",
  role: "",
};

export const MyProfile = () => {
  const { user } = useSelectUser();

  let userData: User = {
    ...defaultAddressValues,
  };

  if (!isBoolean(user)) {
    userData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      id: user.id,
      city: user.city,
      postalCode: user.postalCode,
      street: user.street,
      buildingNumber: user.buildingNumber,
      role: user.role,
    };
  }

  const {
    value: phoneNumberValue,
    isValid: phoneNumberIsValid,
    hasError: phoneNumberHasError,
    valueChangeHandler: phoneNumberChangeHandler,
    inputBlurHandler: phoneNumberBlurHandler,
  } = useInput(hasOnlyNumbers, userData.phoneNumber);

  const {
    value: cityValue,
    isValid: cityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
  } = useInput(correctTextInput, userData.city);

  const {
    value: streetValue,
    isValid: streetIsValid,
    hasError: streetHasError,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
  } = useInput(isNotEmpty, userData.street);

  const {
    value: buildingNumberValue,
    isValid: buildingNumberIsValid,
    hasError: buildingNumberHasError,
    valueChangeHandler: buildingNumberChangeHandler,
    inputBlurHandler: buildingNumberBlurHandler,
  } = useInput(hasOnlyNumbers, userData.buildingNumber.toString());

  const {
    value: postalCodeValue,
    isValid: postalCodeIsValid,
    hasError: postalCodeHasError,
    valueChangeHandler: postalCodeChangeHandler,
    inputBlurHandler: postalCodeBlurHandler,
  } = useInput(isNotEmpty, userData.postalCode);

  const [formError, setFormError] = useState<string | undefined>(undefined);
  const [isNewDataSet, setIsNewDataSet] = useState(false);

  const updateData = useTypedDispatch<typeof updateUserData, void>();

  let formIsValid = false;

  if (
    postalCodeIsValid &&
    buildingNumberIsValid &&
    streetIsValid &&
    cityIsValid &&
    phoneNumberIsValid
  ) {
    formIsValid = true;
  }

  const submitNewDataHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formIsValid) {
      try {
        const result = await updateData(
          updateUserData({
            id: userData.id,
            phoneNumber: phoneNumberValue,
            postalCode: postalCodeValue,
            city: cityValue,
            street: streetValue,
            buildingNumber: parseInt(buildingNumberValue),
          })
        );
        if (result) {
          throw result.payload;
        }
      } catch (error) {
        parseErrorToString(error, setFormError);
      }

      setIsNewDataSet(true);
    }
  };

  return (
    <AuthenticatedView>
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <div className={classes.userDetails}>
            <div className={classes.pic} />
            <div className={classes.userData}>
              <p>
                {userData.firstName} {userData.lastName}
              </p>
              <p>{userData.phoneNumber}</p>
              <p>{userData.email}</p>
            </div>
          </div>
          <form className={classes.formBox} onSubmit={submitNewDataHandler}>
            <p>
              Adres: {streetValue} {buildingNumberValue}
            </p>
            <p>
              {postalCodeValue} {cityValue}
            </p>
            <div className={classes.inputsBox}>
              <div className={classes.col}>
                <Input
                  id="phone"
                  placeholder="Phone number"
                  type="text"
                  labelText="Phone number:"
                  value={phoneNumberValue}
                  onChange={phoneNumberChangeHandler}
                  onBlur={phoneNumberBlurHandler}
                  hasError={phoneNumberHasError}
                  disabled={false}
                />
                <Input
                  id="city"
                  placeholder="City"
                  type="text"
                  labelText="City:"
                  value={cityValue}
                  onChange={cityChangeHandler}
                  onBlur={cityBlurHandler}
                  hasError={cityHasError}
                  disabled={false}
                />
              </div>
              <div className={classes.col}>
                <Input
                  id="postalCode"
                  placeholder="Postal code"
                  type="text"
                  labelText="Postal-code:"
                  value={postalCodeValue}
                  onChange={postalCodeChangeHandler}
                  onBlur={postalCodeBlurHandler}
                  hasError={postalCodeHasError}
                  disabled={false}
                />
                <Input
                  id="street"
                  placeholder="Street"
                  type="text"
                  labelText="Street:"
                  value={streetValue}
                  onChange={streetChangeHandler}
                  onBlur={streetBlurHandler}
                  hasError={streetHasError}
                  disabled={false}
                />
              </div>

              <div className={classes.col}>
                <Input
                  id="number"
                  placeholder="Building number"
                  type="text"
                  labelText="Building number:"
                  value={buildingNumberValue}
                  onBlur={buildingNumberBlurHandler}
                  onChange={buildingNumberChangeHandler}
                  hasError={buildingNumberHasError}
                  disabled={false}
                />

                <button className={classes.updateAddressBut}>
                  Set new data
                </button>
              </div>
            </div>
            {formError && <p className={classes.error}>{formError}</p>}
            {isNewDataSet && (
              <h3 className="text-success text-center">
                New data has been setted!
              </h3>
            )}
          </form>
        </div>
      </div>
    </AuthenticatedView>
  );
};
