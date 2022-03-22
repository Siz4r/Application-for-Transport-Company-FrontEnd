import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { isBoolean } from "../../utils/isCheckers/isBooleans";
import {
  addOrder,
  assigneEmployeeToOrder,
  changeOrderState,
  getOrderById,
  getOrders,
  updateOrder,
} from "./api";
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

    builder.addCase(assigneEmployeeToOrder.fulfilled, (state, action) => {
      if (!isBoolean(state.orderDetails)) {
        state.orderDetails.employee = action.meta.arg.employee;
      }
    });

    builder.addCase(changeOrderState.fulfilled, (state) => {
      if (!isBoolean(state.orderDetails)) {
        state.orderDetails.done = !state.orderDetails.done;
      }
    });

    builder.addMatcher(
      isAnyOf(
        getOrders.pending,
        getOrderById.pending,
        updateOrder.pending,
        assigneEmployeeToOrder.pending,
        changeOrderState.pending,
        addOrder.pending
      ),
      (state) => {
        state.loading = true;
      }
    );

    builder.addMatcher(
      isAnyOf(
        getOrders.fulfilled,
        getOrders.rejected,
        getOrderById.fulfilled,
        getOrderById.rejected,
        updateOrder.fulfilled,
        updateOrder.rejected,
        assigneEmployeeToOrder.fulfilled,
        assigneEmployeeToOrder.rejected,
        changeOrderState.fulfilled,
        changeOrderState.rejected,
        addOrder.fulfilled,
        addOrder.rejected
      ),
      (state) => {
        state.loading = false;
      }
    );
  },
});
