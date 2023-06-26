import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const DeliverContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  padding-bottom: 120px;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 918px) {
    flex-direction: row;
  }
`;
