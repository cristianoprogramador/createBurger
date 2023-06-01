import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.theme.colors["orange-700"]};
  padding: 0.5rem 1rem;
  border-radius: 10%;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const IconView = styled.div``;

export const InputBar = styled.input`
  display: flex;
  width: 35rem;
  background-color: ${(props) => props.theme.colors["orange-300"]};
  box-shadow: 0 0 0 0;
  border: 0 none;
  outline: 0;
  margin-left: 20px;
  border-radius: 5%;
  font-size: medium;
  font-family: ${(props) => props.theme.fonts["regular"]};
  text-align: center;

  @media (max-width: 768px) {
    width: 10rem;
  }

  @media (max-width: 1024px) {
    width: 25rem;
  }
`;
