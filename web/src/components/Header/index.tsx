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
import { BsPin } from "react-icons/bs";

export function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noreferrer");
  };

  function GetOut() {
    navigate("/");
  }

  function handleWorkingInProgress() {
    alert("Em fase de construção...");
  }

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

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
          }}
        >
          <ProfilePicture
            src={userProfile}
            alt=""
            style={{
              opacity: isHover ? 1 : 0.8,
            }}
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
