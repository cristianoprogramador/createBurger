import { useContext, useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { OrderSummary } from "../../components/OrderSummary";
import { Context } from "../../contexts/Context";
import { api } from "../../utils/api";
import { Container, DeliverContainer } from "./styles";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

export function OrdersHistory() {
  const [allOrders, setAllOrders] = useState<any>([]);
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  const [messageSocket, setMessageSocket] = useState("");

  useEffect(() => {
    // const socket = io("http://localhost:3031");
    const socket = io("https://api.createburger.com.br");

    socket.on("connect", () => {
      console.log("Conectado ao servidor WebSocket");
      if (user) {
        // O cliente se junta à sala correspondente ao email do usuário
        socket.emit("joinRoom", user.email);
      }
    });

    socket.on("pedidoAtualizado", ({ orderid, status }) => {
      // Faça o processamento necessário para atualizar a interface do usuário com as informações do pedido atualizado
      // setMessageSocket(`Pedido ${orderid} atualizado. Novo status: ${status}`);
      toast.info(`Pedido ${orderid} atualizado. Novo status: ${status}`);
      setMessageSocket(`${orderid}`);
    });

    return () => {
      socket.disconnect(); // Desconecta o socket quando o componente for desmontado
    };
  }, [user]);

  // console.log(messageSocket);

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
  }, [messageSocket]);

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
