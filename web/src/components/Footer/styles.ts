import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  color: white;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const CartContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  background-color: ${(props) => props.theme.colors["red-500"]};
  width: 100%;
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
  font-size: 18px;
  display: flex;
  flex: 1;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  background-color: ${(props) => props.theme.colors["orange-500"]};
  width: 100%;
  border-bottom-left-radius: 15%;
  border-bottom-right-radius: 15%;
  height: 50px;
`;

export const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  cursor: pointer;

  span {
    font-size: smaller;
  }
`;
