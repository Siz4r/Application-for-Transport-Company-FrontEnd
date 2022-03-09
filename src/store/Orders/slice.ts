import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getOrderById, getOrders } from "./api";
import { Order, OrderDetails } from "./types";

type OrderEntity = OrderDetails | boolean;

interface IordersSlice {
  orders: Order[];
  orderDetails: OrderEntity;
  loading: boolean;
}

export const ordersSlice = createSlice<IordersSlice, {}>({
  name: "orders",
  initialState: {
    orders: [],
    orderDetails: false,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });

    builder.addCase(getOrderById.fulfilled, (state, action) => {
      state.orderDetails = action.payload;
    });

    builder.addMatcher(
      isAnyOf(getOrders.pending, getOrderById.pending),
      (state) => {
        state.loading = true;
      }
    );

    builder.addMatcher(
      isAnyOf(
        getOrders.fulfilled,
        getOrders.rejected,
        getOrderById.fulfilled,
        getOrderById.rejected
      ),
      (state) => {
        state.loading = false;
      }
    );
  },
});
