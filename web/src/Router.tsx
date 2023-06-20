import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { Cart } from "./pages/Cart";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Checkout } from "./pages/Checkout";
import { OrdersHistory } from "./pages/OrdersHistory";
import { Payment } from "./pages/Payment";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders" element={<OrdersHistory />} />
      <Route path="/payment" element={<Payment />} />
    </Routes>
  );
}
