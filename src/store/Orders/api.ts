import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { apiFetch, AuthorizationLevel } from "../../core/apiFetch";
import { serializeOrderDetails } from "./serializers/serializeOrderDetails";
import { serializeOrders } from "./serializers/serializeOrders";
import {
  Employee,
  Order,
  OrderDetails,
  OrderDetailsResponse,
  OrderResponse,
} from "./types";

export const getOrders = createAsyncThunk<Order[], void, {}>(
  "orders/get",
  async (_, thunkAPI) => {
    try {
      const response = await apiFetch<OrderResponse[]>(
        "/api/orders/",
        {
          requestConfig: {
            method: "GET",
            withCredentials: true,
          },
        },
        AuthorizationLevel.AUTHORIZED
      );

      return serializeOrders(response);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrderById = createAsyncThunk<OrderDetails, { id: string }, {}>(
  "orders/getById",
  async ({ id }, thunkAPI) => {
    try {
      const response = await apiFetch<OrderDetailsResponse>(
        `/api/orders/${id}`,
        {
          requestConfig: {
            method: "GET",
            withCredentials: true,
          },
        },
        AuthorizationLevel.AUTHORIZED
      );

      return serializeOrderDetails(response);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateOrder = createAsyncThunk<
  AxiosResponse,
  { id: string; quantity: number },
  {}
>("orders/updateQuantity", async ({ id, quantity }, thunkAPI) => {
  try {
    return await apiFetch<AxiosResponse>(
      `/api/orders/${id}`,
      {
        requestConfig: {
          method: "PATCH",
          withCredentials: true,
          data: JSON.stringify({
            amount: quantity,
          }),
        },
      },
      AuthorizationLevel.AUTHORIZED
    );
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const assigneEmployeeToOrder = createAsyncThunk<
  AxiosResponse,
  { id: string; employee: Employee },
  {}
>("orders/assigneEmployee", async ({ id, employee }, thunkAPI) => {
  try {
    return await apiFetch<AxiosResponse>(
      `/api/employees/${employee.id}/orders/${id}`,
      {
        requestConfig: {
          method: "POST",
          withCredentials: true,
        },
      },
      AuthorizationLevel.AUTHORIZED
    );
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const changeOrderState = createAsyncThunk<void, { id: string }, {}>(
  "orders/changeOrderState",
  async ({ id }, thunkAPI) => {
    try {
      await apiFetch(
        `/api/orders/${id}`,
        {
          requestConfig: {
            method: "PUT",
            withCredentials: true,
          },
        },
        AuthorizationLevel.AUTHORIZED
      );
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addOrder = createAsyncThunk<
  void,
  { stuffId: string; amount: number },
  {}
>("orders/addOrder", async ({ stuffId, amount }, thunkAPI) => {
  try {
    await apiFetch(
      `/api/orders/${stuffId}`,
      {
        requestConfig: {
          data: JSON.stringify({
            amount: amount,
          }),
          method: "POST",
          withCredentials: true,
        },
      },
      AuthorizationLevel.AUTHORIZED
    );
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
