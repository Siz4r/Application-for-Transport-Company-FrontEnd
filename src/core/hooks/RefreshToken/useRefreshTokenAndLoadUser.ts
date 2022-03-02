import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { refreshToken } from "../../../store/SignIn/api";

/**
 * Hook for refreshing tokens on load
 */
export const useRefreshTokenAndLoadUser = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const dispatch = useDispatch<(foo: any) => Promise<any>>(); // TODO: custom hook for wrapping dispatch with proper typing

  useEffect(() => {
    setLoading(true);
    dispatch(refreshToken()).finally(() => {
      setLoading(false);
    });
  }, []);

  return {
    loading,
    authenticated,
  };
};
