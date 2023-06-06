/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ReactNode, createContext, useState } from "react";

type Item = {
  name: string;
  quantity: number;
  price: number;
};

interface Order {
  id: string;
  name: string;
  items: {
    [itemName: string]: {
      name: string;
      quantity: number;
      price: number;
    };
  };
}

interface ContextProps {
  orders: Order[];
  addOrder: (
    name: string,
    items: { [itemName: string]: Item },
    count: number
  ) => void;
}

export const Context = createContext<ContextProps>({
  orders: [],
  addOrder: () => {},
});

interface ContextProviderProps {
  children: ReactNode;
}

export function ContextProvider({ children }: ContextProviderProps) {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (
    name: string,
    items: { [itemName: string]: Item },
    count: number
  ) => {
    for (let i = 0; i < count; i++) {
      const order: Order = {
        id: `order_${orders.length + 1}`,
        name,
        items,
      };
      setOrders((prevOrders) => [...prevOrders, order]);
    }
  };

  console.log("Tem order?", orders);

  return (
    <Context.Provider value={{ orders, addOrder }}>{children}</Context.Provider>
  );
}
