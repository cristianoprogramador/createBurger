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
} from "./styles";
import { Context } from "../../contexts/Context";
import { useContext } from "react";
import { toast } from "react-toastify";

export function Cart() {
  const navigate = useNavigate();
  const { orders } = useContext(Context);

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
    if (orders.length > 0) {
      navigate("/checkout");
    } else {
      toast.error("Carrinho Vazio");
    }
  };

  return (
    <Container>
      <Header />
      <ProfileContainer>
        {orders.map((order) => (
          <OrderContainer key={order.id}>
            <OrderContainerInfo>
              <OrderImage src={order.image} alt={order.name} />
              <OrderInfo>
                <OrderName>{order.name}</OrderName>
                {Object.values(order.items).map((item) => (
                  <OrderItem key={item.name}>
                    <OrderInfoNameQuantity>
                      <div>{item.name}</div>
                      <div style={{ minWidth: 112 }}>
                        Quantidade: {item.quantity}
                      </div>
                    </OrderInfoNameQuantity>
                    Preço: R$:
                    {Number(item.price).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </OrderItem>
                ))}
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
          Finalizar Pedido
        </CheckoutButton>
      </ProfileContainer>
      <Footer no_repeat />
    </Container>
  );
}
