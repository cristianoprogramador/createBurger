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

export function Footer() {
  return (
    <Container>
      <CartContainer>
        <CartIcon>
          <BsCart4 size={25} />
          <span>1</span>
        </CartIcon>
        <CartQuantity>Sacola Vazia</CartQuantity>
        <CartPrice>R$: 35,00</CartPrice>
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
        <IconContainer>
          <CgProfile size={25} />
          <span>Perfil</span>
        </IconContainer>
      </FooterContainer>
    </Container>
  );
}
