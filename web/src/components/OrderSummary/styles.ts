import styled from "styled-components";

export const Container = styled.div`
  margin-top: 20px;
`;

export const OrderContainer = styled.div`
  margin-bottom: 20px;
  border: 2px solid darkorange;
  padding: 15px;
  border-radius: 10px;
`;

export const OrderTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

export const OrderCard = styled.div`
  /* display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 2rem; */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  align-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors["orange-500"]};
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    justify-items: flex-start;
    padding-left: 35px;
  }
`;

export const OrderText = styled.div`
  margin: 5px 0;

  @media (max-width: 768px) {
    font-size: small;
  }
`;

export const OrderTitleCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${(props) => props.theme.fonts["title"]};
  font-size: x-large;
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: medium;
  }
`;

export const OrderTotalCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors["orange-500"]};
  font-family: ${(props) => props.theme.fonts["title"]};
  font-size: large;
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    font-size: medium;
  }
`;
