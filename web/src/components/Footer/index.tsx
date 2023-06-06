import {
  CartContainer,
  CartIcon,
  CartPrice,
  CartQuantity,
  Container,
  FooterContainer,
  IconContainer,
} from "./styles";
import { BsCart4 } from "react-icons/bs";
import { BiFoodMenu } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdOutlineHistory } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../contexts/Context";

export function Footer() {
  const navigate = useNavigate();
  const { orders } = useContext(Context);

  const sumOrderPrice = (order: any) => {
    const items = Object.values(order.items); // Array com todos os itens do pedido
    const totalPrice = items.reduce(
      (sum: any, item: any) => sum + item.quantity * item.price,
      0
    );
    return totalPrice;
  };

  // Percorre o array de pedidos e soma o preço de cada um
  const totalPrices = orders.map((order) => sumOrderPrice(order));

  const totalPrice = totalPrices.reduce(
    (accumulator: any, currentValue: any) => accumulator + currentValue,
    0
  );

  console.log(totalPrices);
  console.log(totalPrice);

  return (
    <Container>
      <CartContainer>
        <CartIcon>
          <BsCart4 size={25} />
          <span>{orders.length}</span>
        </CartIcon>
        {orders.length > 0 ? (
          <CartQuantity>Finalizar Pedido</CartQuantity>
        ) : (
          <CartQuantity>Sacola Vazia</CartQuantity>
        )}
        <CartPrice>
          R$:
          {Number(totalPrice).toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </CartPrice>
      </CartContainer>
      <FooterContainer>
        <IconContainer>
          <BiFoodMenu size={25} />
          <span>Cardápio</span>
        </IconContainer>
        <IconContainer>
          <MdOutlineHistory size={25} />
          <span>Pedidos</span>
        </IconContainer>
        <IconContainer onClick={() => navigate("/profile")}>
          <CgProfile size={25} />
          <span>Perfil</span>
        </IconContainer>
      </FooterContainer>
    </Container>
  );
}
