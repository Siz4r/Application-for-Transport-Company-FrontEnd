import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import decode from "jwt-decode";
import localStorage from "redux-persist/es/storage";
import { LocalStorageKeys } from "../types/LocalStorageKeys";
import { Token } from "../types/Token";

const apiUrl = "http://localhost:5000";

type fetchArgs = {
  requestConfig: AxiosRequestConfig;
};

export enum AuthorizationLevel {
  UNAUTHORIZED = "UNAUTHORIZED",
  AUTHORIZED = "AUTHORIZED",
  ANY = "ANY",
}

const isJwtExpired = (jwt: string) => {
  try {
    const decoded: { exp: number } = decode(jwt, { header: false });
    if (!decoded || !decoded.exp) return false;

    if (decoded.exp * 1000 <= new Date().getTime()) return true;

    return false;
  } catch (error) {
    return false;
  }
};

const getTokens = async (): Promise<Token | undefined> => {
  let storedToken = await localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);

  if (!storedToken) return undefined;

  if (isJwtExpired(storedToken)) {
    const response = await unAuthFetch(
      {
        requestConfig: {
          method: "POST",
          withCredentials: true,
        },
      },
      `${apiUrl}/auth/refresh_token`
    );

    if (response.status >= 400) return undefined;

    const { accessToken } = response.data;

    localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, accessToken);

    storedToken = accessToken as string;
  }

  return {
    accessToken: storedToken,
  };
};

const unAuthFetch = (args: fetchArgs, path: string): Promise<AxiosResponse> => {
  try {
    const response = axios(path, args.requestConfig);
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const authFetch = async (
  args: fetchArgs,
  path: string
): Promise<AxiosResponse> => {
  try {
    const { requestConfig: requestLibraryConfig } = args;
    let config = requestLibraryConfig;
    const tokens = await getTokens();

    if (!tokens) throw new Error("Refresh and access tokens expired!");
    const response = axios(path, {
      ...config,
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

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
      } else if (authLevel === AuthorizationLevel.AUTHORIZED) {
        return await authFetch(args, path);
      } else if (authLevel === AuthorizationLevel.ANY) {
        const tokens = await getTokens();

        if (tokens === undefined) {
          return await unAuthFetch(args, url);
        } else {
          return await authFetch(args, url);
        }
      }
      return await unAuthFetch(args, path);
    })();

    if (response.status >= 400) {
      throw new Error(response.data);
    }

    return response.data as RES;
  } catch (error: any) {
    throw error.response.data;
  }
};
