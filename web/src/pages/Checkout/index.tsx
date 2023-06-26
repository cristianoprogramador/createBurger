import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AddressForm } from "../../components/AddressForm";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { TypeOfPayment } from "../../components/TypeOfPayment";
import { Context } from "../../contexts/Context";
import { api } from "../../utils/api";
import {
  CheckoutButton,
  Container,
  OrderContainer,
  OrderContainerInfo,
  OrderImage,
  OrderInfo,
  OrderName,
  OrderSubTotal,
  OrderTotal,
  ProfileContainer,
  ResumeTitle,
} from "./styles";

export function Checkout() {
  const navigate = useNavigate();
  const { orders, clearCart, user } = useContext(Context);

  const [paymentInfo, setPaymentInfo] = useState({
    paymentMethod: "",
    paymentTime: "",
    status: "Pedido Realizado",
  });

  const handlePaymentInfoChange = (newPaymentInfo: any) => {
    setPaymentInfo(newPaymentInfo);
  };

  const [addressInfo, setAddressInfo] = useState({});

  const handleAddressChange = (newAddressInfo: any) => {
    setAddressInfo(newAddressInfo);
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

  const orderInfo = {
    ...addressInfo,
    ...paymentInfo,
  };

  const backendData: {
    name_id: string;
    name: string;
    item_name: string;
    quantity: number;
    price: number;
  }[] = [];

  orders.forEach((order) => {
    const { name_id, name, items } = order;

    for (const itemName in items) {
      const { item_name, quantity, price } = items[itemName];

      backendData.push({
        name_id,
        name,
        item_name,
        quantity,
        price,
      });
    }
  });

  const handleCheckout = async () => {
    const isOrderInfoComplete = Object.values(orderInfo).every(
      (value) => value && value.trim() !== ""
    );

    if (!isOrderInfoComplete) {
      toast.error("Por favor, preencha todos os campos!");
      return;
    }

    if (backendData.length === 0) {
      toast.error("Seu carrinho está vazio!");
      return;
    }

    if (orderInfo.paymentTime === "agora") {
      const state = {
        orderData: orderInfo,
        backendData: backendData,
      };
      navigate("/payment", { state });
    } else {
      try {
        const orderData = {
          ...orderInfo,
          email: user?.email,
          status: "Aguardando Restaurante",
        };
        const response = await api.post("/orders", {
          order: orderData,
          orderDetails: backendData,
        });
        console.log(response);
        toast.success("Pedido Enviado");
        clearCart();
        navigate("/");
      } catch (error: any) {
        // console.log(error.response.data);
        toast.error(error.response.data);
      }
    }
  };

  if (!user) {
    navigate("/login");
  }

  return (
    <Container>
      <Header />
      <ProfileContainer>
        <div>
          <AddressForm onAddressChange={handleAddressChange} />
          <TypeOfPayment onPaymentInfoChange={handlePaymentInfoChange} />
        </div>
        <div>
          <ResumeTitle style={{ marginBottom: 10 }}>
            Resumo dos Pedidos
          </ResumeTitle>
          {orders.map((order) => (
            <OrderContainer key={order.name_id}>
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
