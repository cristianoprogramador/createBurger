import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1080px) {
    min-height: 1400px;
  }
`;
