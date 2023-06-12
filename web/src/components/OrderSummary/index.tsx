import {
  Container,
  OrderCard,
  OrderContainer,
  OrderText,
  OrderTitle,
  OrderTitleCard,
  OrderTotalCard,
} from "./styles";
import { MdOpenInFull } from "react-icons/md";

interface OrderItem {
  id: number;
  item_name: string;
  quantity: number;
  price: string;
  pedido_id: string;
  data_hora: string;
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

  function calculateTotal(orderItems: OrderItem[]) {
    return orderItems.reduce((total, item) => {
      const itemPrice = parseFloat(item.price.replace(",", "."));
      const itemQuantity = item.quantity;
      return total + itemPrice * itemQuantity;
    }, 0);
  }

  return (
    <Container>
      {Object.entries(groupedOrders).map(([orderId, orderItems]) => (
        <OrderContainer key={orderId}>
          <OrderTitleCard>
            Pedido feito em: {formatDateTime(orderItems[0].data_hora)}
          </OrderTitleCard>
          {orderItems.map((item, index) => (
            <OrderCard key={item.id}>
              <OrderText>{item.item_name}</OrderText>
              <OrderText>Quantidade: {item.quantity}</OrderText>
              <OrderText>Preço: R${item.price}</OrderText>
            </OrderCard>
          ))}
          <OrderTotalCard>
            Valor Total: R${calculateTotal(orderItems)}
            <MdOpenInFull size={30} />
          </OrderTotalCard>
        </OrderContainer>
      ))}
    </Container>
  );
}
