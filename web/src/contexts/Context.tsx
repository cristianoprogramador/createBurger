/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ReactNode, createContext, useState } from "react";
import Cookies from "js-cookie";

interface User {
  id: number;
  name: string;
  email: string;
  // Add any other relevant user properties here
}

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
  image: string;
}

interface ContextProps {
  orders: Order[];
  addOrder: (
    name: string,
    items: { [itemName: string]: Item },
    count: number,
    image: string
  ) => void;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

export const Context = createContext<ContextProps>({
  orders: [],
  addOrder: () => {},
  user: null,
  login: () => {},
  logout: () => {},
});

interface ContextProviderProps {
  children: ReactNode;
}

export function ContextProvider({ children }: ContextProviderProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const storedUser = Cookies.get("user");
  const initialUser = storedUser ? JSON.parse(storedUser) : null;
  const [user, setUser] = useState<User | null>(initialUser);

  const addOrder = (
    name: string,
    items: { [itemName: string]: Item },
    count: number,
    image: string
  ) => {
    for (let i = 0; i < count; i++) {
      const order: Order = {
        id: `order_${orders.length + 1}`,
        name,
        items,
        image,
      };
      setOrders((prevOrders) => [...prevOrders, order]);
    }
  };

  const login = (userData: User) => {
    setUser(userData);
    Cookies.set("user", JSON.stringify(userData), { expires: 7 }); // Armazena o usuário em um cookie com expiração de 7 dias
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("user");
  };

  return (
    <Context.Provider value={{ orders, addOrder, user, login, logout }}>
      {children}
    </Context.Provider>
  );
}
