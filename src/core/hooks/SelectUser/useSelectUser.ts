import { UserEntity } from "../../../store/SignIn/slice";
import { RootState } from "../../../store/index";
import { useSelector } from "react-redux";
import { IuserSlice } from "../../../store/SignIn/slice";

export const useSelectUser = () => {
  const user = useSelector<RootState>(({ user }) => user) as IuserSlice;

  return {
    loading: user.loading,
    isAuthenticated: user as Object,
    user: user.user as UserEntity,
  };
};
