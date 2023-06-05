import { useContext } from "react";
import { CartContext } from "../contexts/Context";

export function useCart() {
  const context = useContext(CartContext);
  return context;
}
