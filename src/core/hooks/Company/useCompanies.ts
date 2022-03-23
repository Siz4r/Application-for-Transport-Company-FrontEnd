import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  addCompany,
  addStuffToCompany,
  deleteCompany,
  deleteStuffFromCompany,
  editStuff,
  getCompanies,
  getCompanyById,
} from "../../../store/Companies/api";
import {
  AddCompanyData,
  AddStuffData,
  Company,
  CompanyDetails,
} from "../../../store/Companies/types";
import { useTypedDispatch } from "../TypedDispatch/useTypedDispatch";

type UseCompaniesConfig = {
  fetchOnMount?: boolean;
};

export const useCompanies = (
  config: UseCompaniesConfig | undefined = undefined
) => {
  const typedDispatchGetCompanies = useTypedDispatch<
    typeof getCompanies,
    Company[]
  >();

  const typedDispatchGetCompanyById = useTypedDispatch<
    typeof getCompanyById,
    CompanyDetails
  >();

  const typedDispatchAddStuff = useTypedDispatch<
    typeof addStuffToCompany,
    string
  >();

  const typedDispatchEditStuff = useTypedDispatch<typeof editStuff, string>();

  const typedDispatchDeleteStuff = useTypedDispatch<
    typeof deleteStuffFromCompany,
    string
  >();

  const typedDispatchDeleteCompany = useTypedDispatch<
    typeof deleteCompany,
    string
  >();

  const typedDispatchAddCompany = useTypedDispatch<typeof addCompany, string>();

  const fetchOnMount = config && config.fetchOnMount === false ? false : true;

  const [companiesLoading, setCompaniesLoading] = useState(
    fetchOnMount ? true : false
  );

  const companies = useSelector<RootState>(({ companies }) => {
    return companies.companies;
  }) as Company[];

  const fetchCompanies = async () => {
    setCompaniesLoading(true);
    const { payload } = await typedDispatchGetCompanies(getCompanies());
    setCompaniesLoading(false);
    return payload;
  };

  const fetchCompanyById = async (id: string) => {
    try {
      setCompaniesLoading(true);
      const { payload } = await typedDispatchGetCompanyById(
        getCompanyById({ id })
      );
      setCompaniesLoading(false);
      return payload;
    } catch (error) {
      throw error;
    }
  };

  const addStuff = async (data: AddStuffData) => {
    try {
      setCompaniesLoading(true);
      const { payload } = await typedDispatchAddStuff(addStuffToCompany(data));
      setCompaniesLoading(false);
      return payload;
    } catch (error) {
      throw error;
    }
  };

  const removeStuff = async (id: string) => {
    setCompaniesLoading(true);
    await typedDispatchDeleteStuff(deleteStuffFromCompany({ id }));
    setCompaniesLoading(false);
  };

  const editStuffData = async (data: {
    quantity: number;
    prize: number;
    id: string;
  }) => {
    try {
      setCompaniesLoading(true);
      const { payload } = await typedDispatchEditStuff(
        editStuff({ quantity: data.quantity, prize: data.prize, id: data.id })
      );
      if (payload) throw payload;
      setCompaniesLoading(false);
      return payload;
    } catch (error) {
      throw error;
    }
  };

  const removeCompany = async (id: string) => {
    try {
      setCompaniesLoading(true);
      const { payload } = await typedDispatchDeleteCompany(
        deleteCompany({ id })
      );
      if (payload) throw payload;
      setCompaniesLoading(false);
      return payload;
    } catch (error) {
      throw error;
    }
  };

  const createCompany = async (data: AddCompanyData) => {
    setCompaniesLoading(true);
    const { payload } = await typedDispatchAddCompany(addCompany(data));
    setCompaniesLoading(false);
    return payload;
  };

  useEffect(() => {
    if (fetchOnMount) {
      try {
        fetchCompanies();
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return {
    fetchCompanies,
    fetchCompanyById,
    addStuff,
    editStuffData,
    removeStuff,
    removeCompany,
    createCompany,
    companies,
    companiesLoading,
  };
};
