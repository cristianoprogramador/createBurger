import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Container, DeliverContainer } from "./styles";
import { useState, useContext, useEffect } from "react";
import { api } from "../../utils/api";
import { Context } from "../../contexts/Context";

export function OrdersHistory() {
  const navigate = useNavigate();
  const [allOrders, setAllOrders] = useState([]);
  const { user } = useContext(Context);

  async function fetchProducts() {
    if (user) {
      try {
        const { data } = await api.get(`/orders/${user.email}`);
        setAllOrders(data);
      } catch (error) {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container>
      <Header />
      <DeliverContainer></DeliverContainer>
      <Footer no_repeat />
    </Container>
  );
}
