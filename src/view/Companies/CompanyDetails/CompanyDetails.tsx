import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FormModal } from "../../../components/Modals/FormModal";
import { WarningModal } from "../../../components/Modals/warningModal";
import { StuffItem } from "../../../components/Stuff/StuffItem";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import { useCompanies } from "../../../core/hooks/Company/useCompanies";
import useInput from "../../../core/hooks/Inputs/useInputs";
import { useOrders } from "../../../core/hooks/Orders/useOrders";
import { useSelectUser } from "../../../core/hooks/SelectUser/useSelectUser";
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
  const navigate = useNavigate();
  const { role, user } = useSelectUser();

  const isAdmin = role === "Admins";

  if (role === "Employees") {
    navigate(RouterPathsKeys.MY_PROFILE);
  }

  const {
    value: nameValue,
    inputBlurHandler: nameBlurHandler,
    valueChangeHandler: nameChangeHandler,
    isValid: nameIsValid,
    hasError: nameHasError,
  } = useInput(correctTextInput, "");

  const {
    value: quantityValue,
    inputBlurHandler: quantityBlurHandler,
    valueChangeHandler: quantityChangeHandler,
    isValid: quantityIsValid,
    hasError: quantityHasError,
  } = useInput(validateNumber, "");

  const {
    value: prizeValue,
    inputBlurHandler: prizeBlurHandler,
    valueChangeHandler: prizeChangeHandler,
    isValid: prizeIsValid,
    hasError: prizeHasError,
  } = useInput(validateNumber, "");

  const {
    value: descriptionValue,
    inputBlurHandler: descriptionBlurHandler,
    valueChangeHandler: descriptionChangeHandler,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
  } = useInput(isNotEmpty, "");

  const { id } = useParams();

  const [formError, setFormError] = useState<string | undefined>(undefined);
  const [topQuantityRange, setTopQuantityRange] = useState(0);
  const [orderQuantity, setOrderQuantity] = useState(0);
  const [newOrderAdded, setNewOrderAdded] = useState<string | undefined>(
    undefined
  );
  const [orderStuffId, setOrderStuffId] = useState("");

  const [company, setCompany] = useState<
    boolean | Awaited<ReturnType<typeof fetchCompanyById>>
  >(false);

  const { editStuffData } = useCompanies({ fetchOnMount: false });

  const [stuffs, setStuffs] = useState<Stuff[]>([]);

  const { fetchCompanyById, addStuff, removeCompany, companiesLoading } =
    useCompanies({
      fetchOnMount: false,
    });

  const { orderAStuff } = useOrders({
    fetchOnMount: false,
  });

  const editStuffHandler = async (
    e: React.FormEvent,
    newQuantity: number,
    newPrize: number,
    stuff: Stuff,
    setEdited: (b: boolean) => void,
    parseErrorToString: any
  ) => {
    e.preventDefault();

    if (newQuantity >= 0 && newPrize > 0 && id) {
      try {
        await editStuffData({
          quantity: newQuantity,
          prize: newPrize,
          id: stuff.id,
        });

        const stuffToEdit = stuffs.find((s) => s.id === stuff.id);

        if (stuffToEdit) {
          const index = stuffs.indexOf(stuffToEdit);
          setStuffs((stuffs) => [
            ...stuffs.slice(0, index),
            {
              ...stuffToEdit,
              quantity: newQuantity,
              prize: newPrize,
            },
            ...stuffs.slice(index + 1),
          ]);
          if (index === 0) {
            setTopQuantityRange(newQuantity);
            setOrderQuantity(newQuantity / 2);
          }
          // setStuffs((await fetchCompanyById(id)).stuffs);
        }
        setEdited(true);
      } catch (error) {
        parseErrorToString(error, setFormError);
      }
    }
  };

  useEffect(() => {
    if (id === undefined) {
      navigate(RouterPathsKeys.COMPANY);
    } else {
      fetchCompanyById(id).then((company) => {
        if (!isBoolean(company)) {
          setCompany(company);
          setStuffs(company.stuffs);
          const temp = company.stuffs[0];
          console.log(temp);
          if (temp) {
            setTopQuantityRange(temp.quantity);
            setOrderStuffId(temp.id);
          }
        } else {
          navigate(RouterPathsKeys.COMPANY);
        }
      });
    }
  }, [setStuffs]);

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

        if (stuffs.length === 0) {
          setOrderQuantity(data.quantity / 2);
          setTopQuantityRange(data.quantity);
        }

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

  const addOrderHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isBoolean(user)) {
      if (orderStuffId && orderQuantity && user.id) {
        try {
          await orderAStuff(orderStuffId, user.id, orderQuantity);
          const stuff = stuffs.find((o) => o.id === orderStuffId);
          if (stuff) {
            const index = stuffs.indexOf(stuff);
            setStuffs((stuffs) => [
              ...stuffs.slice(0, index),
              {
                ...stuff,
                quantity: stuff.quantity - orderQuantity,
              },
              ...stuffs.slice(index + 1),
            ]);
          }

          setNewOrderAdded("Your order has been added!");
        } catch (error: any) {
          parseErrorToString(error.toString(), setFormError);
        }
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
            <h1 className="mx-3 my-2">Firma</h1>
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
                <div className="col-8 d-flex flex-row-reverse mb-5">
                  <FormModal
                    formId="orderForm"
                    buttonBody="Złóż zamówienie"
                    topText="Wybierz towar"
                  >
                    <form onSubmit={addOrderHandler} id="orderForm">
                      <Form.Group>
                        <Form.Label className="mt-2">Towar</Form.Label>
                        <Form.Select
                          className="mt-0"
                          onChange={(e) => {
                            const stuff = stuffs.find(
                              (s) => s.id === e.currentTarget.value
                            );
                            if (stuff) {
                              setTopQuantityRange(stuff.quantity);
                              setOrderQuantity(stuff.quantity / 2);
                              setOrderStuffId(stuff.id);
                            }
                          }}
                        >
                          {stuffs.map((s) => (
                            <option value={s.id} key={s.id}>
                              {s.name}
                            </option>
                          ))}
                        </Form.Select>
                        <Form.Label className="mt-2">
                          Ilość w tonach: {orderQuantity}
                        </Form.Label>
                        <Form.Range
                          min={1}
                          max={topQuantityRange}
                          onChange={(e) =>
                            setOrderQuantity(parseInt(e.currentTarget.value))
                          }
                          value={orderQuantity}
                        />
                      </Form.Group>
                    </form>
                  </FormModal>
                </div>
                {newOrderAdded && (
                  <p className="text-success text-center">{newOrderAdded}</p>
                )}
              </div>
              <h1 className="py-2">Towary</h1>
              <ul className="m-0 p-0">
                {stuffs.map((stuff) => (
                  <StuffItem
                    stuff={stuff}
                    key={stuff.id}
                    isAdmin={isAdmin}
                    setFormError={setFormError}
                    onStuffDelete={onStuffDelete}
                    editStuffHandler={editStuffHandler}
                  />
                ))}
              </ul>

              {isAdmin && (
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
                          placeholder="Nazwa"
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
                          placeholder="Ilość w tonach"
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
                          placeholder="Cena za tone"
                          value={prizeValue}
                          onChange={prizeChangeHandler}
                          onBlur={prizeBlurHandler}
                          style={{ fontSize: 20, fontWeight: "bold" }}
                        />
                        <button
                          className="bg-success w-100 mt-5 border border-2 border-dark"
                          style={{ fontSize: 20 }}
                        >
                          Dodaj towar
                        </button>
                      </div>
                      <div className="col-8">
                        <textarea
                          placeholder="Opis"
                          className={`mb-2 w-100 h-100 py-3 px-3 border border-2 ${
                            !descriptionHasError
                              ? "border-dark"
                              : "border-danger"
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
                        body="Czy napewno chcesz usunąć tą firmę?"
                        buttonBody="Usuń firme"
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
                        disableButton={false}
                        style="w-100 bg-danger my-4 h5"
                      />
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </AuthenticatedView>
  );
};
