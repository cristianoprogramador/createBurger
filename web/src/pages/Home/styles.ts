import styled from "styled-components";
import { blinkAnimation, scaleAnimation } from "../../styles/animations";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const CustomizeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 5rem;
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
  font-family: ${(props) => props.theme.fonts["title"]};

  background: ${(props) => props.theme.colors["orange-700"]};
`;

export const TitleContainer = styled.div`
  font-family: ${(props) => props.theme.fonts["title"]};
  font-size: ${(props) => props.theme.textSizes["title-title-xl"]};
  text-align: center;
  margin: 1rem 0 2rem 0;
`;

export const MenuContainer = styled.div`
  font-family: ${(props) => props.theme.fonts["title"]};
  font-size: ${(props) => props.theme.textSizes["title-title-xl"]};
  text-align: center;
  margin: 5rem 0 2rem 0;
`;

export const ProductList = styled.div`
  display: grid;
  grid-gap: 20px;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-bottom: 100px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

export const ProductItem = styled.div`
  background: ${(props) => props.theme.colors["yellow-300"]};
  padding: 20px;
  border-radius: 5%;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 1rem;
  cursor: pointer;

  &:hover {
    animation: ${blinkAnimation} 0.6s linear normal;
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: contain;
  border-radius: 5px;

  &:hover {
    animation: ${scaleAnimation} 0.6s linear normal;
  }
`;

export const ProductInfo = styled.div`
  flex-grow: 1; /* Adicione esta linha para que o elemento ocupe todo o espaço disponível */
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* Alinhe o conteúdo na parte inferior */
  text-align: center;
`;

export const ProductName = styled.h3`
  margin-top: 10px;
  font-family: ${(props) => props.theme.textSizes["text-regular-m"]};
`;

export const ProductPrice = styled.h2`
  margin-top: 10px;
  font-family: ${(props) => props.theme.fonts["regular"]};
`;

export const ProductDescription = styled.h3`
  margin-top: 10px;
  font-family: ${(props) => props.theme.fonts["title"]};
  background: ${(props) => props.theme.colors["yellow-500"]};
  padding: 10px;
  border-radius: 10px;

  @media (min-width: 768px) {
    display: none;
  }
`;
