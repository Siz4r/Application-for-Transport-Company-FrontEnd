import { logout } from "../../../store/SignIn/api";
import { useTypedDispatch } from "../TypedDispatch/useTypedDispatch";

/**
 * Returns a function responsible for handling all logout logic
 */
export const useLogout = () => {
  const typedDispatch = useTypedDispatch<typeof logout, void>();

  const logoutAction = async (): Promise<void> => {
    const { payload } = await typedDispatch(logout());
    return payload;
  };

  return { logout: logoutAction };
};
