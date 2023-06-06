import styled from "styled-components";
import { rotateAnimation } from "../../styles/animations";

export const Container = styled.div`
  width: 100%;
  display: flex;
  position: sticky;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 5;
  background: ${(props) => props.theme.colors["orange-500"]};
  border-bottom-left-radius: 20%;
  border-bottom-right-radius: 20%;
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
`;

export const LogoView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  margin: 0.5rem;
  gap: 1rem;
  font-size: large;

  font-family: ${(props) => props.theme.fonts["title"]};
`;

export const ImageLogo = styled.img`
  height: 4em;
  justify-content: center;
  align-items: center;

  &:hover {
    animation: ${rotateAnimation} 0.6s linear normal;
  }

  @media (max-width: 768px) {
    height: 2em;
  }
`;

export const RightSide = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  font-family: ${(props) => props.theme.fonts["regular"]};

  @media (max-width: 768px) {
    display: none;
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;
`;

export const ProfilePicture = styled.img`
  height: 2em;
  width: 2em;
  object-fit: cover;
  border-radius: 1.5em;
  cursor: pointer;

  &:hover {
    animation: ${rotateAnimation} 0.6s linear normal;
  }

  @media (max-width: 768px) {
    height: 2.5em;
    width: 2.5em;
  }
`;

export const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  align-items: center;
  gap: 0.5rem;
`;

export const AddressDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  text-decoration: underline;
`;

export const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  width: 100%;
  gap: 5px;
  height: 45px;
  border-top-left-radius: 15%;
  border-top-right-radius: 15%;
`;

export const CartIcon = styled.div`
  font-size: 18px;
  display: flex;
  flex: 1;
  text-align: center;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  span {
    display: flex;
    position: relative;
    margin-bottom: 10px;
    top: 0;
    font-size: 14px;
  }
`;

export const CartQuantity = styled.div`
  font-size: 16px;
  display: flex;
  flex: 1;
  text-align: center;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const CartPrice = styled.div`
  display: flex;
  flex: 1;
  text-align: center;
  align-items: center;

  justify-content: center;
`;
