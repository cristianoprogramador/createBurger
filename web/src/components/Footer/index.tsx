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

interface RepeatProps {
  no_repeat?: boolean;
}

export function Footer({ no_repeat }: RepeatProps) {
  const navigate = useNavigate();
  const { orders, user } = useContext(Context);

  // console.log(no_repeat);

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

  return (
    <Container>
      {!no_repeat && (
        <CartContainer onClick={() => navigate("/cart")}>
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
      )}
      <FooterContainer>
        <IconContainer onClick={() => navigate("/")}>
          <BiFoodMenu size={25} />
          <span>Cardápio</span>
        </IconContainer>
        <IconContainer onClick={() => navigate("/orders")}>
          <MdOutlineHistory size={25} />
          <span>Pedidos</span>
        </IconContainer>
        {user ? (
          <IconContainer onClick={() => navigate("/profile")}>
            <CgProfile size={25} />
            <span>{user.name}</span>
          </IconContainer>
        ) : (
          <IconContainer onClick={() => navigate("/login")}>
            <CgProfile size={25} />
            <span>Perfil</span>
          </IconContainer>
        )}
      </FooterContainer>
    </Container>
  );
}
