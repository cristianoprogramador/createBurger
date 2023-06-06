import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AddressContainer,
  AddressDiv,
  CartContainer,
  CartIcon,
  CartPrice,
  CartQuantity,
  Container,
  ImageLogo,
  LeftSide,
  LogoView,
  ProfileContainer,
  ProfilePicture,
  RightSide,
} from "./styles";
import logo from "../../assets/images/hamburger.svg";
import userProfile from "../../assets/images/userProfile.png";
import { SearchBar } from "../SearchBar";
import { Context } from "../../contexts/Context";
import { BsCart4 } from "react-icons/bs";

export function Header() {
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

  return (
    <Container>
      <LeftSide>
        <LogoView onClick={() => navigate("/")}>
          <ImageLogo src={logo} alt="logo" />
          Create Your Burger
        </LogoView>
      </LeftSide>

      <SearchBar />

      <RightSide>
        <ProfileContainer
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => navigate("/profile")}
        >
          <ProfilePicture src={userProfile} alt="" />
          <h5>Realizar Login</h5>
        </ProfileContainer>
        <AddressContainer>
          <CartContainer>
            <CartIcon>
              <BsCart4 size={25} />
              <span>{orders.length}</span>
            </CartIcon>
            <h5>
              R$:
              {Number(totalPrice).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h5>
          </CartContainer>
        </AddressContainer>
      </RightSide>
    </Container>
  );
}
