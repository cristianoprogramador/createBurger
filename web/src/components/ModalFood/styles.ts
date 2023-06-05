import styled from "styled-components";
import { rotateAnimation } from "../../styles/animations";
import { scaleAnimation } from "../../styles/animations";

export const Panel = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: black;

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
    text-align: center;
    font-family: ${(props) => props.theme.fonts["title"]};
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`;

export const IconContainer = styled.div`
  position: absolute;
  display: flex;
  flex: 1;
  left: 0;
  padding-left: 20px;
  cursor: pointer;

  :hover {
    color: red;
    transition: color 0.2s ease;
  }

  @media (max-width: 768px) {
    padding-left: 6px;
    padding-top: 6px;
    top: 0;
    color: ${(props) => props.theme.colors["orange-700"]};
  }
`;

export const Title = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;

  border-radius: 20px;

  background-color: ${(props) => props.theme.colors["orange-300"]};
`;

export const IngredientsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top: 1px gray solid;
  padding: 10px 0;
`;

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;

export const FirstPart = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  gap: 5px;
`;

export const ImageIngredient = styled.img`
  max-width: 80px;
  height: 80px;
  object-fit: contain;
`;

export const FirstInsidePart = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  gap: 5px;

  p {
    width: 100%;
  }

  div {
    font-family: ${(props) => props.theme.fonts["regular"]};
    font-size: ${(props) => props.theme.textSizes["text-bold-s"]};
  }
`;
