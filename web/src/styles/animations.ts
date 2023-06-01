import styled, { keyframes } from "styled-components";

export const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(45deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(-45deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;
