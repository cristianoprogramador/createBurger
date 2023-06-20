import { useLocation, useNavigate } from "react-router-dom";
import { Container, ProfileContainer } from "./styles";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

export function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderData, backendData } = location.state;

  console.log(orderData, backendData);

  return (
    <Container>
      <Header />
      <ProfileContainer>
        <h1>Criar formulario de Cartão de Crédito</h1>
      </ProfileContainer>
      <Footer no_repeat />
    </Container>
  );
}
