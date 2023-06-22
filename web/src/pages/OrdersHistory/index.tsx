import { useContext, useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { OrderSummary } from "../../components/OrderSummary";
import { Context } from "../../contexts/Context";
import { api } from "../../utils/api";
import { Container, DeliverContainer } from "./styles";

export function OrdersHistory() {
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
