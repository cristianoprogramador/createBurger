import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Container, DeliverContainer } from "./styles";
import { useState, useContext, useEffect } from "react";
import { api } from "../../utils/api";
import { Context } from "../../contexts/Context";
import { OrderSummary } from "../../components/OrderSummary";

export function OrdersHistory() {
  const navigate = useNavigate();
  const [allOrders, setAllOrders] = useState<any>([]);
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  async function fetchProducts() {
    if (user) {
      try {
        const { data } = await api.get(`/orders/${user.email}`);
        setAllOrders(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <div>Carregando</div>;
  }

  return (
    <Container>
      <Header />
      <DeliverContainer>
        <OrderSummary orders={allOrders} />
        {!user && <div>Faça o cadastro e faça seus pedidos!</div>}
        {user && allOrders.orderId.length === 0 && (
          <div>Nenhum pedido feito ainda!</div>
        )}
      </DeliverContainer>
      <Footer no_repeat />
    </Container>
  );
}
