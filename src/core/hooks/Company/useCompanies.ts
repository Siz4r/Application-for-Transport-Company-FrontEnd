import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { getCompanies } from "../../../store/Companies/api";
import { Company } from "../../../store/Companies/types";
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
    companies,
    companiesLoading,
  };
};
