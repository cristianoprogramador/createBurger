import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AddressContainer,
  AddressDiv,
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

export function Header() {
  const navigate = useNavigate();

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
          <ProfilePicture
            src={userProfile}
            alt=""
          />
          <h5>Realizar Login</h5>
        </ProfileContainer>
        <AddressContainer>
          <h5>Entregar em</h5>
          <AddressDiv>
            <h5>Piaui, 457</h5>
          </AddressDiv>
        </AddressContainer>
      </RightSide>
    </Container>
  );
}
