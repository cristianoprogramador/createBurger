import { OrderDescription } from "../OrderDescription";
import { Container, OrderContainer, OrderTitleCard } from "./styles";

interface OrderItem {
  id: number;
  item_name: string;
  quantity: number;
  price: string;
  pedido_id: string;
  data_hora: string;
  paymentMethod: string;
  paymentTime: string;
}

interface GroupedOrders {
  [orderId: string]: OrderItem[];
}

interface OrderSummaryProps {
  orders: {
    orderId: OrderItem[];
  };
}

export function OrderSummary({ orders }: OrderSummaryProps) {
  // console.log(orders);

  function groupOrdersByOrderId(orders: OrderItem[]) {
    if (!orders) {
      return {};
    }

    return orders.reduce<GroupedOrders>((groupedOrders, order) => {
      const orderId = order.pedido_id.toString();
      if (!groupedOrders[orderId]) {
        groupedOrders[orderId] = [];
      }
      groupedOrders[orderId].push(order);
      return groupedOrders;
    }, {});
  }

  const groupedOrders = groupOrdersByOrderId(orders.orderId);

  function formatDateTime(dateTime: string) {
    const date = new Date(dateTime);
    const time = `${date.getHours()}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${time} - ${day}/${month}/${year}`;
  }

  return (
    <Container>
      {Object.entries(groupedOrders).map(([orderId, orderItems]) => (
        <OrderContainer key={orderId}>
          <OrderTitleCard>
            Pedido feito em: {formatDateTime(orderItems[0].data_hora)}
          </OrderTitleCard>
          <OrderTitleCard>
            Pagamento: {orderItems[0].paymentMethod.toUpperCase()}
          </OrderTitleCard>
          <OrderDescription orderItems={orderItems} />
        </OrderContainer>
      ))}
    </Container>
  );
}
