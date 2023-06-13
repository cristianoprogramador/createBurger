/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ReactNode, createContext, useState } from "react";
import Cookies from "js-cookie";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserAddress {
  id: number;
  name: string;
  email: string;
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
}

type Item = {
  item_name: string;
  quantity: number;
  price: number;
};

interface Order {
  name_id: string;
  name: string;
  items: {
    [itemName: string]: {
      item_name: string;
      quantity: number;
      price: number;
    };
  };
  image: string;
  type: string;
  value: string;
  description: string;
}

interface ContextProps {
  orders: Order[];
  addOrder: (
    name: string,
    items: { [itemName: string]: Item },
    count: number,
    image: string,
    type: string,
    value: string,
    description: string
  ) => void;
  editOrder: (
    name_id: string,
    name: string,
    items: { [itemName: string]: Item },
    count: number,
    image: string,
    type: string,
    value: string,
    description: string
  ) => void;
  removeOrder: (orderNameId: string) => void;
  clearCart: () => void;
  user: User | null;
  login: (userData: User) => void;
  updateUser: (userData: UserAddress) => void;
  logout: () => void;
}

export const Context = createContext<ContextProps>({
  orders: [],
  addOrder: () => {},
  editOrder: () => {},
  removeOrder: () => {},
  clearCart: () => {},
  user: null,
  login: () => {},
  updateUser: () => {},
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
    image: string,
    type: string,
    value: string,
    description: string
  ) => {
    for (let i = 0; i < count; i++) {
      const order: Order = {
        name_id: `order_${orders.length + 1}`,
        name,
        items,
        image,
        type,
        value,
        description,
      };
      setOrders((prevOrders) => [...prevOrders, order]);
    }
  };

  const removeOrder = (orderNameId: string) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.name_id !== orderNameId)
    );
  };

  const clearCart = () => {
    setOrders([]); // Limpa o carrinho definindo o estado orders como um array vazio
  };

  const editOrder = (
    name_id: string,
    name: string,
    items: { [itemName: string]: Item },
    count: number,
    image: string,
    type: string,
    value: string,
    description: string
  ) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.name_id !== name_id)
    );

    for (let i = 0; i < count; i++) {
      const order: Order = {
        name_id,
        name,
        items,
        image,
        type,
        value,
        description,
      };
      setOrders((prevOrders) => [...prevOrders, order]);
    }
  };

  const login = (userData: User) => {
    setUser(userData);
    Cookies.set("user", JSON.stringify(userData), { expires: 7 }); // Armazena o usuário em um cookie com expiração de 7 dias
  };

  const updateUser = (userData: UserAddress) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("user");
  };

  return (
    <Context.Provider
      value={{
        orders,
        addOrder,
        editOrder,
        removeOrder,
        clearCart,
        user,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </Context.Provider>
  );
}
