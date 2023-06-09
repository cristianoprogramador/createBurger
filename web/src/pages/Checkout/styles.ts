import styled from "styled-components";

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
  gap: 1rem;

  @media (min-width: 918px) {
    flex-direction: row;
  }
`;

export const OrderContainerInfo = styled.div`
  display: flex;
  align-items: center;
  width: 290px;
`;

export const OrderContainer = styled.div`
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.colors["yellow-100"]};
  border: 1px solid ${(props) => props.theme.colors["yellow-300"]};
  padding: 5px;
  border-radius: 10px;
`;

export const OrderImage = styled.img`
  max-width: 80px;
  height: 80px;
  object-fit: contain;

  @media (min-width: 768px) {
    max-width: 80px;
    height: 80px;
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

export const ResumeTitle = styled.div`
  font-size: 22px;
  margin-top: 10px;
  text-align: center;
  font-family: ${(props) => props.theme.fonts["title"]};
`;

export const OrderName = styled.h3`
  font-size: 17px;
  margin-top: 10px;
  text-align: center;
`;

export const OrderTotal = styled.div`
  font-size: 22px;
  margin: 10px 0;
  text-align: center;
  font-family: ${(props) => props.theme.fonts["title"]};
`;

export const OrderItem = styled.div`
  margin: 5px 0;
  font-size: 14px;
  padding: 10px;
`;

export const CheckoutButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  align-content: center;
  background-color: #f37121;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;

  :hover {
    transition: background 0.5s ease;
    background-color: #cb540c;
  }
`;

export const OrderSubTotal = styled.div`
  font-size: 18px;
  margin: 10px 0;
  text-align: center;
  font-family: ${(props) => props.theme.fonts["title"]};
`;
