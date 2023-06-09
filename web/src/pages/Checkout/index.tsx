import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import {
  CheckoutButton,
  Container,
  OrderContainer,
  OrderContainerInfo,
  OrderImage,
  OrderInfo,
  OrderInfoNameQuantity,
  OrderItem,
  OrderName,
  OrderSubTotal,
  OrderTotal,
  ProfileContainer,
  ResumeTitle,
} from "./styles";
import { Context } from "../../contexts/Context";
import { useContext, useState } from "react";
import { AddressForm } from "../../components/AddressForm";
import { TypeOfPayment } from "../../components/TypeOfPayment";

export function Checkout() {
  const navigate = useNavigate();
  const { orders } = useContext(Context);

  const [paymentInfo, setPaymentInfo] = useState({
    paymentMethod: "",
    paymentTime: "",
  });

  console.log(paymentInfo);

  const handlePaymentInfoChange = (newPaymentInfo: any) => {
    setPaymentInfo(newPaymentInfo);
  };

  const sumOrderPrice = (order: any) => {
    const items = Object.values(order.items);
    const totalPrice = items.reduce(
      (sum: any, item: any) => sum + item.quantity * item.price,
      0
    );
    return totalPrice;
  };

  const totalPrices = orders.map((order) => sumOrderPrice(order));

  const totalPrice = totalPrices.reduce(
    (accumulator: any, currentValue: any) => accumulator + currentValue,
    0
  );

  console.log(orders);

  const handleCheckout = () => {
    console.log("FINALIZADO");
  };

  return (
    <Container>
      <Header />
      <ProfileContainer>
        <div>
          <AddressForm />
          <TypeOfPayment onPaymentInfoChange={handlePaymentInfoChange} />
        </div>
        <div>
          <ResumeTitle style={{ marginBottom: 10 }}>
            Resumo dos Pedidos
          </ResumeTitle>
          {orders.map((order) => (
            <OrderContainer key={order.id}>
              <OrderContainerInfo>
                <OrderImage src={order.image} alt={order.name} />
                <OrderInfo>
                  <OrderName>{order.name}</OrderName>
                </OrderInfo>
              </OrderContainerInfo>
              <OrderSubTotal>
                Subtotal: R$:
                {Number(sumOrderPrice(order)).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </OrderSubTotal>
            </OrderContainer>
          ))}
          <OrderTotal>
            Total do Pedido: R$:
            {Number(totalPrice).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </OrderTotal>
          <CheckoutButton onClick={handleCheckout}>
            Confirmar Compra
          </CheckoutButton>
        </div>
      </ProfileContainer>
      <Footer no_repeat />
    </Container>
  );
}
