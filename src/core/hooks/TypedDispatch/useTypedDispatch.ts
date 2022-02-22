import { useDispatch } from "react-redux";

export const useTypedDispatch = <T extends (...args: any) => any, R>() => {
  return useDispatch<
    (foo: ReturnType<T>) => Promise<{
      payload: R;
      meta: Record<string, string>;
      type: string;
      error?: {
        message: string;
        name: string;
        stack: string;
      };
    }>
  >();
};
