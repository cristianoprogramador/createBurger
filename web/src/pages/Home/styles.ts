import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;

  @media (max-width: 1080px) {
    min-height: 1400px;
  }
`;

export const CustomizeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 1.2rem;
`;

export const CustomizeHamburger = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  width: 300px;
  height: 300px;
  padding: 1rem;
  border-radius: 1rem;
  background: ${(props) => props.theme.colors["orange-500"]};
  margin-top: 1rem;
`;

export const CustomizeText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  padding: 1rem;
  border-radius: 1rem;

  background: ${(props) => props.theme.colors["orange-700"]};
`;
