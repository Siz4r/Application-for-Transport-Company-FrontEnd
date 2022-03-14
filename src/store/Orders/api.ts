import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { apiFetch, AuthorizationLevel } from "../../core/apiFetch";
import { serializeOrderDetails } from "./serializers/serializeOrderDetails";
import { serializeOrders } from "./serializers/serializeOrders";
import {
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
  void,
  { id: string; quantity: number },
  {}
>("orders/updateQuantity", async ({ id, quantity }, thunkAPI) => {
  try {
    await apiFetch<AxiosResponse>(
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
