import styled from "styled-components";

export const Panel = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: center;

  color: black;
  gap: 2rem;
`;

export const ButtonInside = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  height: 60px;
  width: 120px;
  background-color: ${(props) => props.theme.colors["blue-700"]};
  border-radius: 10px;
  padding: 1rem;
  gap: 1rem;
  cursor: pointer;
  transition: 0.3s;
  color: white;

  :hover {
    background-color: ${(props) => props.theme.colors["blue-300"]};
  }
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
  justify-content: center;
`;
