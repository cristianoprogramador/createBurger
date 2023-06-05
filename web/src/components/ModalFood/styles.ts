import styled from "styled-components";
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

export const IngredientTopic = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  align-self: center;
  font-family: ${(props) => props.theme.fonts["title"]};
  font-size: ${(props) => props.theme.textSizes["text-bold-m"]};
  width: 80%;
  border-radius: 20px;
  margin: 10px 0;
  padding: 2px;
  color: white;
  background-color: ${(props) => props.theme.colors["orange-500"]};

  &:hover {
    animation: ${scaleAnimation} 0.6s linear normal;
  }

  @media (min-width: 768px) {
    font-size: ${(props) => props.theme.textSizes["text-bold-l"]};
  }
`;

export const IngredientsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px gray solid;
  padding: 10px 0;
`;

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;

export const DescriptionAddContainer = styled.div`
  display: flex;
  flex-direction: column;
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

    @media (min-width: 768px) {
      font-size: ${(props) => props.theme.textSizes["text-bold-l"]};
    }
  }

  div {
    font-family: ${(props) => props.theme.fonts["regular"]};
    font-size: ${(props) => props.theme.textSizes["text-bold-s"]};
    max-width: 400px;

    @media (min-width: 768px) {
      font-size: ${(props) => props.theme.textSizes["text-bold-m"]};
    }
  }
`;

export const FooterContainer = styled.div`
  position: sticky;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  bottom: 0;
  width: 100%;
  color: white;
  background: ${(props) => props.theme.colors["orange-700"]};
`;

export const IconContainerTotal = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid orange;
  border-radius: 5px;
  padding: 0.5rem;
`;

export const ContainerTotal = styled.div`
  display: flex;
  /* flex: 1; */
  gap: 20px;

  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  @media (min-width: 768px) {
    font-size: ${(props) => props.theme.textSizes["title-title-m"]};
  }
`;
