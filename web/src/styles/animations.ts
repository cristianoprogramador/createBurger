import { keyframes } from "styled-components";

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

export const scaleAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

export const blinkAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
  }
`;
