import styled from "styled-components";

export const OrderCard = styled.div`
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

export const OrderTotalCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
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
