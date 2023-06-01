import { useState } from "react";
import {
  Container,
  CustomizeCombo,
  CustomizeContainer,
  CustomizeHamburger,
  CustomizeText,
} from "./styles";
import { Header } from "../../components/Header";
import Lottie from "lottie-react";
import hamburgerAnimation from "../../assets/lottieAnimations/burger.json";
import friesAnimation from "../../assets/lottieAnimations/frenchfries.json";
import comboAnimation from "../../assets/lottieAnimations/combo.json";

export function Home() {
  const [count, setCount] = useState(0);

  return (
    <Container>
      <Header />
      <CustomizeContainer>
        <CustomizeHamburger>
          <Lottie animationData={hamburgerAnimation} loop={true} />
          <CustomizeText>
            Monte o melhor Burger para você, aqui você é o chef! <br />
            Use a imaginação e crie um burger fantástico e delicioso.
          </CustomizeText>
        </CustomizeHamburger>
        <CustomizeHamburger>
          <Lottie animationData={friesAnimation} loop={true} />
          <CustomizeText>
            Monte a melhor Batata Frita para você, aqui você é o chef! <br />
            Use a imaginação e crie um burger fantástico e delicioso.
          </CustomizeText>
        </CustomizeHamburger>
      </CustomizeContainer>
    </Container>
  );
}
