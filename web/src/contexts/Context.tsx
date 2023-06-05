/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ReactNode, createContext, useState } from "react";

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
  addOrder: (order: Order) => void;
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

  const addOrder = (order: Order) => {
    setOrders((prevOrders) => [...prevOrders, order]);
  };

  return (
    <Context.Provider value={{ orders, addOrder }}>{children}</Context.Provider>
  );
}
