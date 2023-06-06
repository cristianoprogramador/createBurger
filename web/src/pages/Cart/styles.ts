import styled from "styled-components";
import { blinkAnimation, scaleAnimation } from "../../styles/animations";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  padding-bottom: 120px;
  flex-direction: column;
`;

export const OrderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border: 1px solid gray;
  border-radius: 10px;
  width: 90%;

  @media (min-width: 768px) {
    width: 50%;
  }
`;

export const OrderImage = styled.img`
  max-width: 80px;
  height: 80px;
  object-fit: contain;

  @media (min-width: 768px) {
    max-width: 160px;
    height: 160px;
  }
`;

export const OrderInfo = styled.div`
  flex-grow: 1;
`;

export const OrderInfoNameQuantity = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 5px;
  font-family: ${(props) => props.theme.fonts["title"]};
  font-size: 15px;

  @media (min-width: 768px) {
    font-size: 18px;
    font-family: ${(props) => props.theme.fonts["title"]};
  }
`;

export const OrderName = styled.h3`
  font-size: 18px;
  margin-top: 10px;
  text-align: center;
`;

export const OrderTotal = styled.h3`
  font-size: 18px;
  margin: 10px 0;
  text-align: center;
`;

export const OrderItem = styled.p`
  margin: 5px 0;
  font-size: 14px;
  padding: 10px;
`;

export const CheckoutButton = styled.button`
  background-color: #f37121;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
`;
