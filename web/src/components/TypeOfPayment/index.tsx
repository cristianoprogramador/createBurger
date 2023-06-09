import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../contexts/Context";
import { Container, InputOption, InputRadio, Title } from "./styles";

export function TypeOfPayment({ onPaymentInfoChange }: any) {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("");

  const [paymentTime, setPaymentTime] = useState("");

  const handleChange = (event: any) => {
    setPaymentMethod(event.target.value);
    onPaymentInfoChange({ paymentMethod: event.target.value, paymentTime });
  };

  const handleChangeTime = (event: any) => {
    setPaymentTime(event.target.value);
    onPaymentInfoChange({ paymentMethod, paymentTime: event.target.value });
  };

  return (
    <Container>
      <Title>Deseja pagar:</Title>
      <InputRadio>
        <InputOption>
          <input
            type="radio"
            id="agora"
            name="paymentTime"
            value="agora"
            checked={paymentTime === "agora"}
            onChange={handleChangeTime}
          />
          <label htmlFor="agora">Agora</label>
        </InputOption>
        <InputOption>
          <input
            type="radio"
            id="depois"
            name="paymentTime"
            value="depois"
            checked={paymentTime === "depois"}
            onChange={handleChangeTime}
          />
          <label htmlFor="depois">Na Entrega</label>
        </InputOption>
      </InputRadio>
      <Title>Método de Pagamento:</Title>
      <InputRadio>
        <InputOption>
          <input
            type="radio"
            id="cartao"
            name="paymentMethod"
            value="cartao"
            checked={paymentMethod === "cartao"}
            onChange={handleChange}
          />
          <label htmlFor="cartao">Cartão de Crédito/Débito</label>
        </InputOption>
        <InputOption>
          <input
            type="radio"
            id="dinheiro"
            name="paymentMethod"
            value="dinheiro"
            checked={paymentMethod === "dinheiro"}
            onChange={handleChange}
          />
          <label htmlFor="dinheiro">Dinheiro/PIX</label>
        </InputOption>
      </InputRadio>
    </Container>
  );
}
