import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { WarningModal } from "../../../components/Modals/warningModal";
import { StuffItem } from "../../../components/Stuff/StuffItem";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import { useCompanies } from "../../../core/hooks/Company/useCompanies";
import useInput from "../../../core/hooks/Inputs/useInputs";
import { parseErrorToString } from "../../../core/parseErrorToString";
import { AuthenticatedView } from "../../../core/wrappers/AuthenticatedView";
import { Stuff } from "../../../store/Companies/types";
import { RouterPathsKeys } from "../../../types";
import { isBoolean } from "../../../utils/isCheckers/isBooleans";

const validateNumber = (value: string) => parseInt(value) > 0;
const isNotEmpty = (value: string) => value.trim().length > 2;
const hasOnlyLetters = (value: string) => !/[^a-zżźółćśęąń]/i.test(value);
const correctTextInput = (value: string) =>
  isNotEmpty(value) && hasOnlyLetters(value);

export const CompanyDetails = () => {
  const {
    value: nameValue,
    inputBlurHandler: nameBlurHandler,
    valueChangeHandler: nameChangeHandler,
    isValid: nameIsValid,
    hasError: nameHasError,
  } = useInput(correctTextInput, "Name");

  const {
    value: quantityValue,
    inputBlurHandler: quantityBlurHandler,
    valueChangeHandler: quantityChangeHandler,
    isValid: quantityIsValid,
    hasError: quantityHasError,
  } = useInput(validateNumber, "0");

  const {
    value: prizeValue,
    inputBlurHandler: prizeBlurHandler,
    valueChangeHandler: prizeChangeHandler,
    isValid: prizeIsValid,
    hasError: prizeHasError,
  } = useInput(validateNumber, "0");

  const {
    value: descriptionValue,
    inputBlurHandler: descriptionBlurHandler,
    valueChangeHandler: descriptionChangeHandler,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
  } = useInput(isNotEmpty, "Description");

  const { id } = useParams();
  const navigate = useNavigate();

  const [formError, setFormError] = useState<string | undefined>(undefined);

  const [company, setCompany] = useState<
    boolean | Awaited<ReturnType<typeof fetchCompanyById>>
  >(false);

  const [stuffs, setStuffs] = useState<Stuff[]>([]);

  const { fetchCompanyById, addStuff, removeCompany, companiesLoading } =
    useCompanies({
      fetchOnMount: false,
    });

  useEffect(() => {
    if (id === undefined) {
      navigate(RouterPathsKeys.COMPANY);
    } else {
      fetchCompanyById(id).then((company) => {
        if (!isBoolean(company)) {
          setCompany(company);
          setStuffs(company.stuffs);
        } else {
          navigate(RouterPathsKeys.COMPANY);
        }
      });
    }
  }, []);

  const addStuffFormIsValid =
    quantityIsValid && descriptionIsValid && nameIsValid && prizeIsValid;

  const addStuffHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (addStuffFormIsValid && id) {
      try {
        const data = {
          quantity: parseInt(quantityValue),
          description: descriptionValue,
          prize: parseInt(prizeValue),
          companyId: id,
          name: nameValue,
        };

        const payload = await addStuff(data);

        setStuffs((stuffs) => [
          ...stuffs,
          {
            ...data,
            id: payload,
          },
        ]);
      } catch (error) {
        parseErrorToString(error, setFormError);
      }
    }
  };

  const onStuffDelete = (id: string) => {
    setStuffs((stuffs) => stuffs.filter((s) => s.id !== id));
  };

  return (
    <AuthenticatedView>
      <div className="container">
        {formError && <p>{formError}</p>}
        {!companiesLoading && !isBoolean(company) ? (
          <div>
            <h1 className="mx-3 my-2">Company</h1>
            <div className="col shadowBox m-2 px-3">
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
                  <h2 className="my-3">{company.name}</h2>
                  <h5 className="text-secondary m-0 p-0">
                    {company.street} {company.buildingNumber}
                  </h5>
                  <h5 className="text-secondary m-0 p-0">
                    {company.postalCode} {company.city}
                  </h5>
                </div>
              </div>
              <h1 className="py-2">Stuffs</h1>
              <ul className="m-0 p-0">
                {stuffs.map((stuff) => (
                  <StuffItem
                    stuff={stuff}
                    key={stuff.id}
                    setFormError={setFormError}
                    onStuffDelete={onStuffDelete}
                  />
                ))}
              </ul>

              <div className="row align-items-end my-0">
                <form
                  className="shadowBox my-4 col-9 p-3"
                  onSubmit={addStuffHandler}
                >
                  <div className="row">
                    <div className="col-4">
                      <input
                        type="text"
                        className={`mb-2 w-100 py-3 px-3 border border-2 ${
                          !nameHasError ? "border-dark" : "border-danger"
                        }`}
                        placeholder="Name"
                        value={nameValue}
                        onChange={nameChangeHandler}
                        onBlur={nameBlurHandler}
                        style={{ fontSize: 20, fontWeight: "bold" }}
                      />
                      <input
                        type="number"
                        className={`mb-2 w-100 py-3 px-3 border border-2 ${
                          !quantityHasError ? "border-dark" : "border-danger"
                        }`}
                        placeholder="Quantity"
                        value={quantityValue}
                        onChange={quantityChangeHandler}
                        onBlur={quantityBlurHandler}
                        style={{ fontSize: 20, fontWeight: "bold" }}
                      />

                      <input
                        type="number"
                        className={`mb-2 w-100 py-3 px-3 border border-2 ${
                          !prizeHasError ? "border-dark" : "border-danger"
                        }`}
                        placeholder="Quantity"
                        value={prizeValue}
                        onChange={prizeChangeHandler}
                        onBlur={prizeBlurHandler}
                        style={{ fontSize: 20, fontWeight: "bold" }}
                      />
                      <button
                        className="bg-success w-100 mt-5 border border-2 border-dark"
                        style={{ fontSize: 20 }}
                      >
                        Add stuff
                      </button>
                    </div>
                    <div className="col-8">
                      <textarea
                        placeholder="Description"
                        className={`mb-2 w-100 h-100 py-3 px-3 border border-2 ${
                          !descriptionHasError ? "border-dark" : "border-danger"
                        }`}
                        onBlur={descriptionBlurHandler}
                        onChange={descriptionChangeHandler}
                        value={descriptionValue}
                        style={{ fontSize: 20, fontWeight: "bold" }}
                      />
                    </div>
                  </div>
                </form>
                <div className="col-3">
                  <form id="deleteComp">
                    <WarningModal
                      body="Do you really want to delete this company?"
                      buttonBody="Delete company"
                      formId="deleteComp"
                      onClick={async () => {
                        if (id) {
                          try {
                            await removeCompany(id);
                            navigate(RouterPathsKeys.COMPANY);
                          } catch (error) {
                            parseErrorToString(error, setFormError);
                          }
                        }
                      }}
                      style="w-100 bg-danger my-4 h5"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </AuthenticatedView>
  );
};
