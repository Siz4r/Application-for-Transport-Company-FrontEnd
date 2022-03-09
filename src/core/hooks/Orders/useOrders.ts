import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { getOrderById, getOrders } from "../../../store/Orders/api";
import { Order, OrderDetails } from "../../../store/Orders/types";
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

  const fetchOnMount = config && config.fetchOnMount === false ? false : true;
  const [ordersLoading, setOrdersLoading] = useState(
    fetchOnMount ? true : false
  );

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
    ordersLoading,
    orders,
  };
};
