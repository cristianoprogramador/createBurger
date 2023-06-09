import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors["yellow-100"]};
  border: 1px solid ${(props) => props.theme.colors["yellow-300"]};
  margin-top: 1rem;
  padding: 15px;
  border-radius: 10px;
`;

export const Title = styled.div`
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
