import styled from "styled-components";
import { blinkAnimation, scaleAnimation } from "../../styles/animations";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-bottom: 120px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  @media (min-width: 768px) {
    width: 400px;
  }
`;

export const ProfileImage = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: contain;
  border-radius: 50%;

  &:hover {
    animation: ${scaleAnimation} 0.6s linear normal;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 5px;
`;

export const GroupInput = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-direction: column;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  width: 100%;
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
    background-color: ${(props) => props.theme.colors["yellow-700"]};
  }
`;

export const ButtonSignUp = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => props.theme.colors["red-500"]};
  color: white;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  align-content: center;

  &:hover {
    background-color: ${(props) => props.theme.colors["red-700"]};
  }
`;
