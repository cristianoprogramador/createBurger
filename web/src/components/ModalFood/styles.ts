import styled from "styled-components";
import { rotateAnimation } from "../../styles/animations";
import { scaleAnimation } from "../../styles/animations";

export const Panel = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: black;

  div {
    border-radius: 20px;

    background-color: ${(props) => props.theme.colors["orange-300"]};
  }

  h2 {
    padding: 1rem;
    border-radius: 50%;
    font-family: ${(props) => props.theme.fonts["title"]};
    background-color: ${(props) => props.theme.colors["orange-500"]};

    &:hover {
      animation: ${scaleAnimation} 0.6s linear normal;
    }
  }

  img {
    width: auto;
    max-height: 300px;
  }

  p {
    width: 70%;
    text-align: center;
    font-family: ${(props) => props.theme.fonts["title"]};
  }
`;

export const ButtonInside = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 60px;
  width: 120px;
  background-color: ${(props) => props.theme.colors["orange-500"]};
  border-radius: 10px;
  margin-top: 1rem;
  padding: 1rem;
  cursor: pointer;
  transition: 0.3s;
  color: white;
  border: 0;

  :hover {
    background-color: ${(props) => props.theme.colors["orange-700"]};
  }
`;
