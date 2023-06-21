import styled from "styled-components";

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
  margin-top: 30px;
  padding-bottom: 120px;
  flex-direction: column;
  gap: 1rem;
`;

export const PaymentComponent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors["yellow-100"]};
  border: 1px solid ${(props) => props.theme.colors["yellow-300"]};
  margin-top: 1rem;
  padding: 15px;
  border-radius: 10px;
`;

export const ResumeTitle = styled.div`
  font-size: 22px;
  margin-top: 10px;
  text-align: center;
  font-family: ${(props) => props.theme.fonts["title"]};
`;

export const OrderTotal = styled.div`
  font-size: 22px;
  margin: 10px 0;
  text-align: center;
  font-family: ${(props) => props.theme.fonts["title"]};
`;

export const InputRadio = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  border: 1px solid ${(props) => props.theme.colors["yellow-300"]};
  border-radius: 1rem;
`;
export const InputOption = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 1rem;
  padding: 1rem;
  align-items: center;
  align-self: center;

  input {
    opacity: 0;
    position: fixed;
    width: 0;
  }

  label {
    padding: 1rem;
    border-radius: 20px;
    text-align: center;
  }

  input[type="radio"]:checked + label {
    background-color: ${(props) => props.theme.colors["yellow-500"]};
    padding: 1rem;
  }

  label:hover {
    background-color: ${(props) => props.theme.colors["yellow-700"]};
    padding: 1rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 400px;
  margin-top: 1rem;

  label {
    font-weight: bold;
  }

  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 16px;
    margin-bottom: 10px;
    background-color: ${(props) => props.theme.colors["yellow-300"]};
    font-family: ${(props) => props.theme.fonts.regular};
    text-align: center;
  }

  .error {
    color: red;
    font-size: 0.8rem;
    text-align: right;
  }
`;

export const ButtonSubmit = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => props.theme.colors["yellow-500"]};
  color: #333;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 18px;
  cursor: pointer;
  font-family: ${(props) => props.theme.fonts.title};

  &:hover {
    background-color: ${(props) => props.theme.colors["yellow-700"]};
  }
`;

export const QrCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const QrCodeImg = styled.img`
  height: 200px;
  width: 200px;
  object-fit: contain;
  margin-top: 1rem;
`;

export const FormOption = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;
