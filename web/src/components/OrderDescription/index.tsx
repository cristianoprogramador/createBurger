import { OrderCard, OrderText, OrderTotalCard } from "./styles";
import { useState } from "react";
import { MdOpenInFull, MdCloseFullscreen } from "react-icons/md";

interface OrderItem {
  id: number;
  item_name: string;
  quantity: number;
  price: string;
  pedido_id: string;
  data_hora: string;
}

export function OrderDescription({ orderItems }: any) {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen((prevState) => !prevState);
  }

  function calculateTotal(orderItems: OrderItem[]) {
    return orderItems.reduce((total, item) => {
      const itemPrice = parseFloat(item.price.replace(",", "."));
      const itemQuantity = item.quantity;
      return total + itemPrice * itemQuantity;
    }, 0);
  }

  return (
    <>
      {open &&
        orderItems.map((item: any) => (
          <OrderCard key={item.id}>
            <OrderText>{item.item_name}</OrderText>
            <OrderText>Qtde: {item.quantity}</OrderText>
            <OrderText>
              Preço: R${" "}
              {Number(item.price).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </OrderText>
          </OrderCard>
        ))}
      <OrderTotalCard>
        Valor Total: R${" "}
        {Number(calculateTotal(orderItems)).toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        {open ? (
          <MdCloseFullscreen size={30} onClick={handleOpen} />
        ) : (
          <MdOpenInFull size={30} onClick={handleOpen} />
        )}
      </OrderTotalCard>
    </>
  );
}
