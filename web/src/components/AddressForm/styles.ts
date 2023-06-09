import styled from "styled-components";
import { scaleAnimation } from "../../styles/animations";
import ReactInputMask from "react-input-mask";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  background-color: ${(props) => props.theme.colors["yellow-100"]};
  border: 1px solid ${(props) => props.theme.colors["yellow-300"]};

  padding: 25px;
  border-radius: 10px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 5px;
`;

export const GroupInput = styled.div`
  display: grid;
  flex-direction: row;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  width: 265px;
  margin-bottom: 10px;
  background-color: ${(props) => props.theme.colors["yellow-300"]};
`;

export const InputMask = styled(ReactInputMask)`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  width: 265px;
  margin-bottom: 10px;
  background-color: ${(props) => props.theme.colors["yellow-300"]};
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => props.theme.colors["yellow-500"]};
  color: #333;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  align-content: center;
  width: 100px;

  &:hover {
    transition: background 0.5s ease;
    background-color: ${(props) => props.theme.colors["yellow-700"]};
  }
`;
