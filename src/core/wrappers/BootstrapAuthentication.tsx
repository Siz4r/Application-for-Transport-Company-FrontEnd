import React from "react";
import { useRefreshTokenAndLoadUser } from "../hooks/RefreshToken/useRefreshTokenAndLoadUser";

interface OwnProps {}

interface StateProps {}

type TBootstrapAuthentication = OwnProps & StateProps;

/**
 * Wrapper that blocks rendering child components until it knows whether user has valid tokens or not
 */
export const BootstrapAuthentication: React.FC<TBootstrapAuthentication> = ({
  children,
}) => {
  const { loading } = useRefreshTokenAndLoadUser();

  if (loading) return null;

  return <>{children}</>;
};
