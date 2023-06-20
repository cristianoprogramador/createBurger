import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Form,
  InputOption,
  InputRadio,
  OrderTotal,
  PaymentComponent,
  ProfileContainer,
  ResumeTitle,
} from "./styles";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { getYear, getMonth } from "date-fns";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderData, backendData } = location.state;
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);

  console.log(orderData, backendData);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmitCard = (data: any) => {
    console.log(data);

    // navigate("/success");
  };

  const onSubmitPix = (data: any) => {
    console.log(data);

    // navigate("/success");
  };

  const totalPrice = backendData.reduce(
    (total: any, item: any) => total + item.price * item.quantity,
    0
  );

  const [paymentTime, setPaymentTime] = useState("");

  const handleChangeTime = (event: any) => {
    setPaymentTime(event.target.value);
  };

  const handleDatePickerChange: ReactDatePickerProps<any, any>["onChange"] = (
    date: any
  ) => {
    if (date) {
      setExpirationDate(date);
      setValue("expirationDate", date, { shouldValidate: true });
    }
  };

  return (
    <Container>
      <Header />
      <ProfileContainer>
        <PaymentComponent>
          <ResumeTitle style={{ marginBottom: 10 }}>
            Pagamento com Cartão de Crédito
          </ResumeTitle>
          <InputRadio>
            <InputOption>
              <input
                type="radio"
                id="cartao"
                name="paymentTime"
                value="cartao"
                checked={paymentTime === "cartao"}
                onChange={handleChangeTime}
              />
              <label htmlFor="cartao">Cartão de Crédito</label>
            </InputOption>
            <InputOption>
              <input
                type="radio"
                id="dinheiro"
                name="paymentTime"
                value="dinheiro"
                checked={paymentTime === "dinheiro"}
                onChange={handleChangeTime}
              />
              <label htmlFor="dinheiro">Pix</label>
            </InputOption>
          </InputRadio>
          <Form onSubmit={handleSubmit(onSubmitCard)}>
            <div>
              <label htmlFor="cardName">Nome Titular:</label>
              <input
                type="text"
                id="cardName"
                {...register("cardName", {
                  required: "Nome do titular é obrigatório",
                })}
              />
              {errors.cardName && (
                <div className="error">Nome do titular é obrigatório</div>
              )}
            </div>

            <div>
              <label htmlFor="cpf">CPF Titular:</label>
              <input
                type="text"
                id="cpf"
                {...register("cpf", {
                  required: "CPF do titular é obrigatório",
                })}
                maxLength={14}
                onChange={(e) => {
                  const { value } = e.target;
                  const cpf = value
                    .replace(/\D/g, "")
                    .replace(/(\d{3})(\d)/, "$1.$2")
                    .replace(/(\d{3})(\d)/, "$1.$2")
                    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
                  setValue("cpf", cpf, { shouldValidate: true });
                }}
              />
              {errors.cpf && (
                <div className="error">CPF do titular é obrigatório</div>
              )}
            </div>

            <div>
              <label htmlFor="cardNumber">Número do Cartão:</label>
              <input
                type="text"
                id="cardNumber"
                {...register("cardNumber", {
                  required: "Número do cartão é obrigatório",
                })}
              />
              {errors.cardNumber && (
                <div className="error">Número do cartão é obrigatório</div>
              )}
            </div>

            <div>
              <label htmlFor="expirationDate">Data de Expiração:</label>
              <DatePicker
                id="expirationDate"
                selected={expirationDate}
                onChange={handleDatePickerChange}
                dateFormat="MM/yy"
                showMonthYearPicker
                placeholderText="MM/AA"
                minDate={new Date()} // Define a data mínima como a data atual
              />

              {errors.expirationDate && (
                <div className="error">Data de expiração é obrigatória</div>
              )}
            </div>

            <div>
              <label htmlFor="cvv">CVV:</label>
              <input
                type="text"
                id="cvv"
                maxLength={3}
                inputMode="numeric"
                {...register("cvv", { required: "CVV é obrigatório" })}
              />
              {errors.cvv && <div className="error">CVV é obrigatório</div>}
            </div>

            <button type="submit">Pagar</button>
          </Form>
          <OrderTotal>
            Total do Pedido: R$:
            {Number(totalPrice).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </OrderTotal>
        </PaymentComponent>
      </ProfileContainer>
      <Footer no_repeat />
    </Container>
  );
}
