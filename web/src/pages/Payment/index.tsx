import { useContext, useEffect, useRef, useState } from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import QRCODE from "../../assets/images/QRCODE.jpg";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Context } from "../../contexts/Context";
import { api } from "../../utils/api";
import {
  ButtonSubmit,
  Container,
  Form,
  FormOption,
  InputOption,
  InputRadio,
  OrderTotal,
  PaymentComponent,
  ProfileContainer,
  QrCodeContainer,
  QrCodeImg,
  ResumeTitle,
} from "./styles";

export function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderData, backendData } = location.state;
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);
  const { clearCart, user } = useContext(Context);

  const [paymentMethod, setPaymentMethod] = useState("");

  const handleChangeTime = (event: any) => {
    setPaymentMethod(event.target.value);
  };

  console.log(orderData, backendData);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmitCard = async () => {
    // console.log(data);
    try {
      const orderDataCorrect = {
        ...orderData,
        email: user?.email,
        paymentMethod: "cartao",
      };
      const response = await api.post("/orders", {
        order: orderDataCorrect,
        orderDetails: backendData,
      });
      console.log(response);
      toast.success("Pedido Enviado");
      clearCart();
      navigate("/");
    } catch (error: any) {
      // console.log(error.response.data);
      toast.error(error.response.data);
    }
  };

  const onSubmitPix = async () => {
    try {
      const orderDataCorrect = {
        ...orderData,
        email: user?.email,
        paymentMethod: "dinheiro",
      };
      const response = await api.post("/orders", {
        order: orderDataCorrect,
        orderDetails: backendData,
      });
      console.log(response);
      toast.success("Pedido Enviado");
      clearCart();
      navigate("/");
    } catch (error: any) {
      // console.log(error.response.data);
      toast.error(error.response.data);
    }
  };

  const totalPrice = backendData.reduce(
    (total: any, item: any) => total + item.price * item.quantity,
    0
  );

  const expirationDateRef = useRef(null);

  useEffect(() => {
    register("expirationDate", {
      required: "Data de expiração é obrigatória",
    });
  }, [register]);

  const handleDatePickerChange: ReactDatePickerProps<any, any>["onChange"] = (
    date: Date | [Date, Date] | null
  ) => {
    if (date) {
      if (Array.isArray(date)) {
        // Tratamento para caso o componente permita selecionar um intervalo de datas
        const [startDate] = date;
        setExpirationDate(startDate);
        setValue("expirationDate", startDate.toISOString(), {
          shouldValidate: true,
        });
      } else {
        // Tratamento para caso o componente permita selecionar apenas uma data
        setExpirationDate(date);
        setValue("expirationDate", date.toISOString(), {
          shouldValidate: true,
        });
      }
    } else {
      setExpirationDate(null);
      setValue("expirationDate", null, { shouldValidate: true });
    }
  };

  return (
    <Container>
      <Header />
      <ProfileContainer>
        <PaymentComponent>
          {paymentMethod === "cartao" ? (
            <ResumeTitle style={{ marginBottom: 10 }}>
              Pagamento com Cartão de Crédito
            </ResumeTitle>
          ) : (
            <ResumeTitle style={{ marginBottom: 10 }}>
              Pagamento por PIX
            </ResumeTitle>
          )}
          <InputRadio>
            <InputOption>
              <input
                type="radio"
                id="cartao"
                name="paymentMethod"
                value="cartao"
                checked={paymentMethod === "cartao"}
                onChange={handleChangeTime}
              />
              <label htmlFor="cartao">Cartão de Crédito</label>
            </InputOption>
            <InputOption>
              <input
                type="radio"
                id="dinheiro"
                name="paymentMethod"
                value="dinheiro"
                checked={paymentMethod === "dinheiro"}
                onChange={handleChangeTime}
              />
              <label htmlFor="dinheiro">Pix</label>
            </InputOption>
          </InputRadio>
          {paymentMethod === "cartao" ? (
            <Form onSubmit={handleSubmit(onSubmitCard)}>
              <FormOption>
                <label htmlFor="cardName">Nome Titular:</label>
                <input
                  type="text"
                  id="cardName"
                  {...register("cardName", {
                    required: "Nome do titular é obrigatório",
                  })}
                />
              </FormOption>
              {errors.cardName && (
                <div className="error">{errors.cardName.message as string}</div>
              )}

              <FormOption>
                <label htmlFor="cpf">CPF Titular:</label>
                <input
                  type="text"
                  id="cpf"
                  {...register("cpf", {
                    required: "CPF do titular é obrigatório",
                    pattern: {
                      value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                      message: "CPF inválido",
                    },
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
              </FormOption>
              {errors.cpf && (
                <div className="error">{errors.cpf.message as string}</div>
              )}

              <FormOption>
                <label htmlFor="cardNumber">Número do Cartão:</label>
                <InputMask
                  mask="9999-9999-9999-9999"
                  id="cardNumber"
                  {...register("cardNumber", {
                    required: "Número do cartão é obrigatório",
                    pattern: {
                      value: /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/,
                      message: "Número do cartão inválido",
                    },
                  })}
                />
              </FormOption>
              {errors.cardNumber && (
                <div className="error">
                  {errors.cardNumber.message as string}
                </div>
              )}

              <FormOption>
                <label htmlFor="expirationDate">Data de Expiração:</label>
                <DatePicker
                  id="expirationDate"
                  selected={expirationDate}
                  onChange={handleDatePickerChange}
                  dateFormat="MM/yy"
                  showMonthYearPicker
                  placeholderText="MM/AA"
                  minDate={new Date()} // Define a data mínima como a data atual
                  ref={(e: any) => {
                    expirationDateRef.current = e;
                  }}
                />
              </FormOption>
              {errors.expirationDate && (
                <div className="error">Data de expiração é obrigatória</div>
              )}

              <FormOption>
                <label htmlFor="cvv">CVV:</label>
                <input
                  type="text"
                  id="cvv"
                  maxLength={3}
                  inputMode="numeric"
                  {...register("cvv", {
                    required: "CVV é obrigatório",
                    pattern: {
                      value: /^[0-9]{3}$/,
                      message: "CVV inválido",
                    },
                  })}
                />
              </FormOption>
              {errors.cvv && (
                <div className="error">{errors.cvv.message as string}</div>
              )}

              <ButtonSubmit type="submit">Pagar</ButtonSubmit>
            </Form>
          ) : (
            <QrCodeContainer>
              <QrCodeImg src={QRCODE} alt="QR Code" />
              <ButtonSubmit onClick={onSubmitPix}>
                Realizado Pagamento
              </ButtonSubmit>
            </QrCodeContainer>
          )}
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
