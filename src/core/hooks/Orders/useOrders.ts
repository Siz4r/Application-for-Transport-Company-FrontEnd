import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  addOrder,
  assigneEmployeeToOrder,
  changeOrderState,
  getOrderById,
  getOrders,
  updateOrder,
} from "../../../store/Orders/api";
import { Employee, Order, OrderDetails } from "../../../store/Orders/types";
import { useTypedDispatch } from "../TypedDispatch/useTypedDispatch";

type UseOrdersConfig = {
  fetchOnMount?: boolean;
};

export const useOrders = (config: UseOrdersConfig | undefined = undefined) => {
  const typedDispatchGetOrders = useTypedDispatch<typeof getOrders, Order[]>();

  const typedDispatchGetOrderById = useTypedDispatch<
    typeof getOrderById,
    OrderDetails
  >();

  const typedDispatchUpdateOrder = useTypedDispatch<
    typeof updateOrder,
    string
  >();

  const typedDispatchAssigneOrderToEmployee = useTypedDispatch<
    typeof assigneEmployeeToOrder,
    string
  >();

  const typedDispatchChangeOrderState = useTypedDispatch<
    typeof changeOrderState,
    string
  >();

  const fetchOnMount = config && config.fetchOnMount === false ? false : true;
  const [ordersLoading, setOrdersLoading] = useState(
    fetchOnMount ? true : false
  );

  const typedDispatchAddOrder = useTypedDispatch<typeof addOrder, string>();

  const orders = useSelector<RootState>(({ orders }) => {
    return orders.orders;
  }) as Order[];

  const fetchOrders = async (): Promise<Order[]> => {
    setOrdersLoading(true);
    const { payload } = await typedDispatchGetOrders(getOrders());
    setOrdersLoading(false);
    return payload;
  };

  const fetchOrderById = async (id: string): Promise<OrderDetails> => {
    setOrdersLoading(true);
    const { payload } = await typedDispatchGetOrderById(
      getOrderById({ id: id })
    );
    setOrdersLoading(false);
    return payload;
  };

  const updateOrderQuantity = async (id: string, quantity: number) => {
    setOrdersLoading(true);
    await typedDispatchUpdateOrder(updateOrder({ id: id, quantity: quantity }));
    setOrdersLoading(false);
  };

  const assigneEmployee = async (id: string, employee: Employee) => {
    setOrdersLoading(true);
    await typedDispatchAssigneOrderToEmployee(
      assigneEmployeeToOrder({ id, employee })
    );
    setOrdersLoading(false);
  };

  const updateOrderState = async (id: string) => {
    setOrdersLoading(true);
    await typedDispatchChangeOrderState(changeOrderState({ id }));
    setOrdersLoading(false);
  };

  const orderAStuff = async (
    stuffId: string,
    clientId: string,
    amount: number
  ) => {
    setOrdersLoading(true);
    await typedDispatchAddOrder(
      addOrder({ stuffId: stuffId, clientId: clientId, amount: amount })
    );
    setOrdersLoading(false);
  };

  useEffect(() => {
    if (fetchOnMount) {
      try {
        fetchOrders();
      } catch (error: any) {
        throw new Error(error);
      }
    }
  }, []);

  return {
    fetchOrders,
    fetchOrderById,
    updateOrderQuantity,
    assigneEmployee,
    updateOrderState,
    orderAStuff,
    ordersLoading,
    orders,
  };
};
