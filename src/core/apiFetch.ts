import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { LocalStorageKeys } from "../types/LocalStorageKeys";

const apiUrl = "http://localhost:5000";

type fetchArgs = {
  requestConfig: AxiosRequestConfig;
};

enum AuthorizationLevel {
  UNAUTHORIZED = "UNAUTHORIZED",
  AUTHORIZED = "AUTHORIZED",
  ANY = "ANY",
}

const calculateRemainingTime = (expirationTime: any) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const isJwtExpired = (expirationTime: any) => {
  const remainingTime = calculateRemainingTime(expirationTime);

  if (remainingTime < 60) {
    return true;
  }

  return false;
};

const getTokens = () => {
  const storedToken = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
  const storedExpirationTime = localStorage.getItem(LocalStorageKeys.EXP_TIME);

  if (isJwtExpired(storedExpirationTime)) {
    // const refreshToken = await unAuthFetch(
    //     fetchArgs: {
    //         method: "POST",
    //         headers: {
    //         }
    //     }
    // )
  }
};

const unAuthFetch = (args: fetchArgs, path: string): Promise<AxiosResponse> => {
  try {
    const response = axios(path, args.requestConfig);
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

// const authFetch = (args: fetchArgs, path: string): Promise<AxiosResponse> => {
//   const { requestConfig: requestLibraryConfig } = args;
//   let config = requestLibraryConfig;

//   const tokens = getTokens();
// };

export const apiFetch = async <RES>(
  url: string,
  args: fetchArgs,
  authLevel: AuthorizationLevel = AuthorizationLevel.UNAUTHORIZED
): Promise<RES> => {
  const path = `${apiUrl}${url}`;
  try {
    const response = await (async () => {
      if (authLevel === AuthorizationLevel.UNAUTHORIZED) {
        return await unAuthFetch(args, path);
        // } else if (authorizationLevel === AuthorizationLevel.AUTHORIZED) {
        //   return await authFetch(url, args);
        // } else if (authorizationLevel === AuthorizationLevel.ANY) {
        // Check if access token ok
        //   const tokens = await tokensHealthcheck();

        //   if (tokens === undefined) {
        //     return await unAuthFetch(url, args);
        //   } else {
        //     return await authFetch(url, args);
        //   }
      }
      return await unAuthFetch(args, path);
    })();
    if (response.status >= 400) throw new Error(response.statusText);

    return response.data as RES;
  } catch (error: any) {
    throw error;
  }
};
